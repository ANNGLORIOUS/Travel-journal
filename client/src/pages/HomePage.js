import React, { useState, useEffect } from "react";
import EntryList from "../components/EntryList";
import { getEntries } from "../utils/api";

function HomePage() {
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
    <div>
      <h1>Journal Entries</h1>
      <EntryList entries={entries} />
    </div>
  );
}

export default HomePage;
