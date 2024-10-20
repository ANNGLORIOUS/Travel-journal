import React from "react";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

// Don't forget to import the Bootstrap CSS in your main App.js or index.js file:
// import 'bootstrap/dist/css/bootstrap.min.css';

function HomePage() {
  // Sample images for the slider
  const sliderImages = [
    "https://img.freepik.com/free-photo/beautiful-nature-landscape-with-black-sandy-beach-ocean_23-2151380422.jpg?size=626&ext=jpg",
    "https://img.freepik.com/free-photo/low-angle-shot-magnificent-grass-covered-mountains-captured-cloudy-day_181624-37169.jpg?semt=ais_hybrid",
    "https://img.freepik.com/free-photo/flora-culture-growth-tree-decoration_1417-284.jpg?semt=ais_hybrid",
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
            <Carousel.Caption
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background for text
                borderRadius: "5px",
                padding: "20px",
                textAlign: "center",
              }}
            >
              <h2 style={{ color: "white" }}>About Us</h2>
              <p style={{ color: "white" }}>
                Welcome to our journal app! Here, you can document your thoughts,
                experiences, and memories. Explore your journal entries and find
                inspiration from the beauty around you. Our app provides a simple
                and intuitive interface to capture life's moments.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Link to Journal Entries Page */}
      <Link to="/journal-entries" className="btn btn-primary mb-4">
        View Journal Entries
      </Link>
    </div>
  );
}

export default HomePage;
