import { useState, useEffect } from "react";
import { Spinner } from "@/components/Spinner";
import { canvas } from "framer-motion/client";

const ImageEditorForm = ({ setApply, crop, width, image, onSave }) => {
  const [loading, setLoading] = useState(true);
  const [base64, setBase64] = useState("");

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = image.original;

    function getBoundingRect(width, height, degree) {
      let rad = Degree2Rad(degree);
      let points = [
        { x: 0, y: 0 },
        { x: width, y: 0 },
        { x: width, y: height },
        { x: 0, y: height },
      ];
      let minX = undefined;
      let minY = undefined;
      let maxX = 0;
      let maxY = 0;
      for (let index = 0; index < points.length; index++) {
        const point = points[index];
        const rotatedPoint = getRotatedPoint(
          point.x,
          point.y,
          width / 2,
          height / 2,
          rad
        );
        if (minX == undefined) {
          minX = rotatedPoint.x;
        } else {
          minX = Math.min(rotatedPoint.x, minX);
        }
        if (minY == undefined) {
          minY = rotatedPoint.y;
        } else {
          minY = Math.min(rotatedPoint.y, minY);
        }
        maxX = Math.max(rotatedPoint.x, maxX);
        maxY = Math.max(rotatedPoint.y, maxY);
      }
      let rectWidth = maxX - minX;
      let rectHeight = maxY - minY;
      let rect = {
        x: minX,
        y: minY,
        width: rectWidth,
        height: rectHeight,
      };
      return rect;
    }

    function Degree2Rad(degree) {
      return (degree * Math.PI) / 180;
    }

    //https://gamedev.stackexchange.com/questions/86755/how-to-calculate-corner-positions-marks-of-a-rotated-tilted-rectangle
    function getRotatedPoint(x, y, cx, cy, theta) {
      let tempX = x - cx;
      let tempY = y - cy;

      // now apply rotation
      let rotatedX = tempX * Math.cos(theta) - tempY * Math.sin(theta);
      let rotatedY = tempX * Math.sin(theta) + tempY * Math.cos(theta);

      // translate back
      x = rotatedX + cx;
      y = rotatedY + cy;
      let point = { x: x, y: y };
      return point;
    }

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
      rotatedCtx.rotate(Degree2Rad(degree));
      rotatedCtx.drawImage(resizedCanvas, -newWidth / 2, -newHeight / 2);

      // 3. flip horizontally
      // 4. flip vertically
      // 5. crop image

      setBase64(resizedCanvas.toDataURL("image/jpeg"));
      console.log(rotatedCanvas.toDataURL("image/jpeg"));
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
