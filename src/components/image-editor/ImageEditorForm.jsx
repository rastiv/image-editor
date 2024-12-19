import { useState, useEffect } from "react";
import { Spinner } from "@/components/Spinner";
import { degree2Rad, getBoundingRect } from "./editor-utils";

const canvasResize = (prevCnv, newWidth, newHeight) => {
  const cnv = document.createElement("canvas");
  const ctx = cnv.getContext("2d");
  cnv.width = newWidth;
  cnv.height = newHeight;
  ctx.drawImage(prevCnv, 0, 0, newWidth, newHeight);
  return cnv;
};

const canvasRotate = (prevCnv, degree) => {
  const cnv = document.createElement("canvas");
  const ctx = cnv.getContext("2d");
  const is180 = degree === 0 || degree === 180;

  cnv.width = is180 ? prevCnv.width : prevCnv.height;
  cnv.height = is180 ? prevCnv.height : prevCnv.width;

  let translateX =
    degree === 90 ? prevCnv.height : degree === 180 ? prevCnv.width : 0;

  let translateY =
    degree === 180 ? prevCnv.height : degree === 270 ? prevCnv.width : 0;

  ctx.translate(translateX, translateY);
  ctx.rotate(degree2Rad(degree));
  ctx.drawImage(prevCnv, 0, 0, prevCnv.width, prevCnv.height);
  return cnv;
};

const canvasFlipHorizontal = (prevCnv, flip) => {
  const cnv = document.createElement("canvas");
  const ctx = cnv.getContext("2d");

  cnv.width = prevCnv.width;
  cnv.height = prevCnv.height;
  ctx.scale(flip ? -1 : 1, 1);

  ctx.drawImage(
    prevCnv,
    flip ? -prevCnv.width : 0,
    0,
    prevCnv.width,
    prevCnv.height
  );
  return cnv;
};

const canvasFlipVertical = (prevCnv, flip) => {
  const cnv = document.createElement("canvas");
  const ctx = cnv.getContext("2d");

  cnv.width = prevCnv.width;
  cnv.height = prevCnv.height;
  ctx.scale(1, flip ? -1 : 1);

  ctx.drawImage(
    prevCnv,
    0,
    flip ? -prevCnv.height : 0,
    prevCnv.width,
    prevCnv.height
  );
  return cnv;
};

const ImageEditorForm = ({ setApply, crop, width, image, onSave }) => {
  const [loading, setLoading] = useState(true);
  const [base64, setBase64] = useState("");

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = image.original;

    img.onload = () => {
      const resizedCanvas = canvasResize(
        img,
        Math.round(img.width / 2),
        Math.round(img.height / 2)
      );
      const rotatedCanvas = canvasRotate(resizedCanvas, 90);
      const flippedHCanvas = canvasFlipHorizontal(rotatedCanvas, true);
      const flippedVCanvas = canvasFlipVertical(flippedHCanvas, true);

      // use rotateFlip array and iterate its items

      setBase64(flippedVCanvas.toDataURL("image/jpeg"));
      setLoading(false);
    };

    // img.onload = () => {
    //   // const ratio = image.width / width;
    //   // const canvas = document.createElement("canvas");
    //   // canvas.width = Math.round(crop.w * ratio);
    //   // canvas.height = Math.round(crop.h * ratio);
    //   // const ctx = canvas.getContext("2d");
    //   // ctx.drawImage(
    //   //   img,
    //   //   Math.round(crop.x * ratio),
    //   //   Math.round(crop.y * ratio),
    //   //   Math.round(crop.w * ratio),
    //   //   Math.round(crop.h * ratio),
    //   //   0,
    //   //   0,
    //   //   Math.round(crop.w * ratio),
    //   //   Math.round(crop.h * ratio)
    //   // );
    //   // setBase64(canvas.toDataURL("image/jpeg"));
    //   // setLoading(false);
  }, []);

  return (
    <div className="absolute top-0 -left-1 bottom-0 -right-1 px-1 bg-white flex flex-col gap-1">
      <div className="flex-1 flex justify-center items-center">
        {loading && <Spinner className="size-6" />}
        {!loading && (
          <div
            className="w-full h-full bg-no-repeat bg-center bg-contain"
            style={{ backgroundImage: `url(${base64})` }}
          />
        )}
      </div>
      <div className="flex justify-end gap-4">
        <button
          className="px-4 py-1 rounded-sm"
          onClick={() => setApply(false)}
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded-sm"
          onClick={() => onSave(base64)}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ImageEditorForm;
