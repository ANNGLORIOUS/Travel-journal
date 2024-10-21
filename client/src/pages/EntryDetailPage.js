import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EntryDetail from "../components/EntryDetail";
import PhotoUpload from "../components/PhotoUpload";
import { getEntry, getEntryPhotos, deletePhoto } from "../utils/api"; // import deletePhoto

function EntryDetailPage() {
  const { id } = useParams();
  const [entry, setEntry] = useState(null);
  const [photos, setPhotos] = useState([]);

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
        console.error("Error fetching entry and photos:", error);
      }
    };
    fetchEntryAndPhotos();
  }, [id]);

  const handlePhotoUploaded = (newPhoto) => {
    setPhotos([...photos, newPhoto]);
  };

  // Function to handle deleting a photo
  const handleDeletePhoto = async (photoId) => {
    try {
      await deletePhoto(id, photoId); // Call API to delete photo
      setPhotos(photos.filter((photo) => photo.id !== photoId)); // Update state after deletion
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  if (!entry) return <div>Loading...</div>;

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
                {/* Delete Button */}
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
      <PhotoUpload entryId={entry.id} onPhotoUploaded={handlePhotoUploaded} />
    </div>
  );
}

export default EntryDetailPage;