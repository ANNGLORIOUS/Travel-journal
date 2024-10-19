import React, { useState, useEffect } from "react";
import EntryList from "../components/EntryList";
import { getEntries } from "../utils/api";

function JournalEntryPage() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await getEntries();
        setEntries(response.data);
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    fetchEntries();
  }, []);

  return (
    <div className="container">
      <h1 className="mb-4">Journal Entries</h1>
      <EntryList entries={entries} />
    </div>
  );
}

export default JournalEntryPage;
