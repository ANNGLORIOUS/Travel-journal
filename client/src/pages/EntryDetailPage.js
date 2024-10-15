// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import EntryDetail from '../components/EntryDetail';
// import PhotoUpload from '../components/PhotoUpload';
// import { getEntry, getEntryPhotos } from '../utils/api';

// function EntryDetailPage() {
//   const { id } = useParams();
//   const [entry, setEntry] = useState(null);
//   const [photos, setPhotos] = useState([]);

//   useEffect(() => {
//     const fetchEntryAndPhotos = async () => {
//       try {
//         const [entryResponse, photosResponse] = await Promise.all([
//           getEntry(id),
//           getEntryPhotos(id)
//         ]);
//         setEntry(entryResponse.data);
//         setPhotos(photosResponse.data);
//       } catch (error) {
//         console.error('Error fetching entry and photos:', error);
//       }
//     };

//     fetchEntryAndPhotos();
//   }, [id]);

//   const handlePhotoUploaded = (newPhoto) => {
//     setPhotos([...photos, newPhoto]);
//   };

//   if (!entry) return <div>Loading...</div>;

//   return (
//     <div>
//       <EntryDetail entry={entry} />
//       <h2 className="mt-4">Photos</h2>
//       <div className="row"></div>
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EntryDetail from "../components/EntryDetail";
import PhotoUpload from "../components/PhotoUpload";
import { getEntry, getEntryPhotos } from "../utils/api";

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

  if (!entry) return <div>Loading...</div>;

  const handlePhotoUploaded = (newPhoto) => {
    setPhotos([...photos, newPhoto]);
  };

  return (
    <div>
      <EntryDetail entry={entry} />
      <h2 className="mt-4">Photos</h2>
      <div className="row">
        {photos.map((photo) => (
          <div key={photo.id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={photo.url}
                className="card-img-top"
                alt={photo.description}
              />
              <div className="card-body">
                <p className="card-text">{photo.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <PhotoUpload entryId={entry.id} onPhotoUploaded={handlePhotoUploaded} />
    </div>
  );
}

export default EntryDetailPage;
