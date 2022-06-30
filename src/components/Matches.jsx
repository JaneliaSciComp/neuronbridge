import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useLocation, useHistory } from "react-router-dom";
import { Switch, Row, Col, Pagination, Empty } from "antd";
import { AppContext } from "../containers/AppContext";
import MatchSummary from "./MatchSummary";
import MatchModal from "./MatchModal";
import HelpButton from "./Help/HelpButton";
import FilterMenuDisplay from "./FilterMenuDisplay";
import FilterButton from "./FilterButton";
import ExportMenu from "./ExportMenu";
import ClearMatchSelection from "./ClearMatchSelection";
import { useQuery } from "../libs/hooksLib";

import "./Matches.css";

// We need to modify the ppp results to update the pppRank. The data
// stored in the json files is the internal pppRank, which can have
// half values (eg: 12.5). This does not match the rank values as
// shown in the pdf files for external use. We are assured that the
// ppp results are sorted by pppRank, so we can apply the index of the
// array to the result to replace the pppRank for external display.
function correctPPPRank(matches) {
  const fixed = matches.results
    .sort((a, b) => a.pppRank - b.pppRank)
    .map((result, index) => {
      return {
        ...result,
        pppRank: index + 1,
        pppRankOrig: result.pppRank
      };
    });

  return { ...matches, results: fixed };
}

