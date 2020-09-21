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
  bucket: config.SEARCH_BUCKET
};



function getMousePos(evt) {
  const canvas = evt.target;
  const rect = canvas.getBoundingClientRect();
  return [
    ((evt.clientX - rect.left) * canvas.width) / canvas.clientWidth,
    ((evt.clientY - rect.top) * canvas.height) / canvas.clientHeight
  ];
}

const img = new Image();

export default function MaskDrawing({ imgSrc, onMaskChange }) {
  const [isDrawing, setDrawing] = useState(false);
  const canvasRef = useRef(null);
  const [pathStart, setPathStart] = useState([]);
  const [signedImgSrc, setSignedImgSrc] = useState(null);

  const handleClearMask = () => {
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, 20000, 20000);
      ctx.beginPath();
      ctx.closePath();
      onMaskChange(null);
    }
  };

  useEffect(() => {
    if (imgSrc) {
      signedLink(imgSrc).then(signed => {
        setSignedImgSrc(signed);
      });
    }
  }, [imgSrc]);

  useEffect(() => {
    // fetch the input image and save it to the state
    if (imgSrc) {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, 20000, 20000);
        ctx.beginPath();
        ctx.closePath();
      }

      // horrible hack to get canvas and cross origin images working. We can't
      // load the image by placing an unsinged url in the img.src attribute, because
      // AWS wont respond. We also can't use a signed url, and the 
      // img.crossorigin='anonymous' attribute, because AWS doesn't send back the
      // correct CORS headers. So we have to download the image as a blob, generate
      // an object url and then save that to the image in order to get past all the
      // fucking security measures.
      Storage.get(imgSrc, storageOptions).then(result => {
        const objUrl = URL.createObjectURL(result.Body);
        img.src = objUrl;
      });

      img.crossOrigin = 'anonymous';
    }
  }, [imgSrc]);

  if (!imgSrc) {
    return (
      <div className="mdplaceholder">
        <h2>Choose a channel to create your mask</h2>
        <img
          src="/maskplaceholder.jpg"
          alt="desaturated color depth mip placeholder"
        />
      </div>
    );
  }

  const handleCreateMask = () => {
    // get the image data and serialize it
    const ctx = canvasRef.current.getContext("2d");
    ctx.save();
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 20000, 20000);
    ctx.clip();
    ctx.drawImage(img, 0, 0);
    ctx.restore();
    canvasRef.current.toBlob(data => onMaskChange(data));
  };

  const handleMouseMove = e => {
    if (isDrawing) {
      const position = getMousePos(e);
      const ctx = canvasRef.current.getContext("2d");
      ctx.lineTo(...position);
      ctx.stroke();
    }
  };

  const handleMouseUp = e => {
    if (e.button === 0) {
      setDrawing(false);
      const position = getMousePos(e);
      const ctx = canvasRef.current.getContext("2d");
      ctx.lineTo(...position);
      ctx.stroke();

      // close path
      ctx.lineWidth = "2";
      ctx.lineTo(pathStart[0], pathStart[1]);
      ctx.stroke();
      ctx.closePath();
    }
  };

  const handleMouseDown = e => {
    if (e.button === 0) {
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
            width: 1210,
            height: 566
          }}
          width={1210}
          height={566}
        />
        <img src={signedImgSrc} alt="desaturated color depth mip placeholder" />
      </div>
      <Button type="primary" onClick={handleCreateMask}>
        Create Mask
      </Button>
      <Button onClick={handleClearMask}>Clear Mask</Button>
    </div>
  );
}

MaskDrawing.propTypes = {
  imgSrc: PropTypes.string,
  onMaskChange: PropTypes.func.isRequired
};

MaskDrawing.defaultProps = {
  imgSrc: null
};
