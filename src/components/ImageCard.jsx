import { useState } from "react";
import { Spinner } from "@/components/Spinner";
import Modal from "@/components/modal/Modal";
import ImageEditor from "./image-editor/ImageEditor";

const ImageCard = ({ image }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="group relative w-[200px] h-[200px] flex justify-center items-center bg-white cursor-pointer overflow-hidden"
      >
        {(loading || error) && (
          <div
            className="absolute inset-0 flex justify-center items-center transition-opacity bg-white z-10"
            style={{
              opacity: loading || error ? 1 : 0,
            }}
          >
            {loading && <Spinner className="size-6" />}
            {error && "Error loading image"}
          </div>
        )}
        <img
          onLoad={() => setLoading(false)}
          onError={() => setError(true)}
          src={image.thumbnail}
          alt={image.id}
          className="object-cover transition-all group-hover:scale-110 group-hover:opacity-50"
        />
        <div className="absolute bottom-1 left-1 right-1 translate-y-[110%] flex gap-3 items-center p-3 bg-white bg-opacity-80 transition-all group-hover:translate-y-0">
          <span className="font-semibold text-purple-700">#{image.id}</span>
          <span className="font-light text-purple-500 text-sm leading-4">
            {image.author}
          </span>
        </div>
      </div>
      <Modal open={open} onOpenChange={setOpen}>
        <Modal.Content title="Crop Image">
          <ImageEditor image={image} onAfterSave={() => setOpen(false)} />
        </Modal.Content>
      </Modal>
    </>
  );
};

export default ImageCard;
