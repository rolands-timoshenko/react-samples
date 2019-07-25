import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { of } from "rxjs";
import Resources from "./mocks/resources"

export default {
  link: ApolloLink.from([
    operation => {
      switch(operation.operationName) {
        case "SmartFolders":
          return of(Resources);
      }
    }
  ]),
  cache: new InMemoryCache({})
};
