import {
  MdOutlineCrop,
  MdCropOriginal,
  MdOutlineCrop169,
  MdOutlineCrop75,
  MdOutlineCropDin,
} from "react-icons/md";

const ImageEditorTools = ({ ratio, setRatio }) => {
  const aspectRatios = [
    {
      value: "free",
      icon: <MdOutlineCrop className="size-6" />,
      label: "Freeform",
    },
    {
      value: "original",
      icon: <MdCropOriginal className="size-6" />,
      label: "Original",
    },
    {
      value: "1:1",
      icon: <MdOutlineCropDin className="size-6" />,
      label: "1:1",
    },
    {
      value: "4:3",
      icon: <MdOutlineCrop75 className="size-6" />,
      label: "4:3",
    },
    {
      value: "16:9",
      icon: <MdOutlineCrop169 className="size-6" />,
      label: "16:9",
    },
  ];

  return (
    <div className="grid grid-cols-3 mb-2 gap-2">
      {aspectRatios.map((aspectRatio) => (
        <button
          key={aspectRatio.value}
          className={`p-2 flex gap-2 items-center text-sm rounded bg-neutral-100 border box-border ${
            aspectRatio.value === ratio
              ? "border-blue-500 text-blue-500"
              : "border-transparent ertext-neutral-700 hover:bg-neutral-200"
          }`}
          onClick={() => setRatio(aspectRatio.value)}
        >
          {aspectRatio.icon}{" "}
          <span className="text-neutral-800">{aspectRatio.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ImageEditorTools;
