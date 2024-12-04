import { useState, useEffect } from "react";
import { Spinner } from "@/components/Spinner";

const ImageEditorForm = ({ setApply, crop, width, image, onSave }) => {
  const [loading, setLoading] = useState(true);
  const [base64, setBase64] = useState("");

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = image.original;

    img.onload = () => {
      const ratio = image.width / width;
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(crop.w * ratio);
      canvas.height = Math.round(crop.h * ratio);
      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        img,
        Math.round(crop.x * ratio),
        Math.round(crop.y * ratio),
        Math.round(crop.w * ratio),
        Math.round(crop.h * ratio),
        0,
        0,
        Math.round(crop.w * ratio),
        Math.round(crop.h * ratio)
      );
      setBase64(canvas.toDataURL("image/jpeg"));
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
