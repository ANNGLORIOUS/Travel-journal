import React, { useEffect, useState } from "react";
import TagInput from "../components/TagInput"; 
import TagList from "../components/TagList"; 
import { getTags } from "../utils/api"; 

function TagsPage({ entryId }) {
  const [tags, setTags] = useState([]);

  const fetchTags = async () => {
    try {
      const response = await getTags();
      setTags(response.data);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const handleTagAdded = (newTag) => {
    setTags((prevTags) => [...prevTags, newTag]); // Add the new tag to the list
  };

  useEffect(() => {
    fetchTags(); // Fetching tags on component mount
  }, []);

  return (
    <div>
      <h3>Add a Tag</h3>
      <TagInput entryId={entryId} onTagAdded={handleTagAdded} />
      <h3>Tags</h3>
      <TagList tags={tags} />
    </div>
  );
}

export default TagsPage;
