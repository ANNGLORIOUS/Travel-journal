import React from "react";

function Footer() {
  return (
    <footer className="footer bg-primary text-white mt-4 py-3">
      <div className="container text-center">
        <span className="text-white ms-3" >© {new Date().getFullYear()} Journal App. All Rights Reserved.</span>
        <div>
          <a href="https://github.com/ANNGLORIOUS/react-journal-app" className="text-white ms-3">
            <i className="bi bi-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/brad-traversy-a372b51b5/" className="text-white ms-3">
            <i className="bi bi-linkedin"></i>
          </a>
          <a href="https://twitter.com/ANNGLORIOUS-MUENI" className="text-white ms-3">
          <i className="bi bi-twitter"></i>
          </a>
          <a href="https://www.instagram.com/itsglorious/" className="text-white ms-3">
          <i className="bi bi-instagram"></i>
          </a>
        </div>
        <div>
          <a href="/privacy-policy" className="text-white ms-3">Privacy Policy</a>
          <a href="/terms-of-service" className="text-white ms-3">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
