import React, { Component } from "react";
import { url } from "../Stores/User";
import { observer } from "mobx-react";
import ArticleStore from "../Stores/Article";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import UserStore, { instance } from "../Stores/User";
class main extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteArticle = this.handleDeleteArticle.bind(this);
  }
  handleDeleteArticle(id) {
    instance
      .post("articles/delete", { id: id })
      .then(res => ArticleStore.fetchAllArticles());
  }
  render() {
    let posts = [];
    if (!ArticleStore.loading) {
      console.log(ArticleStore.articles);
      posts = ArticleStore.articles.map(article => (
        <>
          <div className="post-preview">
            <img width="200" src={url + "media/?file=" + article.image} />
            <Link to={"/detail/" + article._id}>
              <h2 className="post-title">{article.title}</h2>
              <h3 className="post-subtitle">{article.body}</h3>
            </Link>
            <p className="post-meta">
              Posted by&nbsp;
              {article.author}
            </p>
            {UserStore.user ? (
              UserStore.user.username === article.author ? (
                <button
                  className="btn btn-danger"
                  onClick={() => this.handleDeleteArticle(article._id)}
                >
                  Delete
                </button>
              ) : null
            ) : null}
          </div>
          <hr />
        </>
      ));
    }

    return (
      <div>
        <Nav />
        <header
          className="masthead"
          style={{
            backgroundImage:
              'url("home-bg.jpg?h=ed6236475a1226b743bf65e6f1bebb34")'
          }}
        >
          <div className="overlay" />
          <div className="container">
            <div className="row">
              <div className="col-md-10 col-lg-8 mx-auto">
                <div className="site-heading">
                  <h1>InfoSecKW</h1>
                  <span className="subheading">Example application</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div className="row justify-content-center">
          <div className="col align-self-start">
            <Link to="/create" className="btn btn-primary">
              Create Articles
            </Link>
            <div className="clearfix" />
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-10 col-lg-8">
              {posts}

              <div className="clearfix" />
            </div>
          </div>
        </div>
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

export default observer(main);
