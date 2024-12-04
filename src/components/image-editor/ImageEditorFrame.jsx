import { useEffect, useRef } from "react";
import { getCropPositions } from "./editor-utils";

const lineStyle = "absolute border border-dashed border-white opacity-50";
const pointerStyle =
  "absolute size-2 box-border border border-blue-500 bg-white";

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

        const { x, y, w, h } = getCropPositions(
          directionRef.current,
          ratio,
          startPointRef.current.x,
          startPointRef.current.y,
          e.clientX,
          e.clientY,
          wrapper.offsetWidth,
          wrapper.offsetHeight,
          crop,
          el
        );

        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.style.width = `${w}px`;
        el.style.height = `${h}px`;
        clippedImage.style.clipPath = `xywh(${x}px ${y}px ${w}px ${h}px)`;
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
      className="absolute inset-0 box-border bg-transparent cursor-move"
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
        className="absolute left-0 top-0 w-full h-[2px] -translate-y-[1px] bg-blue-500 cursor-ns-resize"
        onMouseDown={(e) => handleCropStart(e, "t", "ns")}
      />
      <span
        className="absolute right-0 top-0 h-full w-[2px] translate-x-[1px] bg-blue-500 cursor-ew-resize"
        onMouseDown={(e) => handleCropStart(e, "r", "ew")}
      />
      <span
        className="absolute left-0 bottom-0 w-full h-[2px] translate-y-[1px] bg-blue-500 cursor-ns-resize"
        onMouseDown={(e) => handleCropStart(e, "b", "ns")}
      />
      <span
        className="absolute left-0 top-0 h-full w-[2px] -translate-x-[1px] bg-blue-500 cursor-ew-resize"
        onMouseDown={(e) => handleCropStart(e, "l", "ew")}
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
