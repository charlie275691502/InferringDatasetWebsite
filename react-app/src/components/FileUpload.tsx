import React, { useState } from "react";

interface Prop {
  onUpload: (file: File) => void;
}

const FileUpload = ({ onUpload }: Prop) => {
  let [selectedFile, setSelectedFile] = useState<File | null>(null);
  return (
    <div className="input-group">
      <input
        type="file"
        className="form-control"
        id="inputGroupFile04"
        aria-describedby="inputGroupFileAddon04"
        aria-label="Upload"
        onChange={(event) => {
          if (event.target.files) setSelectedFile(event.target.files[0]);
        }}
      ></input>
      <button
        className="btn btn-outline-secondary"
        type="button"
        id="inputGroupFileAddon04"
        onClick={() => {
          if (selectedFile) onUpload(selectedFile);
        }}
      >
        Upload
      </button>
    </div>
  );
};

export default FileUpload;
