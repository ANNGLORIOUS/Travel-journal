import React, { useState } from "react";
import { createTag, addTagsToEntry } from "../utils/api";

function TagInput({ entryId, onTagAdded }) {
  const [tagName, setTagName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tagName.trim()) return; // Prevent empty tag submission

    try {
      const tagResponse = await createTag(tagName);
      const newTag = tagResponse.data;

      // Add the tag to the entry
      await addTagsToEntry(entryId, [newTag.id]); 
      setTagName("");
      onTagAdded(newTag); 
    } catch (error) {
      console.error("Error adding tag:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          placeholder="Add a tag"
          aria-label="Add a tag"
        />
        <button className="btn btn-outline-secondary" type="submit">
          Add Tag
        </button>
      </div>
    </form>
  );
}

export default TagInput;
