import React, { Component } from "react";
import { observer } from "mobx-react";
import ArticleStore from "../Stores/Article";
import { url } from "../Stores/User";
import Nav from "./Nav";
class Details extends Component {
  render() {
    let id = this.props.match.params.articleID;
    const index = ArticleStore.articles.findIndex(
      article => article._id === id
    );
    console.log(index);
    const item = ArticleStore.articles[index];
    console.log(item);
    if (!item) {
      return <></>;
    }

    return (
      <div>
        <Nav />
        <header
          className="masthead"
          style={{
            backgroundImage:
              'url("/post-bg.jpg?h=9b3eae5bf913af77d61c0390cba13bf5")'
          }}
        >
          <div className="overlay" />
          <div className="container">
            <div className="row">
              <div className="col-md-10 col-lg-8 mx-auto">
                <div className="post-heading">
                  <h1>{item.title}</h1>
                  <h2 className="subheading" />
                  <span className="meta">
                    Posted by&nbsp;<a href="#">{item.author}</a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>
        <article>
          <div className="container">
            <div className="row">
              <div className="col-md-10 col-lg-8 mx-auto">
                <img width="400" src={url + "media/?file=" + item.image} />
                <p>{item.body}</p>
                <blockquote className="blockquote">
                  <p className="mb-0" />
                </blockquote>
                <a href="#" />
              </div>
            </div>
          </div>
        </article>
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

export default observer(Details);
