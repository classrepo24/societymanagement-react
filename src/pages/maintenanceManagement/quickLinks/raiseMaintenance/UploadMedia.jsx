import React, { useRef, useState } from "react";

export const UploadMedia = ({requestData,setRequestData, handleChange}) => {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);

  const handleFiles = (selectedFiles) => {
    const newFiles = Array.from(selectedFiles).map((file) => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file),
    }));

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleFileChange = (e) => {
    handleFiles(e.target.files);
  };

  const removeFile = (id) => {
    setFiles((prev) => {
      const file = prev.find((item) => item.id === id);
      if (file) URL.revokeObjectURL(file.preview);

      return prev.filter((item) => item.id !== id);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="mt-8 border-t border-gray-200 pt-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
          3
        </div>

        <h2 className="text-lg font-semibold text-slate-800">
          Add Photos / Videos
          <span className="text-gray-500 text-sm font-normal">
            {" "}
            (Optional)
          </span>
        </h2>
      </div>

      {/* Upload Box */}
      <div
        onClick={() => fileInputRef.current.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="border border-dashed border-blue-200 rounded-md h-28 flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition"
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <i className="bi bi-cloud-upload text-2xl text-[#0B1F66]"></i>

        <p className="mt-2 text-sm font-medium text-[#0B1F66]">
          Drag and drop files here or click to upload
        </p>

        <p className="text-xs text-gray-500">
          JPG, PNG, MP4 up to 10MB each
        </p>
      </div>

      {/* Uploaded Files */}
      {files.length > 0 && (
        <div className="flex items-center gap-3 mt-3 overflow-x-auto pb-2">
          {files.map((item) => (
            <div
              key={item.id}
              className="relative flex items-center gap-2 min-w-[145px] h-[56px] bg-white border border-gray-200 rounded-md px-2 py-2 shadow-sm"
            >
              {/* Thumbnail */}
              {item.file.type.startsWith("image") ? (
                <img
                  src={item.preview}
                  alt=""
                  className="w-10 h-10 rounded object-cover flex-shrink-0"
                />
              ) : (
                <video
                  src={item.preview}
                  className="w-10 h-10 rounded object-cover flex-shrink-0"
                />
              )}

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-medium text-gray-800 truncate">
                  {item.file.name}
                </p>

                <p className="text-[10px] text-gray-500">
                  {(item.file.size / (1024 * 1024)).toFixed(1)} MB
                </p>
              </div>

              {/* Delete */}
              <button
                type="button"
                onClick={() => removeFile(item.id)}
                className="absolute top-1 right-1 text-gray-500 hover:text-red-500"
              >
                <i className="bi bi-x text-sm"></i>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};