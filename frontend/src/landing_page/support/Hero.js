import React from "react";
import "./Hero.css"; // Ensure CSS is imported

function Hero() {
  return (
    <section id="supportHero">
      {/* Top bar */}
      <div id="supportWrapper">
        <h4 className="support-logo">Support Portal</h4>
        <a href="#" className="track-tickets">Track tickets</a>
      </div>

      {/* Main content */}
      <div className="container px-5 mt-5">
        <div className="row align-items-start justify-content-between">
          {/* Left side */}
          <div className="col-md-7 mb-4">
            <h1 className="support-subheading mb-4">
              Search for an answer or browse help topics to create a ticket
            </h1>

            <div className="search-box mb-4">
              <input
                className="form-control"
                placeholder="Eg: how do i activate F&O, why is my order getting rejected ..."
              />
              <span className="search-icon">🔍</span>
            </div>

            <div className="quick-links">
              <p><a href="#">Track account opening</a></p>
              <p><a href="#">Track segment activation</a></p>
              <p><a href="#">Intraday margins</a></p>
              <p><a href="#">Kite user manual</a></p>
            </div>
          </div>

          {/* Right side */}
          <div className="col-md-5">
            <h2 className="featured-title">Featured</h2>
            <ol className="featured-list">
              <li>
                <a href="#">
                  Adjustment of F&O contracts of PNB due to dividend
                </a>
              </li>
              <li>
                <a href="#">
                  Rights Entitlements listing in June 2025
                </a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
