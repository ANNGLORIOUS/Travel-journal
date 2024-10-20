import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  useEffect(() => {
    // Initialize Bootstrap's JavaScript components
    const bootstrap = require("bootstrap/dist/js/bootstrap.bundle.min.js");
    new bootstrap.Collapse(document.getElementById("navbarNav"));
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-journal-text me-2"></i>
          Journal App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
                <i className="bi bi-house-door ms-1"></i>
              </Link>
            </li>
            {isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/entries/create">
                    Create Entry
                    <i className="bi bi-plus-circle ms-1"></i>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                    <i className="bi bi-person ms-1"></i>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/tags">
                    Tags
                    <i className="bi bi-tags ms-1"></i>
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link" onClick={logout}>
                    Logout
                    <i className="bi bi-box-arrow-right ms-1"></i>
                  </button>
                </li>
              </>
            )}
            {!isAuthenticated && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                    <i className="bi bi-box-arrow-in-right ms-1"></i>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                    <i className="bi bi-person-plus ms-1"></i>
                  </Link>
                </li>
              </>
            )}
          </ul>
          <span className="navbar-text ms-3">
            <i className="bi bi-globe2 fs-4"></i>
          </span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
