// import React, { useState, useEffect } from "react";
// import EntryList from "../components/EntryList";
// import { getEntries } from "../utils/api";

// function HomePage() {
//   const [entries, setEntries] = useState([]);

//   useEffect(() => {
//     const fetchEntries = async () => {
//       try {
//         const response = await getEntries();
//         setEntries(response.data);
//       } catch (error) {
//         console.error("Error fetching entries:", error);
//       }
//     };

//     fetchEntries();
//   }, []);

//   return (
//     <div>
//       <h1>Journal Entries</h1>
//       <EntryList entries={entries} />
//     </div>
//   );
// }

// export default HomePage;
import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import EntryList from "../components/EntryList";
import { getEntries } from "../utils/api";

// Don't forget to import the Bootstrap CSS in your main App.js or index.js file:
// import 'bootstrap/dist/css/bootstrap.min.css';

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

  // Sample images for the slider
  const sliderImages = [
    "https://img.freepik.com/free-photo/beautiful-nature-landscape-with-black-sandy-beach-ocean_23-2151380422.jpg?size=626&ext=jpg/800x600/007bff/ffffff?text=Slide+1",
    "https://img.freepik.com/free-photo/low-angle-shot-magnificent-grass-covered-mountains-captured-cloudy-day_181624-37169.jpg?semt=ais_hybrid/800x600/28a745/ffffff?text=Slide+2",
    "https://img.freepik.com/free-photo/flora-culture-growth-tree-decoration_1417-284.jpg?semt=ais_hybrid/800x600/dc3545/ffffff?text=Slide+3",
  ];

  return (
    <div>
      {/* Hero Slider Section */}
      <Carousel
        interval={3000}
        pause={false}
        controls={false}
        indicators={false}
        className="mb-4"
      >
        {sliderImages.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={image}
              alt={`Slide ${index + 1}`}
              style={{ height: "400px", objectFit: "cover" }}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Journal Entries Section */}
      <div className="container">
        <h1 className="mb-4">Journal Entries</h1>
        <EntryList entries={entries} />
      </div>
    </div>
  );
}

export default HomePage;
