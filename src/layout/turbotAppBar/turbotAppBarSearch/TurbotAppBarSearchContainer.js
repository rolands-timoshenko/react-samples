import React, { Component } from "react";
import gql from "graphql-tag";
import Search from "../../../shared/search/Search";
import resourceFragments from "../../../shared/graphql/fragments/resourceFragments";
import TurbotErrorHandlerMessage from "../../../shared/turbotErrorHandlerMessage/TurbotErrorHandlerMessage";
import TurbotResourceBrowseButtonContainer from "../../../shared/turbotResourceBrowseButton/TurbotResourceBrowseButtonContainer";
import withClient from "../../../hoc/withClient";
import withListQuery from "../../../hoc/withListQuery";
import withTurbotErrorHandlerProvider from "../../../shared/turbotErrorHandler/withTurbotErrorHandlerProvider";
import { compose } from "react-apollo";
import { debounce } from "lodash";
import { UI_URLS } from "../../../config/urls";
import { withRouter } from "react-router-dom";

const RESOURCE_SEARCH = gql`
  query AppBarSearch($filter: [String!], $paging: String) {
    resourceList(filter: $filter, paging: $paging) {
      paging {
        next
      }
      items {
        ...resourceTrunk
        type {
          icon
        }
        turbot {
          ...turbotResourceMetadata
        }
      }
    }
  }
  ${resourceFragments.resourceTrunk}
  ${resourceFragments.turbotResourceMetadata}
`;

class TurbotAppBarSearchContainer extends Component {
  state = {
    searchResultsAnchorEl: null,
    searchValue: ""
  };

  debounceResourceSearch = debounce(() => this.resourceSearch(), 500);

  resourceSearch = () => {
    this.onLoad(null, true, true);
  };

  handleSearchValueChange = e => {
    this.setState(
      {
        searchResultsAnchorEl: e.currentTarget,
        searchValue: e.currentTarget.value
      },
      this.debounceResourceSearch
    );
  };

  handleSelectSearchResult = resource => {
    // TODO handle search result selection e.g. show resource page
    this.setState(
      {
        searchResultsAnchorEl: null
      },
      () => {
        this.props.history.push(
          this.props.generateCleanNavigateUrl(UI_URLS.OVERVIEW, [
            {
              key: "filter",
              value: `resource:${resource.turbot.id}`
            }
          ])
        );
      }
    );
  };

  handleClose = () => {
    this.setState({
      searchResultsAnchorEl: null,
      searchValue: ""
    });
  };

  onLoad = (filter, reload, scrollToTop) => {
    const filters = [`${this.state.searchValue} limit:20 sort:path`];
    const variables = {
      filter: filters
    };
    this.props.onLoad(variables, reload, scrollToTop);
  };

  renderBrowseButton = () => {
    return (
      <TurbotResourceBrowseButtonContainer
        type={{
          title: "Resource",
          value: "resource",
          titlePlural: ""
        }}
        onSelect={this.handleSelectSearchResult}
      />
    );
  };

  render() {
    return (
      <div style={{ width: 400 }}>
        <Search
          placeholder="Jump to..."
          searchResults={this.props.list}
          searchResultsAnchorEl={this.state.searchResultsAnchorEl}
          searchValue={this.state.searchValue}
          onLoadMore={this.onLoad}
          onSearchValueChange={this.handleSearchValueChange}
          onSelectSearchResult={this.handleSelectSearchResult}
          browseButton={this.renderBrowseButton()}
          onResultsClose={this.handleClose}
        />
      </div>
    );
  }
}

const enhance = compose(
  withTurbotErrorHandlerProvider(TurbotErrorHandlerMessage),
  withRouter,
  withClient,
  withListQuery("resourceList", RESOURCE_SEARCH)
);

export default enhance(TurbotAppBarSearchContainer);
