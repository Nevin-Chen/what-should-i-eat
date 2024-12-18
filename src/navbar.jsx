import React from "react";

export const Navbar = ({
  handleChange,
  search,
  onSubmit,
  getMCD,
  getRandom,
  currQuery,
}) => {
  return (
    <nav
      className="navbar is-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a href="/" className="navbar-item">
          <img src="https://i.imgur.com/QlENgvy.png" alt="logo" />
          <p className="logo">What Should I Eat</p>
        </a>
        <div className="navbar-item">
          <button onClick={() => getRandom()} className="button is-primary large">
            <span>Decide for me!</span>
          </button>
        </div>
        <div className="navbar-item">
          <span>
            {currQuery && (
              <h1>
                Suggested Food:{" "}
                {currQuery
                  .split(" ")
                  .map((currWord) => {
                    let capitalizedWord = "";
                    for (let i = 0; i < currWord.length; i++) {
                      if (i === 0) {
                        capitalizedWord += currWord[0].toUpperCase();
                      } else {
                        capitalizedWord += currWord[i];
                      }
                    }
                    return capitalizedWord;
                  })
                  .join(" ")}
              </h1>
            )}
          </span>
        </div>
      </div>

      <div className="navbar-end">
        <div className="navbar-item">
          <button onClick={() => getMCD()} className="button is-danger">
            <span className="icon is-small">
              <img
                src="https://cdn.worldvectorlogo.com/logos/mcdonald-s-15.svg"
                alt="mcd"
              />
            </span>
            <span>McFinder</span>
          </button>
        </div>
        <form onSubmit={onSubmit} className="navbar-item">
          <div className="navbar-item">
            <div className="field">
              <div className="control has-icons-right">
                <input
                  onChange={handleChange}
                  className="input"
                  type="text"
                  name="search"
                  value={search}
                  placeholder="Why bother searching"
                />
                <span className="icon is-right">
                  <i className="fas fa-search" />
                </span>
              </div>
            </div>
          </div>
          <div className="navbar-item">
            <button type="submit" className="button is-info">
              <span className="icon">
                <i className="fas fa-utensils" />
              </span>
              <span>Search</span>
            </button>
          </div>
        </form>
      </div>
    </nav>
  );
};
