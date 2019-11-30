import React, { Component } from "react";
import UserStore from "../Stores/User";
import { observer } from "mobx-react";
import Nav from "./Nav";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitRegistration = this.handleSubmitRegistration.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    UserStore.login(this.state);
  }
  handleSubmitRegistration(event) {
    event.preventDefault();
    UserStore.register(this.state);
  }
  handleLogout(event) {
    event.preventDefault();
    UserStore.logout();
  }
  render() {
    if (UserStore.user) {
    }
    return (
      <div>
        <Nav />
        <header
          className="masthead"
          style={{
            backgroundImage:
              'url("/about-bg.jpg?h=ca94606afe09dc1190c07f9b89d907e7")'
          }}
        >
          <div className="overlay" />
          <div className="container">
            <div className="row">
              <div className="col-md-10 col-lg-8 mx-auto">
                <div className="site-heading">
                  <h1>Login</h1>
                  <span className="subheading" />
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* Start: Login Form Clean */}
        {UserStore.user ? (
          <>
            <div className="login-clean">
              <div className="form-group">
                <h1>Welcome {UserStore.user.username}</h1>
                <button className="btn btn-primary" onClick={this.handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="login-clean">
            <form onSubmit={this.handleSubmit}>
              <h2 className="sr-only">Login Form</h2>
              <div className="illustration">
                <i className="icon ion-ios-navigate" />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="username"
                  name="username"
                  placeholder="username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <button className="btn btn-primary btn-block" type="submit">
                  Log In
                </button>
              </div>
              <a className="forgot" href="#" />
              <button
                className="btn btn-primary btn-block"
                onClick={this.handleSubmitRegistration}
              >
                Sign Up
              </button>
            </form>
          </div>
        )}
        {/* End: Login Form Clean */}
        <hr />
        <footer>
          <div className="container">
            <div className="row">
              <div className="col-md-10 col-lg-8 mx-auto">
                <ul className="list-inline text-center">
                  <li className="list-inline-item">
                    <span className="fa-stack fa-lg">
                      <i className="fa fa-circle fa-stack-2x" />
                      <i className="fa fa-twitter fa-stack-1x fa-inverse" />
                    </span>
                  </li>
                  <li className="list-inline-item">
                    <span className="fa-stack fa-lg">
                      <i className="fa fa-circle fa-stack-2x" />
                      <i className="fa fa-facebook fa-stack-1x fa-inverse" />
                    </span>
                  </li>
                  <li className="list-inline-item">
                    <span className="fa-stack fa-lg">
                      <i className="fa fa-circle fa-stack-2x" />
                      <i className="fa fa-github fa-stack-1x fa-inverse" />
                    </span>
                  </li>
                </ul>
                <p className="text-muted copyright">
                  Copyright&nbsp;©&nbsp;InfoSecKW 2018
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default observer(Login);
