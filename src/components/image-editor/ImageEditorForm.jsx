import { useState, useEffect } from "react";
import { Spinner } from "@/components/Spinner";
import { degree2Rad } from "./editor-utils";

function updateCanvas(img) {
  let prevCnv = img;

  return {
    resize: function (width, height) {
      const cnv = document.createElement("canvas");
      const ctx = cnv.getContext("2d");

      cnv.width = width;
      cnv.height = height;
      ctx.drawImage(prevCnv, 0, 0, width, height);

      prevCnv = cnv;
      return this;
    },

    rotate: function (deg) {
      const cnv = document.createElement("canvas");
      const ctx = cnv.getContext("2d");

      const is180 = deg === 0 || deg === 180;

      cnv.width = is180 ? prevCnv.width : prevCnv.height;
      cnv.height = is180 ? prevCnv.height : prevCnv.width;

      let translateX =
        deg === 90 ? prevCnv.height : deg === 180 ? prevCnv.width : 0;

      let translateY =
        deg === 180 ? prevCnv.height : deg === 270 ? prevCnv.width : 0;

      ctx.translate(translateX, translateY);
      ctx.rotate(degree2Rad(deg));
      ctx.drawImage(prevCnv, 0, 0, prevCnv.width, prevCnv.height);

      prevCnv = cnv;
      return this;
    },

    flip: function (direction) {
      if (!direction) return this;

      const cnv = document.createElement("canvas");
      const ctx = cnv.getContext("2d");

      cnv.width = prevCnv.width;
      cnv.height = prevCnv.height;
      ctx.scale(direction === "H" ? -1 : 1, direction === "V" ? -1 : 1);
      ctx.drawImage(
        prevCnv,
        direction === "H" ? -prevCnv.width : 0,
        direction === "V" ? -prevCnv.height : 0,
        prevCnv.width,
        prevCnv.height
      );

      prevCnv = cnv;
      return this;
    },

    crop: function (x, y, w, h) {
      const cnv = document.createElement("canvas");
      const ctx = cnv.getContext("2d");

      const ratio = prevCnv.width / w;
      cnv.width = Math.round(w * ratio);
      cnv.height = Math.round(h * ratio);
      ctx.drawImage(
        img,
        Math.round(x * ratio),
        Math.round(y * ratio),
        Math.round(w * ratio),
        Math.round(h * ratio),
        0,
        0,
        Math.round(w * ratio),
        Math.round(h * ratio)
      );

      prevCnv = cnv;
      return this;
    },

    get: function () {
      return prevCnv;
    },
  };
}

const ImageEditorForm = ({ setApply, crop, width, image, onSave }) => {
  const [loading, setLoading] = useState(true);
  const [base64, setBase64] = useState("");

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = image.original;

    img.onload = () => {
      const operations = [
        {
          func: "resize",
          args: [Math.round(img.width / 2), Math.round(img.height / 2)],
        },
        // { func: "rotate", args: [90] },
        // { func: "flip", args: ["H"] },
        // { func: "flip", args: ["V"] },
        { func: "crop", args: [crop.x, crop.y, crop.w, crop.h] },
      ];
      const updatedCanvas = new updateCanvas(img);
      operations.forEach((operation) => {
        updatedCanvas[operation.func](...operation.args);
      });

      setBase64(updatedCanvas.get().toDataURL("image/jpeg"));
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
