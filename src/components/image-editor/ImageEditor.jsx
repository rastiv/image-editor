import { useLayoutEffect, useRef, useState } from "react";
import { Spinner } from "@/components/Spinner";
import ImageEditorTools from "./ImageEditorTools";

const ImageEditor = ({ image, onAfterSave }) => {
  const [loading, setLoading] = useState(true);
  const [aspectRation, setAspectRation] = useState("free");
  const imgRef = useRef(null);

  useLayoutEffect(() => {
    const proportion = image.width / image.height;
    imgRef.current.style.height = `${
      imgRef.current.offsetWidth / proportion
    }px`;
  }, []);

  return (
    <div className="mt-4">
      <ImageEditorTools
        aspectRation={aspectRation}
        setAspectRation={setAspectRation}
      />
      <div ref={imgRef} className="relative flex justify-center items-center">
        {loading && <Spinner className="size-6" />}
        <img
          onLoad={() => setLoading(false)}
          src={image.original}
          alt={image.id}
        />
      </div>
    </div>
  );
};

export default ImageEditor;
