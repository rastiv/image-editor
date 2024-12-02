import { useEffect, useRef } from "react";

const lineStyle = "absolute border border-dashed border-white opacity-50";
const pointerStyle =
  "absolute size-2 box-border border border-blue-400 bg-white";

const ImageEditorFrame = ({ wrapper, clippedImage, ratio, crop, setCrop }) => {
  const frameRef = useRef(null);
  const startPointRef = useRef(false);
  const directionRef = useRef(false);

  const handleMoveStart = (e) => {
    e.preventDefault();
    startPointRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleCropStart = (e, type, cursor) => {
    e.preventDefault();
    e.stopPropagation();
    startPointRef.current = { x: e.clientX, y: e.clientY };
    directionRef.current = type;
    frameRef.current.style.cursor = `${cursor}-resize`;
    document.body.style.cursor = `${cursor}-resize`;
  };

  useEffect(() => {
    const handleMove = (e) => {
      e.preventDefault();

      // handle moving the frame
      if (startPointRef.current && !directionRef.current) {
        const { offsetWidth: wrpWidth, offsetHeight: wrpHeight } = wrapper;
        const { offsetWidth: frmWidth, offsetHeight: frmHeight } =
          frameRef.current;
        const { x, y } = startPointRef.current;
        const el = frameRef.current;

        const newX = crop.x + (e.clientX - x);
        const newY = crop.y + (e.clientY - y);

        const left =
          newX > 0
            ? newX + frmWidth > wrpWidth
              ? wrpWidth - frmWidth
              : newX
            : 0;
        const top =
          newY > 0
            ? newY + frmHeight > wrpHeight
              ? wrpHeight - frmHeight
              : newY
            : 0;

        el.style.top = `${top}px`;
        el.style.left = `${left}px`;
        clippedImage.style.clipPath = `xywh(${left}px ${top}px ${crop.w}px ${crop.h}px)`;
      }

      // handle resizing the frame
      if (directionRef.current) {
        const el = frameRef.current;
        const { x: x2, y: y2 } = startPointRef.current;
        const { offsetWidth: wrpWidth, offsetHeight: wrpHeight } = wrapper;
        let { x: newX, y: newY, w: newW, h: newH } = crop;
        const ratioProportion =
          ratio === "original"
            ? wrpWidth / wrpHeight
            : ratio === "free"
            ? 0
            : ratio.split(":").reduce((a, b) => a / b);

        if (ratioProportion === 0) {
          if (["r", "tr", "br"].includes(directionRef.current)) {
            newW += e.clientX - x2;
            if (newW + newX > wrpWidth) newW = wrpWidth - newX;
          }
          if (["b", "bl", "br"].includes(directionRef.current)) {
            newH += e.clientY - y2;
            if (newH + newY > wrpHeight) newH = wrpHeight - newY;
          }
          if (["l", "bl", "tl"].includes(directionRef.current)) {
            const right = wrpWidth - crop.w - crop.x;
            newX += e.clientX - x2;
            if (newX < 0) newX = 0;
            newW = wrpWidth - newX - right;
          }
          if (["t", "tl", "tr"].includes(directionRef.current)) {
            const bottom = wrpHeight - crop.h - crop.y;
            newY += e.clientY - y2;
            if (newY < 0) newY = 0;
            newH = wrpHeight - newY - bottom;
          }
        }

        // if (directionRef.current === "br") {
        //   //
        // }
        // if (["r", "tr"].includes(directionRef.current)) {
        //   newW += e.clientX - x2;
        //   if (newW < 40) newW = 40;
        //   if (newW + newX > wrpWidth) newW = wrpWidth - newX;
        //   if (ratioProportion !== 0) newH = Math.round(newW / ratioProportion);
        // }
        // if (["b", "bl"].includes(directionRef.current)) {
        //   newH += e.clientY - y2;
        //   if (newH < 40) newH = 40;
        //   if (newH + newY > wrpHeight) newH = wrpHeight - newY;
        //   if (ratioProportion !== 0) newW = Math.round(newH * ratioProportion);
        // }
        // if (["l", "bl", "tl"].includes(directionRef.current)) {
        //   const right = wrpWidth - crop.w - crop.x;
        //   newX += e.clientX - x2;
        //   if (newX < 0) newX = 0;
        //   newW = wrpWidth - newX - right;
        //   if (newW < 40) {
        //     newW = 40;
        //     newX = wrpWidth - right - 40;
        //   }
        // }
        // if (["t", "tl", "tr"].includes(directionRef.current)) {
        //   const bottom = wrpHeight - crop.h - crop.y;
        //   newY += e.clientY - y2;
        //   if (newY < 0) newY = 0;
        //   newH = wrpHeight - newY - bottom;
        //   if (newH < 40) {
        //     newH = 40;
        //     newY = wrpHeight - bottom - 40;
        //   }
        //   if (ratioProportion !== 0) {
        //     newW = Math.round(newH * ratioProportion);
        //     newY = wrpHeight - newH - bottom;
        //   }
        // }

        // if (newH + newY > wrpHeight) {
        //   newH = wrpHeight - newY;
        //   if (ratioProportion !== 0) newW = Math.round(newH * ratioProportion);
        // }

        // if (newW + newX > wrpWidth) {
        //   newW = wrpWidth - newX;
        //   if (ratioProportion !== 0) newH = Math.round(newW / ratioProportion);
        // }

        el.style.left = `${newX}px`;
        el.style.top = `${newY}px`;
        el.style.width = `${newW}px`;
        el.style.height = `${newH}px`;
        clippedImage.style.clipPath = `xywh(${newX}px ${newY}px ${newW}px ${newH}px)`;
      }
    };

    const handelMoveEnd = () => {
      setCrop({
        x: frameRef.current.offsetLeft,
        y: frameRef.current.offsetTop,
        w: frameRef.current.offsetWidth,
        h: frameRef.current.offsetHeight,
      });
      startPointRef.current = false;
      directionRef.current = false;
      frameRef.current.style.cursor = "move";
      document.body.style.cursor = "auto";
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handelMoveEnd);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handelMoveEnd);
    };
  }, [clippedImage.style, crop, ratio, setCrop, wrapper]);

  return (
    <div
      ref={frameRef}
      className="absolute inset-0 box-border bg-transparent cursor-move border border-blue-500"
      onMouseDown={handleMoveStart}
      style={{
        top: crop.y,
        left: crop.x,
        width: crop.w,
        height: crop.h,
      }}
    >
      <span
        className={`${lineStyle} left-[33%] top-0 w-[33%] h-full border-t-0 border-b-0`}
      />
      <span
        className={`${lineStyle} left-0 top-[33%] w-full h-[33%] border-l-0 border-r-0`}
      />
      <span
        className={`${pointerStyle} -top-1 -left-1 cursor-nwse-resize`}
        onMouseDown={(e) => handleCropStart(e, "tl", "nwse")}
      />
      <span
        className={`${pointerStyle} -top-1 -right-1 cursor-nesw-resize`}
        onMouseDown={(e) => handleCropStart(e, "tr", "nesw")}
      />
      <span
        className={`${pointerStyle} -bottom-1 -right-1 cursor-nwse-resize`}
        onMouseDown={(e) => handleCropStart(e, "br", "nwse")}
      />
      <span
        className={`${pointerStyle} -bottom-1 -left-1 cursor-nesw-resize`}
        onMouseDown={(e) => handleCropStart(e, "bl", "nesw")}
      />
      <span
        className={`${pointerStyle} -top-1 left-[50%] -translate-x-1/2 cursor-ns-resize`}
        onMouseDown={(e) => handleCropStart(e, "t", "ns")}
      />
      <span
        className={`${pointerStyle} top-[50%] -right-1 -translate-y-1/2 cursor-ew-resize`}
        onMouseDown={(e) => handleCropStart(e, "r", "ew")}
      />
      <span
        className={`${pointerStyle} -bottom-1 left-[50%] -translate-x-1/2 cursor-ns-resize`}
        onMouseDown={(e) => handleCropStart(e, "b", "ns")}
      />
      <span
        className={`${pointerStyle} top-[50%] -left-1 -translate-y-1/2 cursor-ew-resize`}
        onMouseDown={(e) => handleCropStart(e, "l", "ew")}
      />
    </div>
  );
};

export default ImageEditorFrame;
