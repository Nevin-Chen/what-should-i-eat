import React from "react";

const Navbar = ({ handleChange, search, getVenues, getMCD, getRandom, currQuery }) => {
  return (
    <nav
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a href="/" className="navbar-item">
            <img src="https://i.imgur.com/Cx0QiNQ.png" alt="logo" />
        </a>
        <div className="navbar-item">
          <button onClick={() => getRandom()} className="button is-primary">
            <span>What Should I Eat</span>
            <span className="icon is-small">
              <i className="fas fa-question" />
            </span>
          </button>
        </div>
        <div className="navbar-item">
          <span><h1>{currQuery}</h1></span>
        </div>
      </div>
      
      <div className="navbar-end">
        <div className="navbar-item">
          <button onClick={() => getMCD()} className="button is-danger">
            <span className="icon is-small">
              <img
                src="https://news.mcdonalds.com/static-files/2e2f906c-31c1-47a7-881f-d97fb455048f"
                alt="mcd"
              />
            </span>
            <span>McFinder</span>
          </button>
        </div>
        <div className="navbar-item">
          <div className="field">
            <div className="control has-icons-right">
              <input
                onChange={handleChange}
                className="input"
                type="text"
                name="search"
                value={search}
              />
              <span className="icon is-right">
                <i className="fas fa-search" />
              </span>
            </div>
          </div>
        </div>
        <div className="navbar-item">
          <button
            type="submit"
            className="button is-info"
            onClick={() => getVenues()}
          >
            <span className="icon">
              <i className="fas fa-utensils" />
            </span>
            <span>Search</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
