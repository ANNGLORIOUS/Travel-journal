import React, { useState } from "react";
import { uploadPhoto } from "../utils/api";

function PhotoUpload({ entryId, onPhotoUploaded }) {
  const [url, setUrl] = useState("");

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (url) {
      try {
        const response = await uploadPhoto(entryId, { url });
        onPhotoUploaded(response.data);
        setUrl("");
      } catch (error) {
        console.error("Error uploading photo:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="photoUrl" className="form-label">
          Photo URL
        </label>
        <input
          type="url"
          id="photoUrl"
          className="form-control"
          value={url}
          onChange={handleUrlChange}
          placeholder="Enter the URL of the photo"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={!url}>
        Add Photo
      </button>
    </form>
  );
}

export default PhotoUpload;
