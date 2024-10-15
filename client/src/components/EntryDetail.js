import React from "react";
import { Link } from "react-router-dom";

function EntryDetail({ entry }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{entry.location}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {new Date(entry.date).toLocaleDateString()}
        </h6>
        <p className="card-text">{entry.description}</p>
        <Link to={`/entries/edit/${entry.id}`} className="btn btn-primary me-2">
          Edit
        </Link>
        <Link to="/" className="btn btn-secondary">
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default EntryDetail;
