import React, { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "../utils/api";
import { Link } from "react-router-dom";
import './ProfilePage.css';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        setProfile(response.data);
        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async () => {
    try {
      await updateUserProfile({ username });
      setProfile((prevProfile) => ({ ...prevProfile, username }));
      setShowModal(true);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (!profile) return <div className="text-center">Loading...</div>;

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">User Profile</h1>
      <div className="card shadow">
        <div className="card-body text-center">
          <div className="profile-picture mb-3">
            <div
              className="rounded-circle"
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "#ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
              }}
            >
              <span style={{ fontSize: "24px", color: "#fff" }}>👤</span>
            </div>
          </div>
          <div className="d-flex align-items-center justify-content-center mb-3">
            {isEditing ? (
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control text-center me-2"
                style={{ border: "none", fontSize: "1.5rem", textAlign: "center", marginRight: "2px" }}
              />
            ) : (
              <h5 className="card-title">{username}</h5>
            )}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn btn-light"
              style={{ border: "none", backgroundColor: "transparent" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-pencil"
                viewBox="0 0 16 16"
              >
                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L10.646 2.854l-1.5-1.5 3-3zM9.5 1.5L11 3l-1 1-1.5-1.5L9.5 1.5zM1 14.5V16h1.5l8.5-8.5-1.5-1.5L1 14.5z"/>
              </svg>
            </button>
          </div>
          <p className="card-text" style={{ color: "blue" }}>
            Email: <span style={{ color: "black" }}>{profile.email}</span>
          </p>
          <p className="card-text" style={{ color: "blue" }}>
            Joined: <span style={{ color: "black" }}>{new Date(profile.joined).toLocaleDateString()}</span>
          </p>
          {isEditing && (
            <button onClick={handleSave} className="btn btn-success me-2">
              Save
            </button>
          )}
          <Link to="/reset-password" className="btn btn-primary">
            Reset Password
          </Link>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="modal" style={modalStyle}>
          <div className="modal-content" style={{ width: '300px' }}>
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2 style={{ color: "green" }}>Success!</h2>
            <p style={{ color: "green" }}>Your username has been updated successfully! ✅</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Modal styles
const modalStyle = {
  position: "fixed",
  zIndex: 1000,
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default ProfilePage;
