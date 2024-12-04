const ImageEditorActions = ({ loading, onReset, setApply }) => {
  return (
    <div className="mt-4 flex justify-end gap-4">
      <button
        disabled={loading}
        className="px-4 py-1 rounded-sm disabled:opacity-50"
        onClick={onReset}
      >
        Reset
      </button>
      <button
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-1 rounded-sm disabled:opacity-50"
        onClick={() => setApply(true)}
      >
        Apply
      </button>
    </div>
  );
};

export default ImageEditorActions;
