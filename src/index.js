import React from "react";
import ReactDOM from "react-dom";
import apolloClientOptions from "./apolloClientOptions";
import AppContainer from "./AppContainer";
import CssBaseline from "@material-ui/core/CssBaseline";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import store from "./store/AppStore";
import turbotTheme from "./theme";
import { ApolloClient } from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter } from "react-router-dom";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fal } from "@fortawesome/pro-light-svg-icons";
import { far } from "@fortawesome/pro-regular-svg-icons";
import { fas } from "@fortawesome/pro-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { loadProfileAsync } from "./store/actions/User";
import { Provider as BusProvider } from "react-bus";
import { Provider } from "react-redux";
import * as d3 from "d3";
import * as serviceWorker from "./serviceWorker";
import TurbotErrorHandlerProvider from "./shared/turbotErrorHandler/TurbotErrorHandlerProvider";

import "typeface-open-sans";
import "typeface-fira-mono";
import "typeface-roboto";

import "./bootstrap.scss";
import "./index.scss";

// TODO: remove it
window._d3 = d3;

const client = new ApolloClient(apolloClientOptions);

library.add(fab, fal, far, fas);

store.dispatch(loadProfileAsync());

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <MuiThemeProvider theme={turbotTheme}>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <BusProvider>
            <TurbotErrorHandlerProvider>
              <AppContainer />
            </TurbotErrorHandlerProvider>
          </BusProvider>
        </BrowserRouter>
      </ApolloProvider>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
