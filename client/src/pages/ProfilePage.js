import React, { useState, useEffect } from "react";
import { getUserProfile } from "../utils/api";

function ProfilePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div>
      <h1>User Profile</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{profile.username}</h5>
          <p className="card-text">Email: {profile.email}</p>
          <p className="card-text">
            Joined: {new Date(profile.created_at).toLocaleDateString()}
          </p>
          {/* <Link to={`/entries/${entry.id}`} className="btn btn-primary">
                Resset Password
          </Link> */}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
