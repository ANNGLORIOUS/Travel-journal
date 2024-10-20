import React from "react";

function Footer() {
  return (
    <footer className="footer bg-primary text-white mt-4 py-3">
      <div className="container text-center">
        <span>© {new Date().getFullYear()} Journal App. All Rights Reserved.</span>
        <div>
          <a href="/privacy-policy" className="text-white ms-3">Privacy Policy</a>
          <a href="/terms-of-service" className="text-white ms-3">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
