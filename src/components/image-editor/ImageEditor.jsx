import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Spinner } from "@/components/Spinner";
import ImageEditorTools from "./ImageEditorTools";
import ImageEditorFrame from "./ImageEditorFrame";
import ImageEditorActions from "./ImageEditorActions";
import ImageEditorForm from "./ImageEditorForm";

const offsetPercent = 0.1;

const getInitalCrop = (ratio, width, height) => {
  const proportion = width / height;
  let crop = { x: 0, y: 0, w: 0, h: 0 };
  switch (ratio) {
    case "1:1": {
      crop.w = Math.round(
        (proportion > 1 ? height : width) * (1 - offsetPercent * 2)
      );
      crop.h = crop.w;
      break;
    }
    case "16:9":
    case "4:3": {
      const ratioProportion = ratio.split(":").reduce((a, b) => a / b);
      if (proportion > ratioProportion) {
        crop.h = height * (1 - offsetPercent * 2);
        crop.w = crop.h * ratioProportion;
      } else {
        crop.w = width * (1 - offsetPercent * 2);
        crop.h = crop.w / ratioProportion;
      }
      break;
    }
    default: {
      crop.w = width * (1 - offsetPercent * 2);
      crop.h = height * (1 - offsetPercent * 2);
      break;
    }
  }
  crop.x = (width - crop.w) / 2;
  crop.y = (height - crop.h) / 2;
  return crop;
};

const ImageEditor = ({ image, onSave }) => {
  const [loading, setLoading] = useState(true);
  const [ratio, setRatio] = useState("1:1");
  const [crop, setCrop] = useState({});
  const [apply, setApply] = useState(false);
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
      setCrop(getInitalCrop(ratio, offsetWidth, offsetHeight));
    }
  }, [ratio, loading]);

  const handleReset = () => {
    setCrop(
      getInitalCrop(
        ratio,
        wrapperRef.current.offsetWidth,
        wrapperRef.current.offsetHeight
      )
    );
  };

  return (
    <div className="relative mt-4 py-[1px]">
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
            clipPath: `xywh(${crop.x}px ${crop.y}px ${crop.w}px ${crop.h}px)`,
          }}
        />
        {!loading && (
          <ImageEditorFrame
            wrapper={wrapperRef.current}
            clippedImage={clippedRef.current}
            ratio={ratio}
            crop={crop}
            setCrop={setCrop}
          />
        )}
      </div>
      <ImageEditorActions
        loading={loading}
        onReset={handleReset}
        setApply={setApply}
      />
      {apply && (
        <ImageEditorForm
          setApply={setApply}
          crop={crop}
          wrapperWidth={wrapperRef.current?.offsetWidth}
          image={image}
          onSave={onSave}
        />
      )}
    </div>
  );
};

export default ImageEditor;
