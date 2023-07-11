import React, { useContext, useEffect, useRef } from "react";
import { useLocation, useHistory, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Typography, InputNumber, Col, Row, Divider } from "antd";
import SearchInput from "../SearchInput";
import { AppContext } from "../../containers/AppContext";
import { useQuery } from "../../libs/hooksLib";

import DataGeneration1 from "./NeuronBridge_DataGen1.png";
import DataGeneration2 from "./NeuronBridge_DataGen2.png";
import SearchPipeline1 from "./NeuronBridge_Search1.png";
import SearchPipeline2 from "./NeuronBridge_Search2.png";
import LHLength from "./LHLength.png";
import BrainScan from "./brain_scan.gif";
import BrainReference from "./brain_reference.png";

import "./HelpContents.css";

const { Title } = Typography;

export default function HelpContents({ scroll }) {
  const { appState } = useContext(AppContext);
  const query = useQuery();
  const location = useLocation();
  const history = useHistory();

  const helpContentRef = useRef();

  const refLookup = {
    MatchesEMtoLM: useRef(),
    MatchesLMtoEM: useRef(),
    SearchInput: useRef(),
    UploadAlignment: useRef(),
    UploadSearch: useRef(),
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

  const handleResultsPerLine = (count) => {
    query.set("rpl", count);
    location.search = query.toString();
    history.push(location);
  }

  return (
    <div ref={helpContentRef} className="helpcontents">
      <a
        ref={refLookup.SearchInput}
        className="anchorOffset"
        id="search"
        href="#search"
      >
        #search
      </a>
      <Title level={3}>Line/neuron lookups</Title>
      <p>
        The search input bar is the primary interface to this website. It is
        used to locate an EM body id or cell line of interest. By default, the
        search looks for an exact match to the input string, and you can add
        wildcards for a wider search. For example, if you were looking for the
        cell line LH173, searching for &ldquo;LH173&rdquo; would find exactly
        one result for that cell line:
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
        If you were interested in all the cell lines from our 2014 mushroom body
        paper, then you could search with a wild card like this:
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
        Note wild card searches are limited to the first 100 matches. To see
        additional entries, enter a more specific search term, for example:
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
        This initial search will show all the relevant images that have
        precomputed results. Clicking on a &ldquo;Results&rdquo; button next to
        a given image takes you to the matches for that image.
      </p>
      <Divider />
      <h3 ref={refLookup.MatchesLMtoEM}>EM Matches</h3>
      <p>
        The Electron Microscopy (EM) matches show a grid of images related to a
        neuron body from the FlyEM Project, sorted from highest to lowest
        scoring.
      </p>
      <Divider />
      <h3 ref={refLookup.MatchesEMtoLM}>LM Matches</h3>
      <p>
        The matches for light microscopy (LM) images show a grid of images
        related to a cell line from one of our <Link to="/about">papers</Link>.
        They are sorted from highest to lowest scoring, but all matching images
        for a line are sorted together with the highest scoring image in that
        line. By default, we display a single image per line, but this can be
        adjusted by clicking on the &ldquo;Filters / Sorting&rdquo; button and
        then changing the value of the &ldquo;results per line&rdquo; textbox:
      </p>
      <div>
        <InputNumber
          style={{ width: "5em" }}
          min={1}
          max={100}
          value={parseInt(query.get("rpl") || 1, 10)}
          onChange={handleResultsPerLine}
        />{" "}
        results per line
      </div>
      <Divider />
      <div className="pipelines">
        <a
          className="anchorOffset"
          id="data_generation"
          href="#data_generation"
        >
          #data_generation
        </a>
        <Title level={3}>Data generation</Title>
        <Row gutter={24}>
          <Col lg={12}>
            <h3>CDM generation for LM images</h3>
            <img
              height="1608px"
              width="757px"
              style={{ height: "auto", maxWidth: "100%" }}
              src={DataGeneration1}
              alt="data generation pipeline 1"
            />
          </Col>
          <Col lg={12}>
            <p>
              Raw light microscopy (LM) data collected by FlyLight is
              transformed in several ways prior to matching using color depth
              MIP search (
              <a href="https://doi.org/10.1101/318006">Otsuna et al., 2018</a>).
              To improve matches for denser MCFO data, the color depth MIP
              approach was extended in several ways (Otsuna, et al., in
              preparation). The data generation pipeline for LM images is shown
              on the left.
            </p>
            <p>
              After images are aligned to a common template, we used direction
              selective local thresholding (DSLT;{" "}
              <a href="https://doi.org/10.1111/tpj.12738">
                Kawase, et al., 2015
              </a>
              ) to generate a 3D segmentation and create a separate color depth
              MIP for each fully connected component. These segmented MIPs were
              manually created to eliminate junk (e.g. glia, debris on the
              surface of brain, etc.) Smaller debris is also eliminated by voxel
              size thresholds (e.g. fragments less than 1100μm3)
            </p>
            <p>
              Note that the counts in the diagram are provided only to give a
              sense of the relative cardinality and do not represent all of the
              data currently in NeuronBridge.
            </p>
            <p>
              A preprint including more details is{" "}
              <a href="https://doi.org/10.1101/2022.07.20.500311">
                available on bioRxiv
              </a>
              .
            </p>
          </Col>
          <Col lg={12} className="top-space">
            <h3>CDM generation for EM data sets</h3>
            <img
              height="1482px"
              width="709px"
              style={{ height: "auto", maxWidth: "100%" }}
              src={DataGeneration2}
              alt="data generation pipeline 2"
            />
          </Col>
          <Col lg={12} className="top-space">
            <p>
              The EM data sets were imaged and reconstructed by the FlyEM
              Project (
              <a href="https://doi.org/10.7554/eLife.57443">
                Scheffer, et al., 2020
              </a>
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

        <Divider />
        <a
          className="anchorOffset"
          id="search_pipeline"
          href="#search_pipeline"
        >
          #search_pipeline
        </a>
        <Title level={3}>Precomputed CDM matching</Title>

        <Row>
          <Col lg={12}>
            <img
              height="773px"
              width="732px"
              style={{ height: "auto", maxWidth: "100%" }}
              src={SearchPipeline1}
              alt="Search pipeline 1"
            />
          </Col>
          <Col lg={12}>
            <p>
              Pre-generated CDM matches were computed as a cartesian product of
              the LM and EM color depth MIPs. Before matching, several derived
              images were computed for each MIP: XY Gap Gradient Mask and Z Gap
              Dilation Masks for all LM MIPs, and a Value - 1 Grey Mask for all
              EM MIPs. These masks were used to weight match scores based on
              signal outside of the search mask.
            </p>
            <h3>Match Precompute Algorithm</h3>
            <p>
              This method will be more fully described by Otsuna, et al., in
              preparation. The pseudocode below is provided as a high level
              summary. For each hemibrain body:
            </p>
            <ol>
              <li>
                Compare to every LM color depth MIP to find the number of
                matching pixels
              </li>
              <li>
                Compute match percentage by dividing number of matching pixels
                by the mask size
              </li>
              <li>Eliminate all matches with less than 1% match percentage</li>
              <li>
                Sort results by matching pixels and select the top 300 lines
              </li>
              <li>Select all of the MIPs in the top 300 lines</li>
              <li>
                Calculate normalized scores based on gradient scoring algorithm
              </li>
              <li>Sort the matches by the normalized score</li>
            </ol>
          </Col>
          <Col lg={12}>
            <img
              height="839px"
              width="827px"
              style={{ height: "auto", maxWidth: "100%" }}
              src={SearchPipeline2}
              alt="Search pipeline 2"
            />
          </Col>
          <Col lg={12}>
            <p>
              Positive match scoring was performed as usual. In addition,
              “negative” match scores were computed based on signal outside the
              mask. The score for each match was normalized to the set of
              results in which it was found. The final score for each EM/LM
              comparison is a positive score weighted by the negative score.
            </p>
          </Col>
        </Row>

        <p className="top-space">
          For a larger version of these flow diagrams, download the{" "}
          <a href="/NeuronBridge_search_and_data_gen_pipelines.pdf">
            Data Generation and Search Pipelines (pdf).
          </a>
        </p>
      </div>
      <Divider />
      <a
        ref={refLookup.UploadAlignment}
        className="anchorOffset"
        id="upload_alignment"
        href="#upload_alignment"
      >
        #upload_alignment
      </a>
      <Title level={3}>Uploaded image alignment</Title>
      When you upload an unaligned image stack to the NeuronBridge, it is
      automatically registered to a standard color depth search alignment
      template. Currently, these are JRC2018_Unisex_20x_HR (Brain) and
      JRC2018_VNC_Unisex_40x_DS (VNC) both of which are derived from the{" "}
      <a href="https://www.janelia.org/open-science/jrc-2018-brain-templates">
        JRC 2018 templates
      </a>
      .
      <h3 className="top-space-sm">Supported File Formats</h3>
      <p>
        Fiji/ImageJ multi-channels .tif/.zip (hyperstack), .lsm, .oib, .czi with
        a single sample, and .nd2. The <i>.nrrd</i> format is not supported due
        to its single channel limitation.
      </p>
      <h3 className="top-space-sm">Alignment Verification</h3>
      <p>
        The aligner provides an alignment score and a link to a verification movie. 
        The verification movie allows you to visualize the aligned stack against the template.
        The alignment score is calculated as a{" "}
        <a href="https://martin-thoma.com/zero-mean-normalized-cross-correlation">
          Zero Mean Normalized Cross-Correlation (ZNCC)
        </a>
        .
        This yields a number between -1 and 1, where higher scores are better. 
        The maximum score (perfect alignment) is 1, and anything below a 0.7 likely indicates a failure. 
      </p>
      <h3>FAQ: Why did my alignment fail?</h3>
      <dl>
        <dt>No-reference channel</dt>
        <dd>
          The uploaded file must have a reference channel (nc82 or chemical tag
          which stains the neuropil.)
        </dd>

        <dt>The uploaded file only contained part of the brain</dt>
        <dd>
          The reference channel needs to contain a full central brain in the XY
          plane. The optic lobes are not necessary and the brain can be tilted
          within +/-90 degrees. Images tilted within +-55 degrees are much more
          likely to align correctly. It may be possible to fix your input by
          running one of the options found in the &ldquo;Image/Transform&rdquo;
          Fiji menu.
        </dd>
        <dd>
          <img
            height="300px"
            width="300px"
            style={{ maxWidth: "100%" }}
            src={BrainReference}
            alt="FlyLight 40x MCFO reference channel tilted 45 degrees to the left"
          />
        </dd>

        <dd>
          The brain needs to have a whole Z-brain scan (from the antennal lobe
          (AN) to the end of the MB cell bodies)
        </dd>

        <dt>The input voxel size was not correct</dt>
        <dd>
          Measure your fly brain size by using the Fiji/Imagej
          &quot;Straight&quot; line selection tool. The length of both ends of
          the lateral horn (LH) should be between 330 &amp; 340 µm. You can fix
          the voxel size in Fiji/ImageJ menu /Images/Properties...
        </dd>
        <dd>
          <img
            width="600px"
            height="350px"
            style={{ maxWidth: "600px" }}
            src={LHLength}
            alt="Fiji window showing a line drawn between the two sides of the lateral horn."
          />
        </dd>

        <dt>The brain was tilted too far in the dorsal-ventral direction.</dt>
        <dd>Here is an example of a good scan</dd>
        <dd>
          <img
            height="300px"
            width="300px"
            style={{ maxWidth: "100%" }}
            src={BrainScan}
            alt="Brain scan"
          />
        </dd>

        <dt>The brain may have too much debris or be too distorted.</dt>
        <dd>
          This is unrecoverable in our system. You will need to use an
          alternative method to register your data. Once you have an aligned
          image stack, use the{" "}
          <a href="https://github.com/JaneliaSciComp/ColorMIP_Mask_Search">
            Color MIP Mask Search Fiji plugin
          </a>{" "}
          to generate the aligned color depth MIPs and upload those for custom
          searching.
        </dd>
      </dl>

      <Divider />
      <a
        ref={refLookup.UploadSearch}
        className="anchorOffset"
        id="upload_search"
        href="#upload_search"
      >
        #upload_search
      </a>
      <Title level={3}>Uploaded image search</Title>
      <p>
      Once an uploaded image has been uploaded, an aligned color depth MIP (CDM) is generated for each channel. 
      You will need to choose one channel (one CDM) and mask it to isolate your neuron of interest. 
      Submitting the search will begin color depth matching of your mask against the chosen CDM libraries. 
      </p>
      <p>
      Note that the search process is different for uploaded data compared to precomputed matches. Only the initial color depth matching algorithm is used, 
      and we do not currently run gradient scoring to re-sort the results for uploaded data. Also, a maximum of 400 matching images are returned.
      </p>

    </div>
  );
}

HelpContents.propTypes = {
  scroll: PropTypes.bool,
};

HelpContents.defaultProps = {
  scroll: true,
};
