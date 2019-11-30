import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Main from "./Components/Main";
import Details from "./Components/Details";
import Login from "./Components/Login";
import Create from "./Components/Create";
import ArticleStore from "./Stores/Article";
import UserStore from "./Stores/User";
import { Route, Switch, Redirect } from "react-router";
import { observer } from "mobx-react";
import { toJS } from "mobx";

function App() {
  return (
    <>
      <Switch>
        <Route
          exact
          path="/"
          render={props => (
            <Main
              {...props}
              articles={toJS(ArticleStore.articles)}
              loading={toJS(ArticleStore.loading)}
            />
          )}
        />
        <Route path="/detail/:articleID" component={Details} />
        <Route path="/login" component={Login} />
        <Route path="/create" component={Create} />

        <Redirect to="/" />
      </Switch>
    </>
  );
}

export default observer(App);
