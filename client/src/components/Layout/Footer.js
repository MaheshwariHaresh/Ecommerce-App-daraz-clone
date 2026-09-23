import React from "react";
import {
  Facebook,
  Instagram,
  YouTube,
  Language,
  X as TwitterIcon,
  Message as MessageIcon,
} from "@mui/icons-material";
import "../../styles/Footer.css";

export default function Footer() {
  return (
    <>
      <footer className="daraz-footer">
        <div className="footer-content">
          {/* Left Section */}
          <div className="footer-section">
            <h4>Daraz International</h4>
            <div className="country-list">
              <div className="country">
                <img src="https://flagcdn.com/w20/pk.png" alt="Pakistan" />
                <span>Pakistan</span>
              </div>
              <div className="country">
                <img src="https://flagcdn.com/w20/bd.png" alt="Bangladesh" />
                <span>Bangladesh</span>
              </div>
              <div className="country">
                <img src="https://flagcdn.com/w20/lk.png" alt="Sri Lanka" />
                <span>Sri Lanka</span>
              </div>
              <div className="country">
                <img src="https://flagcdn.com/w20/mm.png" alt="Myanmar" />
                <span>Myanmar</span>
              </div>
              <div className="country">
                <img src="https://flagcdn.com/w20/np.png" alt="Nepal" />
                <span>Nepal</span>
              </div>
            </div>
          </div>

          {/* Middle Section */}
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-icons">
              <Facebook className="social-icon fb" />
              <TwitterIcon className="social-icon x" />
              <Instagram className="social-icon ig" />
              <YouTube className="social-icon yt" />
              <Language className="social-icon web" />
            </div>
          </div>

          {/* Right Section */}
          <div className="footer-section copyright">
            <p>© Daraz 2025</p>
          </div>
        </div>
      </footer>

      {/* Floating Chat Button */}
      <div className="floating-chat-btn">
        <MessageIcon className="chat-icon" />
        <span className="chat-text">Messages</span>
      </div>
    </>
  );
}
