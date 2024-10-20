import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import EntryForm from "../components/EntryForm";
import { getEntry, updateEntry } from "../utils/api";

function EditEntryPage() {
  const { id } = useParams();
  const history = useHistory();
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await getEntry(id);
        setEntry(response.data);
      } catch (error) {
        console.error("Error fetching entry:", error);
      }
    };

    fetchEntry();
  }, [id]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await updateEntry(id, values);
      history.push(`/entries/${id}`);
    } catch (error) {
      console.error("Error updating entry:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (!entry) return <div>Loading...</div>;

  return (
    <div>
      <h1>Edit Entry</h1>
      <EntryForm initialValues={entry} onSubmit={handleSubmit} />
    </div>
  );
}

export default EditEntryPage;
