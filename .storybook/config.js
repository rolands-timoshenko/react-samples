import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { addDecorator, configure } from "@storybook/react";

// This line are added so we can use font-awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fal } from "@fortawesome/pro-light-svg-icons";
import { far } from "@fortawesome/pro-regular-svg-icons";
import { fas } from "@fortawesome/pro-solid-svg-icons";
// Lets load everything for MUI theme
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import React from "react";
import "../src/bootstrap.scss";
import turbotTheme from "../src/theme";
import apolloClientOptions from "./apolloClientOptions";

library.add(fab, fal, far, fas);

const client = new ApolloClient(apolloClientOptions);

addDecorator(story => (
  <div style={{ padding: 30 }}>
    <ApolloProvider client={client}>
      <MuiThemeProvider theme={turbotTheme}>{story()}</MuiThemeProvider>
    </ApolloProvider>
  </div>
));

function loadStories() {
  const req = require.context("../src", true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
