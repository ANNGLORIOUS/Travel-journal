import React, { useState, useEffect } from "react";
import { getTags } from "../utils/api";

function TagsPage() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await getTags();
        setTags(response.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TagsPage;
