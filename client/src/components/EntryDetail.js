import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getEntry, deleteEntry } from "../utils/api";
import TagList from "./TagList";
import TagInput from "./TagInput";

function EntryDetail({ entryId }) {
  const [entry, setEntry] = useState({
    id: null,
    location: "",
    date: "",
    description: "",
    tags: [], // Initialize as an empty array
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        setIsLoading(true);
        const response = await getEntry(entryId);
        setEntry(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching entry:", error);
        setError("Failed to load entry. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchEntry();
  }, [entryId]);

  const handleTagAdded = (newTag) => {
    setEntry((prevEntry) => ({
      ...prevEntry,
      tags: prevEntry.tags ? [...prevEntry.tags, newTag] : [newTag], 
    }));
  };

  const handleDeleteEntry = async () => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        await deleteEntry(entry.id);
        history.push("/");
      } catch (error) {
        console.error("Error deleting entry:", error);
        setError("Failed to delete entry. Please try again.");
      }
    }
  };

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!entry) return <div className="alert alert-warning">Entry not found.</div>;

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{entry.location}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {new Date(entry.date).toLocaleDateString()}
        </h6>
        <p className="card-text">{entry.description}</p>
        <div className="mb-3">
          <h6>Tags:</h6>
          <TagList tags={entry.tags} />
          <TagInput entryId={entry.id} onTagAdded={handleTagAdded} />
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <Link
              to={`/entries/edit/${entry.id}`}
              className="btn btn-primary me-2"
            >
              Edit
            </Link>
            <button onClick={handleDeleteEntry} className="btn btn-danger me-2">
              Delete
            </button>
          </div>
          <Link to="/" className="btn btn-secondary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EntryDetail;
