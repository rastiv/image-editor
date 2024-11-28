import { useLayoutEffect, useRef, useState } from "react";

const ImageEditor = ({ image, onAfterSave }) => {
  const [loading, setLoading] = useState(true);
  const imgRef = useRef(null);

  useLayoutEffect(() => {
    console.log(imgRef.current.offsetWidth, image.width / image.height);
    const proportion = image.width / image.height;
    console.log(imgRef.current.offsetWidth);
    imgRef.current.style.height = `${
      imgRef.current.offsetWidth / proportion
    }px`;
  }, []);

  return (
    <div className="mt-4">
      <div ref={imgRef} className="flex justify-center items-center">
        {/* <img
          onLoad={() => setLoading(false)}
          src={image.original}
          alt={image.id}
        /> */}
      </div>
    </div>
  );
};

export default ImageEditor;
