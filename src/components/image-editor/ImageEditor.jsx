import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Spinner } from "@/components/Spinner";
import ImageEditorTools from "./ImageEditorTools";
import ImageEditorFrame from "./ImageEditorFrame";

const getInitalPositions = (image, ration) => {};
const offsetPercent = 10 / 100;

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
      const proportion = offsetWidth / offsetHeight;
      let position = { x: 0, y: 0, w: 0, h: 0 };
      switch (ratio) {
        case "1:1": {
          const size = Math.round(
            (proportion > 1 ? offsetHeight : offsetWidth) *
              (1 - offsetPercent * 2)
          );
          console.log(size);
          position.x = proportion > 1 ? (offsetWidth - offsetHeight) / 2 : 0;
          position.y = proportion > 1 ? 0 : (offsetHeight - offsetWidth) / 2;
          position.w = size;
          position.h = size;
          break;
        }
        default:
          position.x = proportion > 1 ? (offsetWidth - offsetHeight) / 2 : 0;
          position.y = proportion > 1 ? 0 : (offsetHeight - offsetWidth) / 2;
          position.w = proportion > 1 ? offsetHeight : offsetWidth;
          position.h = proportion > 1 ? offsetHeight : offsetWidth;
          break;
      }
      setPosition(position);
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
            setPosition={setPosition}
          />
        )}
      </div>
    </div>
  );
};

export default ImageEditor;
