import React from "react";

function TagList({ tags = [] }) { // Default to an empty array
  return (
    <div>
      {tags.length > 0 ? (
        tags.map((tag) => (
          <span key={tag.id} className="badge bg-secondary me-1">
            {tag.name}
          </span>
        ))
      ) : (
        <span>No tags available.</span>
      )}
    </div>
  );
}

export default TagList;
