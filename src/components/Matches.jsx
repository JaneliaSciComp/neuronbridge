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
import ScrollToTopOnMount from "./ScrollToTopOnMount";
import { useQuery } from "../libs/hooksLib";

import "./Matches.css";

// We need to modify the pppm results to update the pppmRank. The data
// stored in the json files is the internal pppmRank, which can have
// half values (eg: 12.5). This does not match the rank values as
// shown in the pdf files for external use. We are assured that the
// pppm results are sorted by pppmRank, so we can apply the index of the
// array to the result to replace the pppmRank for external display.
function correctPPPRank(matches) {
  const fixed = matches.results
    .sort((a, b) => a.pppmRank - b.pppmRank)
    .map((result, index) => {
      return {
        ...result,
        pppmRank: index + 1,
        pppmRankOrig: result.pppmRank,
      };
    });

  return { ...matches, results: fixed };
}

export default function Matches({ input, searchAlgorithm, matches, precomputed }) {
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

  const isPPP = searchAlgorithm === "pppm";

  // determine if the matches are EM images or LM images. We don't
  // currently have a search where both types of images can be matched,
  // so it is safe to assume that if we check the first result and it
  // is an EM image, then they are all EM images, etc.
  const matchesType = matches?.results?.find(result => result.image)?.image?.type === "EMImage" ? "em" : "lm";

  const { appState, setPermanent } = useContext(AppContext);

  if (!appState.dataConfig.loaded) {
    return <p>Loading...</p>;
  }

  const sortType = query.get("fisort") || 1;

  function sortByScoreOrAlt(a, b) {
    if (isPPP) {
      return a.pppmRank - b.pppmRank;
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

  let genders = ["m", "f"];
  if (query.get("gr") !== null) {
    genders = query.get("gr").split("");
  }

  if (!input) {
    return <p>Loading...</p>;
  }

  let pageinatedList = [];
  let fullList = [];
  let matchSummaries = [];
  const countsByLibrary = {};

  // if there are gender attributes on the results object, then we can
  // filter by gender, if not then we need to skip the gender filter
  // or no results will be returned by default. This value is updated
  // by looping over the results library, later in this file.
  let useGenderFilter = false;

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
    if (matchesType === "lm") {
      const byLines = {};
      modifiedMatches.results.forEach((result) => {
        const { publishedName, libraryName } = result.image;

        let currentScore = result.normalizedScore;
        if (isPPP) {
          currentScore = result.pppmRank;
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
            libraryName,
          };
        }
      });
      const sortedByLine = Object.values(byLines).sort((a, b) => {
        if (searchAlgorithm === "pppm") {
          return a.score - b.score;
        }
        return b.score - a.score;
      });
      const limitedByLineCount = sortedByLine.map((line) =>
        line.channels.sort(sortByScoreOrAlt).slice(0, resultsPerLine)
      );

      limitedByLineCount.forEach((lines) => {
        lines.forEach((line) => incrementLibCount(line.image.libraryName));
      });

      // remove the filtered libraries
      const filteredByLibrary = limitedByLineCount
        .filter((result) => !excludedLibs.includes(result[0].image.libraryName))

      useGenderFilter = limitedByLineCount.some(item => item[0].image.gender)

      if (useGenderFilter) {
        fullList = [].concat(...filteredByLibrary.filter((result) => genders.includes(result[0].image.gender)));
      } else {
        fullList = [].concat(...filteredByLibrary);
      }
    } else {
      const filteredByLibrary = modifiedMatches.results
        .filter((result) => !excludedLibs.includes(result.image.libraryName))
        .sort(sortByScoreOrAlt);

      useGenderFilter = modifiedMatches.results.some(item => item.image.gender)

      if (useGenderFilter) {
        fullList = filteredByLibrary.filter((result) => genders.includes(result.image.gender));
      } else {
        fullList = filteredByLibrary;
      }

      modifiedMatches.results.forEach((line) => {
        incrementLibCount(line.image.libraryName);
      });
    }

    // id or name filter - case insensitive
    fullList = fullList
      .map((result) => {
        return {
          ...result,
          // add the anatomical Area for code later down the tree to use
          // for determining image widths and heights.
          anatomicalArea: result.image.anatomicalArea || input.anatomicalArea,
        };
      })

      .filter((result) =>
        result?.image?.publishedName?.toLowerCase().includes(filterString.toLowerCase())
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
            isLM={!(input.type === "LMImage")}
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

  const updatedInput = {
    ...input,
    maskImageStack: matches.maskImageStack || null,
  };

  const resultsFile = isPPP ? input?.files?.PPPMResults : input?.files?.CDSResults;
  const searchId = precomputed ? resultsFile : input.id;

  return (
    <div>
      <ScrollToTopOnMount/>
      <Row style={{ paddingBottom: "1em", marginTop: "2em" }}>
        <Col xs={{ span: 12, order: 1 }} sm={{ span: 4, order: 1 }}>
          <h3>
            {matchesType === "lm" ? "LM" : "EM"} Matches{" "}
            <HelpButton
              target={
                matchesType !== "lm" ? "MatchesLMtoEM" : "MatchesEMtoLM"
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
            matchesType={matchesType}
            searchId={searchId}
            searchAlgorithm={searchAlgorithm}
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
        searchAlgorithm={searchAlgorithm}
        matchesType={matchesType}
        countsByLibrary={countsByLibrary}
        useGenderFilter={useGenderFilter}
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
        isLM={matchesType === "lm"}
        searchAlgorithm={searchAlgorithm}
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
  searchAlgorithm: PropTypes.string.isRequired,
  precomputed: PropTypes.bool,
};

Matches.defaultProps = {
  precomputed: false,
};
