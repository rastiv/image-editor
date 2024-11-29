import { useEffect, useRef } from "react";

const lineStyle = "absolute border border-dashed border-white opacity-50";
const pointerStyle =
  "absolute size-2 box-border border border-blue-400 bg-white";

const ImageEditorFrame = ({ wrapper, clippedImage, ratio, crop, setCrop }) => {
  const frameRef = useRef(null);
  const pivotRef = useRef(false);

  const handleMoveStart = (e) => {
    pivotRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleCrop = (e) => {};

  useEffect(() => {
    const handleMove = (e) => {
      if (!pivotRef.current) return;
      const { offsetWidth: wrpWidth, offsetHeight: wrpHeight } = wrapper;
      const { offsetWidth: frmWidth, offsetHeight: frmHeight } =
        frameRef.current;
      const { x, y } = pivotRef.current;
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
    };

    const handelMoveEnd = () => {
      pivotRef.current = false;
      const { offsetLeft, offsetTop } = frameRef.current;
      setCrop({ ...crop, x: offsetLeft, y: offsetTop });
    };

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseup", handelMoveEnd);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseup", handelMoveEnd);
    };
  }, [clippedImage.style, crop, setCrop, wrapper]);

  return (
    <div
      ref={frameRef}
      className="absolute inset-0 box-border bg-transparent cursor-move border border-blue-500"
      onMouseDown={handleMoveStart}
      onClick={() => console}
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
      <span className={`${pointerStyle} -top-1 -left-1 cursor-nwse-resize`} />
      <span className={`${pointerStyle} -top-1 -right-1 cursor-nesw-resize`} />
      <span
        className={`${pointerStyle} -bottom-1 -right-1 cursor-nwse-resize`}
      />
      <span
        className={`${pointerStyle} -bottom-1 -left-1 cursor-nesw-resize`}
      />
      <span
        className={`${pointerStyle} -top-1 left-[50%] -translate-x-1/2 cursor-ns-resize`}
      />
      <span
        className={`${pointerStyle} top-[50%] -right-1 -translate-y-1/2 cursor-ew-resize`}
      />
      <span
        className={`${pointerStyle} -bottom-1 left-[50%] -translate-x-1/2 cursor-ns-resize`}
      />
      <span
        className={`${pointerStyle} top-[50%] -left-1 -translate-y-1/2 cursor-ew-resize`}
      />
    </div>
  );
};

export default ImageEditorFrame;
