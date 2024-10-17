import React, { useState, useEffect } from "react";
import { getTags, deleteTag } from "../utils/api";

function TagsPage() {
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      setIsLoading(true);
      const response = await getTags();
      setTags(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching tags:", error);
      setError("Failed to fetch tags. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTag = async (tagId) => {
    if (window.confirm("Are you sure you want to delete this tag?")) {
      try {
        await deleteTag(tagId);
        setTags(tags.filter((tag) => tag.id !== tagId));
      } catch (error) {
        console.error("Error deleting tag:", error);
        setError("Failed to delete tag. Please try again.");
      }
    }
  };

  if (isLoading) return <div>Loading tags...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h1>Tags</h1>
      <div className="row">
        {tags.map((tag) => (
          <div key={tag.id} className="col-md-3 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{tag.name}</h5>
                <p className="card-text">
                  Created: {new Date(tag.created_at).toLocaleDateString()}
                </p>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteTag(tag.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TagsPage;
