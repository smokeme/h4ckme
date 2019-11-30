import React, { Component } from "react";
import UserStore from "../Stores/User";
import { observer } from "mobx-react";
import Nav from "./Nav";
import { instance } from "../Stores/User";
import ArticleStore from "../Stores/Article";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      body: "",
      title: "",
      file: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }
  handleChangeFile(event) {
    this.setState({ file: event.target.files[0] });
  }
  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("body", this.state.body);
    formData.append("title", this.state.title);

    formData.append("image", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };
    instance
      .post("/articles/add", formData, config)
      .then(response => {
        ArticleStore.fetchAllArticles();
        this.props.history.push("/");
      })
      .catch(error => {});
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
        {!UserStore.user ? (
          <>
            <div className="login-clean">
              <div className="form-group">
                <h1>You need to login first</h1>
              </div>
            </div>
          </>
        ) : (
          <div className="login-clean">
            <form onSubmit={this.handleSubmit}>
              <h2 className="sr-only">Create Article Form</h2>
              <div className="form-group">
                <input
                  className="form-control"
                  type="title"
                  name="title"
                  placeholder="title"
                  value={this.state.title}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <textarea
                  rows="4"
                  col="4"
                  type="body"
                  name="body"
                  placeholder="body"
                  value={this.state.body}
                  onChange={this.handleChange}
                />
              </div>
              <input
                type="file"
                name="image"
                onChange={this.handleChangeFile}
              />
              <div className="form-group">
                <button className="btn btn-primary btn-block" type="submit">
                  Create
                </button>
              </div>
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
