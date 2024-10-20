import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EntryDetail from "../components/EntryDetail";
import PhotoUpload from "../components/PhotoUpload";
import { getEntry, getEntryPhotos, deletePhoto, uploadPhoto } from "../utils/api";

function EntryDetailPage() {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEntryAndPhotos = async () => {
      try {
        const [entryResponse, photosResponse] = await Promise.all([
          getEntry(id),
          getEntryPhotos(id),
        ]);
        setEntry(entryResponse.data);
        setPhotos(photosResponse.data);
      } catch (error) {
        setError("Error fetching entry and photos.");
        console.error("Error fetching entry and photos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEntryAndPhotos();
  }, [id]);

  const handlePhotoUploaded = (newPhoto) => {
    console.log("New photo uploaded:", newPhoto); // Debugging line
    setPhotos((prevPhotos) => [...prevPhotos, newPhoto]); // Update state immediately
  };

  const handleDeletePhoto = async (photoId) => {
    try {
      await deletePhoto(id, photoId);
      setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== photoId));
    } catch (error) {
      console.error("Error deleting photo:", error);
      setError("Error deleting photo.");
    }
  };

  const handleUploadPhoto = async (photoUrl) => {
    const photoData = {
      url: photoUrl,
    };

    try {
      const newPhoto = await uploadPhoto(id, photoData);
      handlePhotoUploaded(newPhoto); // Update state immediately
    } catch (error) {
      console.error("Error uploading photo:", error);
      setError("Error uploading photo.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2 className="mt-4">Photos</h2>
      <div className="row">
        {photos.map((photo) => (
          <div key={photo.id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={photo.url}
                className="card-img-top"
                alt={photo.description || "Photo"}
              />
              <div className="card-body">
                <p className="card-text">{photo.description}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeletePhoto(photo.id)}
                >
                  Delete Photo
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <EntryDetail entryId={id} />
      <PhotoUpload entryId={id} onPhotoUploaded={handlePhotoUploaded} />
    </div>
  );
}

export default EntryDetailPage;
