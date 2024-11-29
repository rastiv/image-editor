import React from "react";

const lineStyle = "absolute border border-dashed border-white opacity-50";
const pointerStyle =
  "absolute size-2 box-border border border-blue-400 bg-white";

const ImageEditorFrame = ({ clippedImage, position, ratio, setPosition }) => {
  const handleMoveStart = (e) => {
    console.log(e.target);
  };
  const handleMove = (e) => {
    console.log(e.target);
  };
  const handleMoveEnd = (e) => {
    console.log(e.target);
  };
  const handleResize = (e) => {};

  return (
    <div
      className="absolute inset-0 box-border bg-transparent cursor-move border border-blue-500"
      draggable="true"
      onDragStart={handleMoveStart}
      onDrag={handleMove}
      onDragEnd={handleMoveEnd}
      onClick={() => console}
      style={{
        top: position.y,
        left: position.x,
        width: position.w,
        height: position.h,
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