export default function Matches({ input, searchType, matches, precomputed }) {
  const query = useQuery();
  const location = useLocation();
  const history = useHistory();

  // get the current page number for the results, but prevent page
  // numbers below 0. Can't set the max value here, but if the user
  // is screwing around with the url, they know what is going to
  // happen.
  const page = Math.max(parseInt(query.get("page") || 1, 10), 1);
  // get the number of matches per page, but set the minimum and
  // maximum values, to prevent someone from changing the url to
  // -1 or 1000
  const matchesPerPage = Math.min(
    Math.max(parseInt(query.get("pc") || 30, 10), 10),
    100
  );

  const isPPP = searchType === "ppp";

  const { appState, setPermanent } = useContext(AppContext);

  if (!appState.dataConfig.loaded) {
    return (<p>Loading...</p>);
  }

  const sortType = query.get("fisort") || 1;

  function sortByScoreOrAlt(a, b) {
    if (isPPP) {
      return a.pppRank - b.pppRank;
    }
    if (sortType === "2") {
      return b.matchingPixels - a.matchingPixels;
    }
    return b.normalizedScore - a.normalizedScore;
  }

  function handlePageChange(newPage) {
    query.set("page", newPage);
    location.search = query.toString();
    history.push(location);
  }

  function handleChangePageSize(current, size) {
    query.set("pc", size);
    query.set("page", 1);
    location.search = query.toString();
    history.push(location);
  }

  function setModalOpen(index) {
    if (index) {
      query.set("m", index);
    } else {
      query.delete("m");
    }
    location.search = query.toString();
    // use replace instead of push, to get a better user experience. Nobody wants
    // to hit the back button and see all the modals they opened appear again.
    history.replace(location);
  }

  function handleModalOpen(index) {
    const matchPosition = page * matchesPerPage - matchesPerPage + index + 1;
    setModalOpen(matchPosition);
  }

  const resultsPerLine = parseInt(query.get("rpl"), 10) || 1;
  const filterString = query.get("id") || "";
  const excludedLibs = query.getAll("xlib");

  let genders = ['m','f']
  if (query.get("gr") !== null) {
    genders = query.get("gr").split('')
  }

  if (!input) {
    return <p>Loading...</p>;
  }

  let pageinatedList = [];
  let fullList = [];
  let matchSummaries = [];
  const countsByLibrary = {};

  function incrementLibCount(library) {
    if (!(library in countsByLibrary)) {
      countsByLibrary[library] = 0;
    }
    countsByLibrary[library] += 1;
  }

  if (matches) {
    const modifiedMatches = isPPP ? correctPPPRank(matches) : matches;

    // if isLM then a more complex sort is required.
    // - convert fullList into a list of lines where each line name
    //   has the max score and  all the channels as an array of children
    //   [
    //     {
    //       PublishedName: String,
    //       Channels: [{},{},{}],
    //       Score: Int <Max Score>
    //     },
    //     {...}
    //   ]
    //
    if (searchType !== "lines") {
      const byLines = {};
      modifiedMatches.results.forEach(result => {
        const { publishedName, libraryName } = result;

        let currentScore = result.normalizedScore;
        if (isPPP) {
          currentScore = result.pppRank;
        } else if (sortType === "2") {
          currentScore = result.matchingPixels;
        }

        if (publishedName in byLines) {
          if (isPPP) {
            byLines[publishedName].score = Math.min(
              parseInt(byLines[publishedName].score, 10),
              currentScore
            );
          } else {
            byLines[publishedName].score = Math.max(
              parseInt(byLines[publishedName].score, 10),
              currentScore
            );
          }
          byLines[publishedName].channels.push(result);
        } else {
          byLines[publishedName] = {
            score: parseInt(currentScore, 10),
            channels: [result],
            libraryName
          };
        }
      });
      const sortedByLine = Object.values(byLines).sort((a, b) => {
        if (searchType === "ppp") {
          return a.score - b.score;
        }
        return b.score - a.score;
      });
      const limitedByLineCount = sortedByLine.map(line =>
        line.channels.sort(sortByScoreOrAlt).slice(0, resultsPerLine)
      );

      limitedByLineCount.forEach(lines => {
        lines.forEach(line => incrementLibCount(line.libraryName));
      });

      // remove the filtered libraries
      const filteredByLibrary = limitedByLineCount.filter(
        result => !excludedLibs.includes(result[0].libraryName)
      ).filter(
        result => genders.includes(result[0].gender)
      );

      fullList = [].concat(...filteredByLibrary);
    } else {
      fullList = modifiedMatches.results
        .filter(result => !excludedLibs.includes(result.libraryName))
        .filter(result => genders.includes(result.gender))
        .sort(sortByScoreOrAlt);

      modifiedMatches.results.forEach(line => {
        incrementLibCount(line.libraryName);
      });
    }

    // id or name filter - case insensitive
    fullList = fullList
      .map(result => {
        const fullImageUrl = result.imageURL.startsWith("https://")
          ? result.imageURL
          : `${appState.dataConfig.imageryBaseURL}/${result.imageURL}`;
        const fullThumbUrl = result.thumbnailURL.startsWith("https://")
          ? result.thumbnailURL
          : `${appState.dataConfig.thumbnailsBaseURLs}/${result.thumbnailURL}`;
        return {
          ...result,
          imageURL: fullImageUrl,
          thumbnailURL: fullThumbUrl,
          // add the anatomical Area for code later down the tree to use
          // for determining image widths and heights.
          anatomicalArea: result.anatomicalArea || input.anatomicalArea
        };
      })

      .filter(result =>
        result.publishedName.toLowerCase().includes(filterString.toLowerCase())
      );

    pageinatedList = fullList.slice(
      page * matchesPerPage - matchesPerPage,
      page * matchesPerPage
    );

    matchSummaries = pageinatedList.map((result, index) => {
      const key = `${result.matchedId}_${result.score}_${result.matchedPixels}_${index}`;
      return (
        <React.Fragment key={key}>
          <MatchSummary
            library={input.libraryName || "unknown"}
            match={result}
            isLM={!(searchType === "lines")}
            showModal={() => handleModalOpen(index)}
            gridView={appState.gridView}
            paths={appState.dataConfig}
          />
        </React.Fragment>
      );
    });
  }

  if (appState.gridView) {
    matchSummaries = <Row gutter={16}>{matchSummaries}</Row>;
  }

  if (pageinatedList.length === 0) {
    matchSummaries = (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <span>
            There are no results to show. Please try using less restrictive
            filters.
          </span>
        }
      />
    );
  }

  const updatedInput = {...input, maskImageStack: matches.maskImageStack || null};

  return (
    <div>
      <Row style={{ paddingBottom: "1em" }}>
        <Col xs={{ span: 12, order: 1 }} sm={{ span: 4, order: 1 }}>
          <h3>
            {searchType === "lines" ? "EM" : "LM"} Matches{" "}
            <HelpButton
              target={
                searchType === "lines" ? "MatchesLMtoEM" : "MatchesEMtoLM"
              }
            />
          </h3>
        </Col>
        <Col
          xs={{ span: 24, order: 3 }}
          sm={{ span: 16, order: 2 }}
          className="actionButtons"
        >
          <FilterButton />
          <ExportMenu
            results={fullList}
            searchType={searchType}
            searchId={isPPP ? input.publishedName : input.id}
            precomputed={precomputed}
          />
          <ClearMatchSelection />
        </Col>
        <Col
          xs={{ span: 12, order: 2 }}
          sm={{ span: 4, order: 3 }}
          style={{ textAlign: "right", marginBottom: "1em" }}
        >
          <Switch
            checked={appState.gridView}
            checkedChildren="Grid"
            unCheckedChildren="List"
            onChange={() => setPermanent({ gridView: !appState.gridView })}
          />
        </Col>
      </Row>
      <Pagination
        current={page}
        pageSize={matchesPerPage}
        onShowSizeChange={handleChangePageSize}
        pageSizeOptions={[10, 30, 50, 100]}
        onChange={handlePageChange}
        responsive
        showLessItems
        total={fullList.length}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} matches`
        }
      />

      <FilterMenuDisplay
        searchType={searchType}
        countsByLibrary={countsByLibrary}
      />
      {matchSummaries}
      <Pagination
        current={page}
        pageSize={matchesPerPage}
        onShowSizeChange={handleChangePageSize}
        pageSizeOptions={[10, 30, 50, 100]}
        onChange={handlePageChange}
        responsive
        showLessItems
        total={fullList.length}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} matches`
        }
      />

      <MatchModal
        isLM={!(searchType === "lines")}
        searchType={searchType}
        open={parseInt(query.get("m") || 0, 10)}
        setOpen={setModalOpen}
        matchesList={fullList}
        mask={updatedInput}
      />
    </div>
  );
}

Matches.propTypes = {
  input: PropTypes.object.isRequired,
  matches: PropTypes.object.isRequired,
  searchType: PropTypes.string.isRequired,
  precomputed: PropTypes.bool
};

Matches.defaultProps = {
  precomputed: false
};
