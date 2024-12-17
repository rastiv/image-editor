import { useState, useEffect } from "react";
import { Spinner } from "@/components/Spinner";
import { degree2Rad, getBoundingRect } from "./editor-utils";

const ImageEditorForm = ({ setApply, crop, width, image, onSave }) => {
  const [loading, setLoading] = useState(true);
  const [base64, setBase64] = useState("");

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = image.original;

    img.onload = () => {
      // const ratio = image.width / width;
      // const canvas = document.createElement("canvas");
      // canvas.width = Math.round(crop.w * ratio);
      // canvas.height = Math.round(crop.h * ratio);
      // const ctx = canvas.getContext("2d");
      // ctx.drawImage(
      //   img,
      //   Math.round(crop.x * ratio),
      //   Math.round(crop.y * ratio),
      //   Math.round(crop.w * ratio),
      //   Math.round(crop.h * ratio),
      //   0,
      //   0,
      //   Math.round(crop.w * ratio),
      //   Math.round(crop.h * ratio)
      // );
      // setBase64(canvas.toDataURL("image/jpeg"));
      // setLoading(false);

      // 1. resize image
      const newWidth = Math.round(image.width * 0.15);
      const newHeight = Math.round(image.height * 0.15);
      const resizedCanvas = document.createElement("canvas");
      resizedCanvas.width = newWidth;
      resizedCanvas.height = newHeight;
      const resizedCtx = resizedCanvas.getContext("2d");
      resizedCtx.drawImage(
        img,
        0,
        0,
        image.width,
        image.height,
        0,
        0,
        newWidth,
        newHeight
      );

      // 2. rotate image
      const degree = 90;
      const rotatedCanvas = document.createElement("canvas");
      const rotatedRect = getBoundingRect(newWidth, newHeight, degree);
      rotatedCanvas.width = rotatedRect.width;
      rotatedCanvas.height = rotatedRect.height;
      const rotatedCtx = rotatedCanvas.getContext("2d");
      rotatedCtx.translate(rotatedCanvas.width / 2, rotatedCanvas.height / 2);
      rotatedCtx.rotate(degree2Rad(degree));
      rotatedCtx.drawImage(resizedCanvas, -newWidth / 2, -newHeight / 2);

      // 3. flip horizontally and vertically
      // https://jsfiddle.net/yong/ZJQX5/
      const flipH = true;
      const flipV = true;
      const scaleH = flipH ? -1 : 1;
      const scaleV = flipV ? -1 : 1;
      const positioX = flipH ? rotatedRect.width * -1 : 0;
      const positioY = flipV ? rotatedRect.height * -1 : 0;
      const flippedCanvas = document.createElement("canvas");
      flippedCanvas.width = rotatedRect.width;
      flippedCanvas.height = rotatedRect.height;
      const flippedCtx = flippedCanvas.getContext("2d");
      flippedCtx.scale(scaleH, scaleV);
      flippedCtx.drawImage(
        rotatedCanvas,
        positioX,
        positioY,
        rotatedRect.width,
        rotatedRect.height
      );

      // 5. crop image

      setBase64(flippedCanvas.toDataURL("image/jpeg"));
      // console.log(rotatedCanvas.toDataURL("image/jpeg"));
      setLoading(false);
    };
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
