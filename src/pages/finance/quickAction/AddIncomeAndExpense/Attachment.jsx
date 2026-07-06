import React, { useRef, useState } from "react";

export const Attachment = () => {
    const fileInputRef = useRef(null);
    const [files, setFiles] = useState([]);

    const handleFiles = (selectedFiles) => {
        const fileArray = Array.from(selectedFiles);
        setFiles((prev) => [...prev, ...fileArray]);
    };

    const handleChange = (e) => {
        handleFiles(e.target.files);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        handleFiles(e.dataTransfer.files);
    };

    const removeFile = (index) => {
        setFiles(files.filter((_, i) => i !== index));
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

            <h2 className="text-lg font-bold text-[#1E2A5A] mb-4">
                Attachment <span className="font-normal">(Optional)</span>
            </h2>

            {/* Upload Box */}
            <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="border border-dashed border-gray-300 rounded-xl h-[170px] flex flex-col items-center justify-center text-center"
            >
                <i className="bi bi-cloud-arrow-up text-4xl text-blue-600 mb-2"></i>

                <p className="text-sm font-semibold text-[#1E2A5A]">
                    Drag & Drop files here or click to browse
                </p>

                <p className="text-xs text-gray-500 mt-1">
                    Supports: PDF, JPG, PNG (Max 5MB)
                </p>

                <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="mt-4 px-5 py-2 border rounded-lg hover:bg-gray-50"
                >
                    Choose Files
                </button>

                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    hidden
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleChange}
                />
            </div>

            {/* Uploaded Files */}
            {files.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mt-5">

                    {files.map((file, index) => (
                        <div
                            key={index}
                            className="relative border border-gray-200 rounded-xl p-3 bg-gray-50"
                        >

                            {/* Remove Button */}
                            <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center"
                            >
                                <i className="bi bi-x text-red-600 text-lg"></i>
                            </button>

                            {/* File Icon */}
                            <div className="flex justify-center mb-2">
                                <i className="bi bi-file-earmark-pdf text-4xl text-blue-600"></i>
                            </div>

                            {/* File Name */}
                            <p className="text-sm font-medium text-center text-[#1E2A5A] truncate">
                                {file.name}
                            </p>

                            {/* File Size */}
                            <p className="text-xs text-center text-gray-500 mt-1">
                                {(file.size / 1024).toFixed(1)} KB
                            </p>

                        </div>
                    ))}

                </div>
            )}

        </div>
    );
};