import {
  MdOutlineCrop,
  MdCropOriginal,
  MdOutlineCrop169,
  MdOutlineCrop75,
  MdOutlineCropDin,
} from "react-icons/md";

const ImageEditorTools = ({ aspectRation, setAspectRation }) => {
  const aspectRations = [
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
      value: "11",
      icon: <MdOutlineCropDin className="size-6" />,
      label: "1:1",
    },
    {
      value: "169",
      icon: <MdOutlineCrop169 className="size-6" />,
      label: "16:9",
    },

    {
      value: "43",
      icon: <MdOutlineCrop75 className="size-6" />,
      label: "4:3",
    },
  ];

  return (
    <div className="grid grid-cols-3 mb-2 gap-2">
      {aspectRations.map((ration) => (
        <button
          key={ration.value}
          className={`p-2 flex gap-2 items-center text-sm rounded bg-neutral-100 border box-border ${
            ration.value === aspectRation
              ? "border-blue-500 text-blue-500"
              : "border-transparent ertext-neutral-700 hover:bg-neutral-200"
          }`}
          onClick={() => setAspectRation(ration.value)}
        >
          {ration.icon} <span className="text-neutral-800">{ration.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ImageEditorTools;
