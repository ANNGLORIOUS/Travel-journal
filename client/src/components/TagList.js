import React from "react";

function TagList({ tags }) {
  return (
    <div>
      {tags.map((tag) => (
        <span key={tag.id} className="badge bg-secondary me-1">
          {tag.name}
        </span>
      ))}
    </div>
  );
}

export default TagList;
