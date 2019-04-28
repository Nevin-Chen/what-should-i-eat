import React from "react";

const Navbar = ({ handleChange, search, getVenues, getMCD }) => {
  return (
    <nav
      className="navbar is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a href="/" className="navbar-item">
          Logo goes here
        </a>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
            <button onClick={() => getMCD()}className="button is-danger"><span className="icon is-small"><img src='https://news.mcdonalds.com/static-files/2e2f906c-31c1-47a7-881f-d97fb455048f' alt='mcd'/></span><span>McFinder</span></button>
        </div>
        <div className="navbar-item">
          <div className="field">
            <div className="control">
              <input
                onChange={handleChange}
                className="input is-primary"
                type="text"
                placeholder="What eats??"
                name="search"
                value={search}
              />
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
