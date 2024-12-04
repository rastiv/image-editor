import { useEffect } from "react";

const ImageEditorForm = ({ apply, setApply, crop, image, onSave }) => {
  useEffect(() => {
    if (apply) {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = image.original;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = crop.w;
        canvas.height = crop.h;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(
          img, // image element
          crop.x, // x position to start clipping
          crop.y, // y position to start clipping
          crop.w, // width of clipped image
          crop.h, // height of clipped image
          0, // x position to place the image on the canvas (should be 0)
          0, // y position to place the image on the canvas (should be 0)
          image.width, // width of the image to use (should be the same as clipped image width)
          image.height // height of the image to use (should be the same as clipped image height)
        );
        // const base64String = canvas.toDataURL("image/jpeg");
        console.log(apply, image, crop);
      };
    }
  }, [image, crop, apply]);

  return (
    <div
      className="absolute inset-0 z-10 bg-white flex flex-col gap-1"
      style={{ display: apply ? "flex" : "none" }}
    >
      <div className="flex-1">Cropped image preview</div>
      <div className="flex justify-end gap-4">
        <button
          className="px-4 py-1 rounded-sm"
          onClick={() => setApply(false)}
        >
          Cancel
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded-sm"
          onClick={onSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ImageEditorForm;
