import { useState } from "react";

export default function FileUploader({ onFileSelect, errors, setErrors }) {
  const [preview, setPreview] = useState(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  // Allowed types & size (500KB)
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const maxSize = 500 * 1024; // 500KB

  const validateFile = (selectedFile) => {
    // Reset errors
    setError("");

    // Validate type
    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Invalid file type. Only JPG, PNG, WEBP images are allowed.");
      return false;
    }

    // Validate size
    if (selectedFile.size > maxSize) {
      setError("File is too large. Maximum size allowed is 500MB.");
      return false;
    }
    return true;
  };

  const handleFile = (selectedFile) => {
    if (!validateFile(selectedFile)) return;

    onFileSelect(selectedFile);

    // Clear avatar error immediately
    if (setErrors) setErrors((prev) => ({ ...prev, avatar: "" }));

    // Revoke previous preview
    if (preview) URL.revokeObjectURL(preview);

    // Generate preview
    const previewURL = URL.createObjectURL(selectedFile);
    setPreview(previewURL);

    // Fake upload progress
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 10;
      });
    }, 150);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragActive(false);

    const selectedFile = e.dataTransfer.files?.[0];
    handleFile(selectedFile);
  };

  const onChange = (e) => {
    const selectedFile = e.target.files?.[0];
    handleFile(selectedFile);
  };
  //   const onChange = (e) => {
  //     const selectedFile = e.target.files?.[0];
  //     if (!selectedFile) return;
  //     handleFile(selectedFile);
  //     validateField && validateField("avatar", selectedFile);
  //   };

  return (
    <>
      <label
        htmlFor="file-upload"
        className="text-sm text-primary-300 tracking-wider block mb-2 self-start"
      >
        Upload Avater
      </label>
      <div
        className={`
        flex flex-col justify-center items-center bg-primary-500/20 w-full
        border border-dashed rounded-xl py-4 px-4 transition relative
        ${
          dragActive
            ? "border-primary-500/60 bg-primary-50"
            : "border-primary-300/60"
        }
      `}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragEnter={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={onDrop}
      >
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={onChange}
        />

        {/* If no preview, show upload icon */}
        {!preview && (
          <>
            <img
              src="assets/images/icon-upload.svg"
              alt="Upload Icon"
              className="bg-primary-500/30 border-[.3px] border-primary-500 p-2 rounded-xl group-hover:bg-opacity-20"
            />
            <span className="text-sm text-primary-300 tracking-wider mt-3">
              Drag and drop or click to upload
            </span>
          </>
        )}

        {/* Show preview image */}
        {preview && (
          <div className="flex flex-col items-center gap-3">
            <img
              src={preview}
              alt="Preview"
              className="w-10 h-10 object-cover rounded-lg shadow-md"
            />

            {/* Upload progress */}
            {progress < 100 && (
              <div className="w-40 h-2 bg-primary-100 rounded-full overflow-hidden mt-2">
                <div
                  className="h-full bg-main-500 transition-all"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}

            {progress === 100 && (
              <p className="text-primary text-sm font-semibold">
                Upload complete ✔
              </p>
            )}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mt-3 font-medium">{error}</p>
        )}
      </div>
      {errors.avatar && (
        <p className="text-red-500 text-sm mt-1 self-start">{errors.avatar}</p>
      )}

      <span className="text-xs text-primary-300/80 tracking-wider self-start mt-2 flex justify-center gap-x-2">
        <img src="assets/images/icon-info.svg" alt="" />
        Upload your photo (JPG, PNG or WEBP. max size: 500KB).
      </span>
    </>
  );
}
