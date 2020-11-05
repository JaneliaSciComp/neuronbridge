import React, { useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { InputNumber, Col, Row, Divider } from "antd";
import SearchInput from "../SearchInput";
import { FilterContext } from "../../containers/FilterContext";
import { AppContext } from "../../containers/AppContext";

import DataGeneration1 from "./NeuronBridge_DataGen1.png";
import DataGeneration2 from "./NeuronBridge_DataGen2.png";
import SearchPipeline1 from "./NeuronBridge_Search1.png";
import SearchPipeline2 from "./NeuronBridge_Search2.png";
import LHLength from "./LHLength.png";
import BrainScan from "./brain_scan.gif";
import BrainReference from "./brain_reference.png";

import "./HelpContents.css";

export default function HelpContents({ scroll }) {
  const [filterState, setFilterState] = useContext(FilterContext);
  const [appState] = useContext(AppContext);

  const helpContentRef = useRef();

  const refLookup = {
    MatchesEMtoLM: useRef(),
    MatchesLMtoEM: useRef(),
    SearchInput: useRef()
  };

  // use Effect to scroll to target set in the appState?
  useEffect(() => {
    if (scroll) {
      if (refLookup[appState.helpTarget]) {
        if (refLookup[appState.helpTarget].current) {
          helpContentRef.current.parentElement.scrollTop =
            refLookup[appState.helpTarget].current.offsetTop - 60;
          refLookup[appState.helpTarget].current.classList.add("highlighted");
          window.setTimeout(() => {
            if (
              refLookup[appState.helpTarget] &&
              refLookup[appState.helpTarget].current
            ) {
              refLookup[appState.helpTarget].current.classList.remove(
                "highlighted"
              );
            }
          }, 3000);
        }
      }
    }
  }, [appState.helpTarget, refLookup, scroll]);

  function handleResultsPerLine(count) {
    setFilterState({ ...filterState, resultsPerLine: count });
  }

  return (
    <div ref={helpContentRef} className="helpcontents">
      <h2 ref={refLookup.SearchInput}>Searching:</h2>
      <p>
        The search input bar is the primary interface to this website. It is
        used to locate an EM body id or cell line of interest. To that end, We
        setup the search input to default to an exact match with optional wild
        cards. For example, if you were looking for the cell line LH173,
        searching for &ldquo;LH173&rdquo; would find exactly one result for that
        cell line.
      </p>

      <Row>
        <Col lg={12}>
          <SearchInput
            examples={false}
            searchTerm="LH173"
            help={false}
            uploads={false}
          />
        </Col>
      </Row>

      <p>
        If you were interested in looking at all the cell lines from our 2014
        mushroom body paper, then you could search with a wild card like
        &ldquo;MB*&rdquo;.
      </p>

      <Row>
        <Col lg={12}>
          <SearchInput
            examples={false}
            searchTerm="MB*"
            help={false}
            uploads={false}
          />
        </Col>
      </Row>

      <p>
        Please note wild card searches are limited to the first 100 matches. To
        see more entries, please enter a more specific search term, eg:
        &ldquo;MB11*&rdquo;
      </p>

      <Row>
        <Col lg={12}>
          <SearchInput
            examples={false}
            searchTerm="MB11*"
            help={false}
            uploads={false}
          />
        </Col>
      </Row>

      <p>
        The results of this initial search will present all the images that we
        have run through the color depth MIP mask search, alongside a button to
        view the results of that search. Clicking on the &ldquo;View EM/LM
        Matches&rdquo; button will present you with all the matches to this
        input image.
      </p>

      <Divider />

      <h2 ref={refLookup.MatchesLMtoEM}>EM Matches:</h2>
      <p>
        The Electron Microscopy matches show a grid of images related to an
        Electron microscopy body from the FlyEM Project, sorted from highest to
        lowest scoring.{" "}
      </p>

      <Divider />

      <h2 ref={refLookup.MatchesEMtoLM}>LM Matches:</h2>
      <p>
        The Light Microscopy matches show a grid of images related to a cell
        line from one of our <Link to="/about">papers</Link>. They are also
        sorted from highest to lowest scoring. All matching images for a line
        are sorted together by the highest scoring image in that line. By
        default, we display a single image per line, but this can be adjusted in
        the &ldquo;results per line&rdquo; textbox found by clicking on the
        results filters button.
      </p>
      <div>
        <InputNumber
          style={{ width: "5em" }}
          min={1}
          max={100}
          value={filterState.resultsPerLine}
          onChange={handleResultsPerLine}
        />{" "}
        results per line
      </div>

      <Divider />

      <h2>Upload Alignment:</h2>

      <h3>Supported File Formats</h3>
      <p>
        The alignment pipeline uses Fiji, therefore, Fiji readable formats can
        be used. (e.g. tiff hyper stack, lsm, oib, hyper stack .zip, czi with a
        single sample, nd2.)
      </p>

      <h3>FAQ: Why did my alignment fail?</h3>
      <dl>
        <dt>No-reference channel</dt>
        <dd>
          The uploaded file must have a reference channel (nc82 or chemical tag)
        </dd>

        <dt>The uploaded file only contained part of the brain</dt>
        <dd>
          The reference channel needs to contain a full central brain in the XY
          plane. The optic lobe is not necessary and the brain can be tilted
          within +/-90 degrees.
        </dd>
          <dd><img src={BrainReference} alt="FlyLight 40x MCFO reference channel tilted 45 degrees to the left"/></dd>

        <dd>
          The brain needs to have a whole Z-brain scan (from the antennal lobe
          (AN) to the end of the MB cell bodies)
        </dd>

        <dt>The input voxel size was not correct</dt>
        <dd>
          Please measure your fly brain size by using the Fiji/Imagej &quot;Straight&quot;
          line selection tool. The length of both ends of the lateral horn (LH)
          should be between 330 &amp; 340 µm. You can fix the voxel size in
          Fiji/ImageJ menu /Images/Properties...
        </dd>
          <dd><img src={LHLength} alt="Fiji window showing a line drawn between the two sides of the lateral horn."/></dd>

        <dt>The brain was tilted too far in the dorsal-ventral direction.</dt>
        <dd>Here is an example of a good scan</dd>
          <dd><img src={BrainScan} alt="Brain scan"/></dd>

        <dt>The brain may have too much debris or be too distorted.</dt>
          <dd>This is unrecoverable in our system. Please use an alternative method to align.</dd>
      </dl>

      <Divider />
      <div className="pipelines">
        <h2>Search Pipeline:</h2>

        <Row>
          <Col lg={12}>
            <img src={SearchPipeline1} alt="Search pipeline 1" />
          </Col>
          <Col lg={12}>
            <p>
              Pre-generated matches were computed as a cartesian product of the
              LM and EM color depth MIPs. Before matching, several derived
              images were computed for each MIP: XY Gap Gradient Mask and Z Gap
              Dilation Masks for all LM MIPs, and a Value - 1 Grey Mask for all
              EM MIPs. These masks were used to weight match scores based on
              signal outside of the search mask.
            </p>
            <h3>Match Precompute Algorithm</h3>
            <p>For each hemibrain body:</p>
            <ol>
              <li>
                Compare to every LM color depth MIP to find the number of
                matching pixels
              </li>
              <li>
                Compute match percentage by dividing number of matching pixels
                by the mask size
              </li>
              <li> Eliminate all matches with less than 1% match percentage</li>
              <li>
                Sort results by matching pixels and select the top 300 lines
              </li>
              <li> Select all of the MIPs in the top 300 lines</li>
              <li>
                Calculate normalized scores based on gradient scoring algorithm
              </li>
              <li> Sort the matches by the normalized score</li>
            </ol>
          </Col>
          <Col lg={12}>
            <img src={SearchPipeline2} alt="Search pipeline 2" />
          </Col>
          <Col lg={12}>
            <p>
              Positive match scoring was performed as usual. In addition,
              “negative” scores were computed based on signal outside the mask.
              The score for each match was normalized to the set of results in
              which it was found. The final score for each EM/LM comparison is a
              positive score weighted by the negative score.
            </p>
          </Col>
        </Row>

        <Divider />

        <h2>Data Generation Pipelines:</h2>
        <Row gutter={24}>
          <Col lg={12}>
            <h3> Light Microscopy Data Generation</h3>
            <img src={DataGeneration1} alt="data generation pipeline 1" />
          </Col>
          <Col lg={12}>
            <p>
              NeuronBridge uses the color depth MIP technique (
              <a href="https://doi.org/10.1101/318006">Otsuna et al., 2018</a>)
              to compare images between LM and EM. To improve matches for denser
              MCFO data, the color depth MIP approach was extended in several
              ways (Otsuna, et al., in preparation). The data generation
              pipeline for LM is shown here. After images are aligned to a
              common template, we used direction selective local thresholding
              (DSLT;{" "}
              <a href="https://doi.org/10.1111/tpj.12738">
                Kawase, et al., 2015
              </a>
              ) to generate a 3D segmentation and create a separate color depth
              MIP for each fully connected component. These segmented MIPs were
              manually created to eliminate junk (e.g. glia, debris on the
              surface of brain, etc.) Smaller debris is also eliminated by voxel
              size thresholds (e.g. fragments less than 1100μm3)
            </p>
          </Col>
          <Col lg={12}>
            <h3> Electron Microscopy Data Generation</h3>
            <img src={DataGeneration2} alt="data generation pipeline 2" />
          </Col>
          <Col lg={12}>
            <p>
              The EM volume was imaged and reconstructed by the FlyEM Project (
              <a href="https://www.biorxiv.org/content/10.1101/2020.01.21.911859v1">
                Xu, et al., 2020
              </a>{" "}
              ). After the imagery was registered to the JRC2018 template, we
              downloaded the reconstructed skeletons as SWC files and
              transformed them into the same alignment space as the LM data.
              These aligned skeletons are converted to color depth MIPs, and
              then thresholded by size to eliminate tiny fragments (&lt;12kb SWC
              or &lt;5kb PNG) and manually curated to eliminate junk. Any MIP
              containing data crossing the midline of the brain was mirrored
              across the X axis and added as an extra mask to improve detection
              of bilateral expression patterns.
            </p>
          </Col>
        </Row>
        <p>
          For a larger version of these flow diagrams, please download the{" "}
          <a href="/NeuronBridge_search_and_data_gen_pipelines.pdf">
            Data Generation and Search Pipelines (pdf)
          </a>
        </p>
      </div>
    </div>
  );
}

HelpContents.propTypes = {
  scroll: PropTypes.bool
};

HelpContents.defaultProps = {
  scroll: true
};
