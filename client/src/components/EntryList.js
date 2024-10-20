import React from "react";
import { Link } from "react-router-dom";

function EntryList({ entries }) {
  if (entries.length === 0) {
    return <p>No journal entries available.</p>;
  }

  return (
    <div className="row">
      {entries.map((entry) => (
        <div key={entry.id} className="col-md-4 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{entry.location}</h5>
              <h6 className="card-subtitle mb-2 text-muted">
                {new Date(entry.date).toLocaleDateString()}
              </h6>
              <p className="card-text">
                {entry.description.substring(0, 100)}...
              </p>
              <Link to={`/entries/${entry.id}`} className="btn btn-primary">
                View Details
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default EntryList;
