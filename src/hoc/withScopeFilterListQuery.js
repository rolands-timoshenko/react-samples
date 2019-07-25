import React from "react";
import { TypeErrorHandler } from "./../shared/turbotErrorHandler/TurbotErrorHandlerConsumer";
import withBackoff from "./withBackoff";

export const ListQueryContext = React.createContext({});

const withScopeFilterQuery = (
  key,
  graphqlQuery,
  refreshInterval,
  limit = 25
) => WrappedComponent => {
  return withBackoff(
    class extends React.Component {
      mainRef = null;

      timeoutId;

      static propTypes = {
        errorHandler: TypeErrorHandler.isRequired
      };

      state = {
        list: [],
        next: null,
        processing: false,
        loading: false,
        filter: null,
        error: null,
        response: null
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

          const queryFilterHasLimit =
            queryFilter && queryFilter.indexOf("limit:") >= 0;
          const filters = [];

          // Is there a scope filter for the left nav? If so, include it.
          if (this.props.scopeFilter) {
            filters.push(this.props.scopeFilter);
          }

          // If there's a local filter and already has a limit
          if (queryFilter && queryFilterHasLimit) {
            filters.push(queryFilter);
            // Or if there's a local filter without a limit
          } else if (queryFilter) {
            filters.push(`${queryFilter} limit:${limit}`);
            // Or if there's no local filter
          } else {
            filters.push(`limit:${limit}`);
          }
          // If reload is false but next page not exist lets reload data
          reload = reload || !this.state.next;

          scrollTop && this.scrollToTop(reload);

          const { data } = await this.props.client.query({
            // errorPolicy: "all",
            query: graphqlQuery,
            variables: {
              filter: filters,
              paging: !reload ? this.state.next : null
            }
          });

          this.setState(prevState => {
            const list = reload
              ? [...data[key].items]
              : [...prevState.list, ...data[key].items];
            const next = data[key].paging.next;
            const filter = tempFilter;
            const response = data[key];
            return {
              list,
              next,
              filter: filter,
              response
            };
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
          // FIXME: not sure how to approuch graphql errors
          // this.props.errorHandler && this.props.errorHandler.setError(e);
        } finally {
          this.setStateAsync({ loading: false, processing: false });
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
              next={Boolean(this.state.next)}
              processing={this.state.processing}
              {...this.props}
            />
          </ListQueryContext.Provider>
        );
      }
    },
    refreshInterval
  );
};

export default withScopeFilterQuery;
