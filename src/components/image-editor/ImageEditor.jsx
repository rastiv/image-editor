import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Spinner } from "@/components/Spinner";
import ImageEditorTools from "./ImageEditorTools";
import ImageEditorFrame from "./ImageEditorFrame";

const offsetPercent = 0.1;

const getInitalPositions = (ratio, width, height) => {
  const proportion = width / height;
  let position = { x: 0, y: 0, w: 0, h: 0 };
  switch (ratio) {
    case "1:1": {
      position.w = Math.round(
        (proportion > 1 ? height : width) * (1 - offsetPercent * 2)
      );
      position.h = position.w;
      break;
    }
    case "16:9":
    case "4:3": {
      const ratioProportion = ratio.split(":").reduce((a, b) => a / b);
      if (proportion > ratioProportion) {
        position.h = height * (1 - offsetPercent * 2);
        position.w = position.h * ratioProportion;
      } else {
        position.w = width * (1 - offsetPercent * 2);
        position.h = position.w / ratioProportion;
      }
      break;
    }
    default: {
      position.w = width * (1 - offsetPercent * 2);
      position.h = height * (1 - offsetPercent * 2);
      break;
    }
  }
  position.x = (width - position.w) / 2;
  position.y = (height - position.h) / 2;
  return position;
};

const ImageEditor = ({ image, onAfterSave }) => {
  const [loading, setLoading] = useState(true);
  const [ratio, setRatio] = useState("1:1");
  const [position, setPosition] = useState({});
  const wrapperRef = useRef(null);
  const clippedRef = useRef(null);

  useLayoutEffect(() => {
    const proportion = image.width / image.height;
    wrapperRef.current.style.height = `${
      wrapperRef.current.offsetWidth / proportion
    }px`;
  }, []);

  useEffect(() => {
    if (!loading) {
      const { offsetWidth, offsetHeight } = wrapperRef.current;
      setPosition(getInitalPositions(ratio, offsetWidth, offsetHeight));
    }
  }, [ratio, loading]);

  return (
    <div className="mt-4">
      <ImageEditorTools ratio={ratio} setRatio={setRatio} />
      <div
        ref={wrapperRef}
        className="relative flex justify-center items-center"
      >
        {loading && <Spinner className="size-6" />}
        <img
          onLoad={() => setLoading(false)}
          src={image.original}
          alt={image.id}
          style={{ opacity: loading ? 0 : 0.5 }}
        />
        <img
          ref={clippedRef}
          src={image.original}
          alt={image.id}
          className="absolute inset-0"
          style={{
            opacity: loading ? 0 : 1,
            clipPath: `xywh(${position.x}px ${position.y}px ${position.w}px ${position.h}px)`,
          }}
        />
        {!loading && (
          <ImageEditorFrame
            clippedImage={clippedRef.current}
            position={position}
            ration={ratio}
            setPosition={setPosition}
          />
        )}
      </div>
    </div>
  );
};

export default ImageEditor;
