import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import { Storage } from "aws-amplify";
import { Button } from "antd";
import { signedLink } from "../libs/awsLib";
import config from "../config";

import "./MaskDrawing.css";

const storageOptions = {
  level: "private",
  download: true,
  bucket: config.SEARCH_BUCKET,
};

function getMousePos(evt) {
  const canvas = evt.target;
  const rect = canvas.getBoundingClientRect();
  return [
    ((evt.clientX - rect.left) * canvas.width) / canvas.clientWidth,
    ((evt.clientY - rect.top) * canvas.height) / canvas.clientHeight,
  ];
}

const alignedDimensions = {
  brain: [1210, 566, 174],
  vnc: [573, 1209, 219],
};

const img = new Image();

export default function MaskDrawing({
  imgSrc,
  onMaskChange,
  signImage,
  anatomicalRegion,
}) {
  const [isDrawing, setDrawing] = useState(false);
  const canvasRef = useRef(null);
  const [pathStart, setPathStart] = useState([]);
  const [signedImgSrc, setSignedImgSrc] = useState(null);
  const [maskDrawn, setMaskDrawn] = useState(false);

  const [imgWidth, imgHeight] = alignedDimensions[anatomicalRegion || "brain"];

  const handleClearMask = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, 20000, 20000);
      ctx.beginPath();
      ctx.closePath();
      onMaskChange(null);
      setMaskDrawn(false);
    }
  };

  useEffect(() => {
    if (imgSrc) {
      if (signImage) {
        signedLink(imgSrc).then((signed) => {
          setSignedImgSrc(signed);
        });
      } else {
        setSignedImgSrc(imgSrc);
      }
    }
  }, [imgSrc, signImage]);

  useEffect(() => {
    // fetch the input image and save it to the state
    if (imgSrc) {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, 20000, 20000);
        ctx.beginPath();
        ctx.closePath();
      }

      if (signImage) {
        // horrible hack to get canvas and cross origin images working. We can't
        // load the image by placing an unsinged url in the img.src attribute, because
        // AWS wont respond. We also can't use a signed url, and the
        // img.crossorigin='anonymous' attribute, because AWS doesn't send back the
        // correct CORS headers. So we have to download the image as a blob, generate
        // an object url and then save that to the image in order to get past all the
        // fucking security measures.
        Storage.get(imgSrc, storageOptions).then((result) => {
          const objUrl = URL.createObjectURL(result.Body);
          img.src = objUrl;
        });
        img.crossOrigin = "anonymous";
      } else {
        img.src = imgSrc;
      }
    }
  }, [imgSrc, signImage]);

  if (!imgSrc) {

    let placeHolderImage = '';

    if (anatomicalRegion) {
      if (anatomicalRegion === "vnc"){
        placeHolderImage = (
          <img
            src="/maskplaceholdervnc.jpg"
            alt="desaturated color depth mip placeholder"
          />
        );
      } else {
        placeHolderImage = (
          <img
            src="/maskplaceholder.jpg"
            alt="desaturated color depth mip placeholder"
          />
        )
      }
    }

    return (
      <div className="mdplaceholder">
        <h2>Choose a channel to create your mask</h2>
        {placeHolderImage}
      </div>
    );
  }

  const handleCreateMask = () => {
    // get the image data and serialize it
    const ctx = canvasRef.current.getContext("2d");
    ctx.save();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.clip();
    // the first 4 parameters in drawImage make sure the original image is copied in full
    // and the second set of 4 make sure that it is scaled to fit our alignment template.
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    ctx.restore();
    canvasRef.current.toBlob((data) => onMaskChange(data));
  };

  const handleMouseMove = (e) => {
    if (isDrawing) {
      const position = getMousePos(e);
      const ctx = canvasRef.current.getContext("2d");
      ctx.lineTo(...position);
      ctx.stroke();
    }
  };

  const handleMouseUp = (e) => {
    if (e.button === 0) {
      setDrawing(false);
      setMaskDrawn(true);
      const position = getMousePos(e);
      const ctx = canvasRef.current.getContext("2d");
      ctx.lineTo(...position);
      ctx.stroke();

      // close path
      ctx.lineWidth = "2";
      ctx.lineTo(pathStart[0], pathStart[1]);
      ctx.stroke();
      ctx.closePath();
      handleCreateMask();
    }
  };

  const handleMouseDown = (e) => {
    if (e.button === 0) {
      setMaskDrawn(false);
      setDrawing(true);
      const position = getMousePos(e);
      setPathStart(position);
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, 20000, 20000);
      ctx.strokeStyle = "yellow";
      ctx.lineWidth = "1";
      ctx.beginPath();
      ctx.moveTo(...position);
    }
  };

  return (
    <div>
      <div id="maskLassoContainer">
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          id="imaskLassoCanvas"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: 1,
            width: imgWidth,
            height: imgHeight,
          }}
          width={imgWidth}
          height={imgHeight}
        />
        <img
          src={signedImgSrc}
          alt="uploaded sample"
          width={imgWidth}
          height={imgHeight}
        />
      </div>
      <Button type="primary" disabled={!maskDrawn} onClick={handleClearMask}>
        Clear Mask
      </Button>
    </div>
  );
}

MaskDrawing.propTypes = {
  imgSrc: PropTypes.string,
  onMaskChange: PropTypes.func.isRequired,
  signImage: PropTypes.bool,
  anatomicalRegion: PropTypes.oneOf(Object.keys(alignedDimensions)),
};

MaskDrawing.defaultProps = {
  imgSrc: null,
  signImage: true,
  anatomicalRegion: null,
};
