import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserStore from "../Stores/User";
import { observer } from "mobx-react";

class Nav extends Component {
  handleLogout(event) {
    event.preventDefault();
    UserStore.logout();
  }
  render() {
    return (
      <nav
        className="navbar navbar-light navbar-expand-lg fixed-top"
        id="mainNav"
      >
        <div className="container">
          <Link className="navbar-brand" to="/">
            InfoSecKW
          </Link>
          <button
            data-toggle="collapse"
            data-target="#navbarResponsive"
            className="navbar-toggler"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fa fa-bars" />
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="nav navbar-nav ml-auto">
              <li className="nav-item" role="presentation">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item" role="presentation" />
              <li className="nav-item" role="presentation">
                {UserStore.user ? (
                  <a className="nav-link" href="/" onClick={this.handleLogout}>
                    Logout
                  </a>
                ) : (
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default observer(Nav);
