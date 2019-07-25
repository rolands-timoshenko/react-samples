import { TypeErrorHandler } from "./../shared/turbotErrorHandler/TurbotErrorHandlerConsumer";
import { getScopeFilter } from "./../utils/urls";
import { ListQueryContext } from "./withScopeFilterListQuery";
import {
  filtersStringToObject,
  filtersAsUrlQuery
} from "./../store/utils/transformFilters";
import React from "react";
import withBackoff from "./withBackoff";
import withClient from "./withClient";

const withScopeFilterListQueries = (
  searchParamKey,
  queries,
  refreshInterval,
  limit = 25
) => WrappedComponent => {
  // withBackoff adds reload list interval
  return withBackoff(
    // Add grapgql client
    withClient(
      class extends React.Component {
        mainRef = null;

        timeoutId;

        static propTypes = {
          errorHandler: TypeErrorHandler
        };

        state = {
          response: null,
          list: [],
          next: null,
          processing: false,
          loading: false,
          filter: "",
          error: null
        };

        setRef = ref => {
          this.mainRef = ref;
        };

        setError = async error => {
          return new Promise(resolve => {
            this.setState(
              {
                error: error
              },
              resolve
            );
          });
        };

        setStateAsync = async state => {
          return new Promise(resolve => {
            this.setState(prevState => ({ ...prevState, ...state }), resolve);
          });
        };

        scrollToTop = reload => {
          if (reload && this.mainRef) {
            this.mainRef.scrollTo(0, 0);
          }
        };

        componentWillUnmount() {
          clearTimeout(this.timeoutId);
        }

        handleLoadMore = async (
          queryFilter,
          reload = false,
          scrollTop = true,
          backoff = false
        ) => {
          if (this.state.processing) {
            return;
          }

          const tempFilter = queryFilter;
          try {
            const filtersAsObject = filtersStringToObject(queryFilter);

            // If api request is in process return.
            // TODO: it would be nice if we could put request in que, rather than just ignore it

            if (this.timeoutId) {
              clearTimeout(this.timeoutId);
              // Just to be sure
              this.timeoutId = null;
            }

            await this.setStateAsync({
              ...(!backoff && { loading: true }),
              processing: true,
              error: null,
              ...(tempFilter !== this.state.filter &&
                reload && {
                  list: [],
                  next: null
                })
            });

            const filters = [];
            const scopeFilters = getScopeFilter(this.props.location);

            // Is there a scope filter for the left nav? If so, include it.
            if (scopeFilters) {
              filters.push(scopeFilters);
            }
            const { key, query } = this.getGraphQlQueryOptions(filtersAsObject);

            filtersAsObject[searchParamKey] &&
              delete filtersAsObject[searchParamKey];

            let cleanFilter = filtersAsUrlQuery(filtersAsObject);

            // handles filters requiring filter levels, moving it to base filter
            if ((cleanFilter || "").length && cleanFilter.includes("level:")) {
              const levelsRegex = /level:[a-zA-Z0-9,]+(\s+)?/g;
              const filterLevels = cleanFilter.match(levelsRegex)[0];

              cleanFilter = cleanFilter.replace(levelsRegex, "");
              filters[0] = `${filters[0]}${
                filterLevels ? ` ${filterLevels}` : ""
              }`;
            }

            // If there's a local filter and already has a limit
            if (filtersAsObject.limit) {
              filters.push(cleanFilter);
              // Or if there's a local filter without a limit
            } else if (filtersAsObject) {
              filters.push(`${cleanFilter} limit:${limit}`);
              // Or if there's no local filter
            } else {
              filters.push(`limit:${limit}`);
            }
            // If reload is false but next page not exist lets reload data
            reload = reload || !this.state.next;

            scrollTop && this.scrollToTop(reload);

            const { data } = await this.props.client.query({
              query: query,
              variables: {
                filter: filters,
                paging: !reload ? this.state.next : null
              }
            });

            await new Promise(resolve => {
              this.setState(
                prevState => {
                  const list = reload
                    ? [...data[key].items]
                    : [...prevState.list, ...data[key].items];
                  const response = data[key];
                  const next = data[key].paging.next;
                  const filter = tempFilter;
                  return {
                    response,
                    list,
                    next,
                    filter
                  };
                },
                () => {
                  resolve();
                }
              );
            });
            if (this.props.interval && reload) {
              this.timeoutId = setTimeout(() => {
                this.handleLoadMore(tempFilter, true, false, true);
                this.props.genNextInterval();
              }, this.props.interval);
            }
          } catch (e) {
            let errorText = "Error running filter";
            if (tempFilter) {
              errorText += ` "${tempFilter}"`;
            }
            this.setError(errorText);
            // For now list query errors should be tracked internally
            // Enable when will be clear startegy of list query error handling
            // this.props.errorHandler && this.props.errorHandler.setError(e);
          } finally {
            this.setStateAsync({ loading: false, processing: false });
          }
        };

        getGraphQlQueryOptions = filtersAsObject => {
          if (filtersAsObject[searchParamKey]) {
            const newKey = Object.keys(filtersAsObject[searchParamKey])[0];
            return { query: queries[newKey], key: newKey };
          } else {
            const firstKey = Object.keys(queries)[0];
            return { query: queries[firstKey], key: firstKey };
          }
        };

        getContext = () => {
          return {
            error: this.state.error,
            processing: this.state.processing,
            loading: this.state.loading,
            next: Boolean(this.state.next),
            listCount: this.state.list.length
          };
        };

        render() {
          return (
            <ListQueryContext.Provider value={this.getContext()}>
              <WrappedComponent
                data={this.state.response}
                list={this.state.list}
                onLoad={this.handleLoadMore}
                setRef={this.setRef}
                filters={filtersStringToObject(this.state.filter)}
                {...this.props}
              />
            </ListQueryContext.Provider>
          );
        }
      }
    ),
    refreshInterval
  );
};

export default withScopeFilterListQueries;
