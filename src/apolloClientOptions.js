import store from "./store/AppStore";
import { createBrowserHistory } from "history";
import { ApolloLink } from "apollo-link";
// import { BatchHttpLink } from "apollo-link-batch-http";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { logoutAsync } from "./store/actions/Auth";
import { onError } from "apollo-link-error";
import { selectLoggedIn } from "./store/selectors/User";
import { setContext } from "apollo-link-context";
import { UI_URLS } from "./config/urls";

const getCookie = cname => {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

const uri = "/api/v5/graphql";
// eslint-disable-next-line no-unused-vars
// const batchLink = new BatchHttpLink({
//   uri: uri,
//   batchInterval: 50
// });

const httpLink = new HttpLink({
  uri: uri,
  credentials: "same-origin"
});

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      "X-XSRF-TOKEN": getCookie("XSRF-TOKEN")
    }
  };
});

export default {
  link: ApolloLink.from([
    (operation, forward) => {
      // Should return observable
      return forward(operation).map(data => {
        // TODO: data can be intercepted here
        return data;
      });
    },
    onError(({ operation, response, graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
        if (networkError.statusCode === 401) {
          const state = store.getState();
          if (selectLoggedIn(state)) {
            console.log("Logging user out...Apollo");
            store.dispatch(logoutAsync());
            const history = createBrowserHistory({ forceRefresh: true });
            history.push(UI_URLS.LOGIN);
          }
        }
      }
    }),
    authLink.concat(httpLink)
  ]),
  cache: new InMemoryCache({}),
  defaultOptions: {
    query: {
      fetchPolicy: "network-only"
    }
  }
};
