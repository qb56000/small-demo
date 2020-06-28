import React from "react";
import { render } from "react-dom";
import App from "./App";
import "./index.less";
import { mainRouter } from "./routers";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
render(
  <Provider store={store} basename={process.env.PUBLIC_URL}>
    <Router>
      <Switch>
        <Route
          path="/admin"
          render={(routerPropers) => {
            return <App {...routerPropers}></App>;
          }}
        ></Route>

        {mainRouter.map((route) => {
          return (
            <Route
              key={route.pathname}
              path={route.pathname}
              component={route.component}
            ></Route>
          );
        })}
        <Redirect to="/admin" from="/" exact></Redirect>

        <Redirect to="/404"></Redirect>
      </Switch>
    </Router>
  </Provider>,
  document.querySelector("#root")
);

