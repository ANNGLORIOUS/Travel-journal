import React from "react";
import { useHistory } from "react-router-dom";
import EntryForm from "../components/EntryForm";
import { createEntry } from "../utils/api";

function CreateEntryPage() {
  const history = useHistory();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await createEntry(values);
      history.push("/");
    } catch (error) {
      console.error("Error creating entry:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues = {
    location: "",
    date: "",
    description: "",
  };

  return (
    <div>
      <h1>Create New Entry</h1>
      <EntryForm initialValues={initialValues} onSubmit={handleSubmit} />
    </div>
  );
}

export default CreateEntryPage;
