import React, { Component } from "react";

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
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
            <div className="field">
              <div className="control">
                <input
                  className="input is-primary"
                  type="text"
                  placeholder="What eats??"
                />
              </div>
            </div>
          </div>
          <div className="navbar-item">
            <div className="button is-info" onClick={() => this.props.getVenues()}>
              <span className="icon">
                <i className="fas fa-utensils" />
              </span>
              <span>Search</span>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
