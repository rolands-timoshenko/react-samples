import React, { Component } from "react";
import BrowseResourceMenuContainer from "../browseResourceMenu/BrowseResourceMenuContainer";
import Filters from "./Filters";
import {
  canCreateResourceUnder,
  canDeleteResource,
  canEditResource
} from "../../../utils/resources";
import { compose } from "react-apollo";
import { connect } from "react-redux";
import { FiltersConfig } from "../../../utils/filters";
import {
  getQueryStringAsObject,
  getUrlSearchParams
} from "../../../utils/urls";
import { isEqual } from "lodash";
import { setScopeFilterOrders } from "../../../store/actions/Filter";
import { withRouter } from "react-router-dom";

class FiltersContainer extends Component {
  constructor(props) {
    super(props);
    const filterChoices = [
      FiltersConfig.controlCategory,
      FiltersConfig.controlType,
      FiltersConfig.policyType,
      FiltersConfig.resource,
      FiltersConfig.resourceCategory,
      FiltersConfig.resourceType
    ];
    this.state = {
      menuAnchorEl: null,
      filters: this.getFiltersFromSearch(this.props.location, filterChoices),
      filterChoices
    };
  }

  componentDidMount() {
    this.unlisten = this.props.history.listen(location => {
      const currentFilters = this.state.filters;
      const nextFilters = this.getFiltersFromSearch(
        location,
        this.state.filterChoices
      );

      let shouldCollapseFilters = true;
      if (currentFilters.length === nextFilters.length) {
        const currentFilterOrder = currentFilters.map(item => item.type.value);
        const nextFilterOrder = nextFilters.map(item => item.type.value);
        if (isEqual(currentFilterOrder, nextFilterOrder))
          shouldCollapseFilters = false;
      }

      this.setState({
        filters: this.computeExpandedFilters(
          nextFilters,
          currentFilters,
          shouldCollapseFilters
        )
      });
    });

    this.props.setScopeFilterOrders(this.state.filters);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.filters !== this.state.filters) {
      this.props.setScopeFilterOrders(this.state.filters);
    }
  }

  getFilterChoices() {
    const filteredChoices = [];
    for (let choice of this.state.filterChoices) {
      const filter = {
        config: choice,
        enabled: !this.state.filters.find(
          filter => filter.type.value === choice.value.value
        )
      };
      filteredChoices.push(filter);
    }
    return filteredChoices;
  }

  getFiltersFromSearch(location, filterChoices) {
    const filters = [];
    const queryString = getQueryStringAsObject(location);
    const filter = queryString.filter;
    if (filter) {
      const filterParts = filter.split(" ");
      for (let filterPart of filterParts) {
        const parts = filterPart.split(":");
        const matchingFilterChoice = filterChoices.find(
          filter => filter.value.value === parts[0]
        );
        if (!matchingFilterChoice) {
          continue;
        }
        filters.push({
          type: matchingFilterChoice.value,
          selectedItem: parts[1]
        });
      }
    }
    //Always show a resource browser if nothing specified
    if (filters.length === 0) {
      filters.push({
        type: { title: "Resource", value: "resource" }
      });
    }

    // The last filter should be open by default
    if (filters.length) filters[filters.length - 1].isOpen = true;
    return filters;
  }

  computeExpandedFilters(
    nextFilters,
    currentFilters,
    shouldCollapseFilters = null
  ) {
    if (shouldCollapseFilters) {
      // The last filter should be open
      nextFilters[nextFilters.length - 1].isOpen = true;
      return nextFilters;
    }
    // Preserve the currentFilters's isOpen state
    for (const filterIndex in nextFilters) {
      nextFilters[filterIndex].isOpen = currentFilters[filterIndex].isOpen;
    }
    return nextFilters;
  }

  handleAddFilter = filter => {
    const filters = this.state.filters;
    filters.map(item => (item.isOpen = false));
    this.setState({
      filters: [...filters, { type: filter.value, isOpen: true }],
      menuAnchorEl: null
    });
  };

  handleRemoveFilter = type => {
    const filters = this.state.filters;
    const newFilters = [];
    for (let filter of filters) {
      if (filter.type === type) {
        continue;
      }
      newFilters.push(filter);
    }
    let newFilterParts = [];
    for (let newFilter of newFilters) {
      if (newFilter.selectedItem) {
        newFilterParts.push(
          `${newFilter.type.value}:${newFilter.selectedItem}`
        );
      }
    }
    const filterString = newFilterParts.join(" ");
    const searchParams = getUrlSearchParams(this.props.location);
    if (filterString) {
      searchParams.set("filter", filterString);
    } else {
      searchParams.delete("filter");
    }
    const searchString = searchParams.toString();
    this.props.history.push(
      `${this.props.location.pathname}${searchString ? `?${searchString}` : ""}`
    );

    // The last filter should be open by default
    if (newFilters.length) newFilters[newFilters.length - 1].isOpen = true;
    this.setState({
      filters: newFilters,
      menuAnchorEl: null
    });
  };

  handleOpenMenu = event => {
    this.setState({
      menuAnchorEl: event.currentTarget
    });
  };

  handleCloseMenu = () => {
    this.setState({
      menuAnchorEl: null
    });
  };

  handleToggleOpenClick = (filterType, filterIsOpen) => {
    const filters = this.state.filters;
    filters.forEach(item => {
      if (item.type.value === filterType.value) {
        item.isOpen = !filterIsOpen;
      }
    });
    this.setState(currentState => ({
      filters: filters
    }));
  };

  getMoreMenu = resource => {
    const newResource = {
      ...resource.object,
      type: resource.type
    };
    const canCreate = canCreateResourceUnder(newResource.type);
    const canEdit = canEditResource(newResource.type);
    const canDelete = canDeleteResource(newResource.type);
    if (canCreate || canEdit || canDelete) {
      return (
        <BrowseResourceMenuContainer
          canCreate={canCreate}
          canEdit={canEdit}
          canDelete={canDelete}
          resource={newResource}
        />
      );
    }
    return null;
  };

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    return (
      <Filters
        filterChoices={this.getFilterChoices()}
        filters={this.state.filters}
        menuAnchorEl={this.state.menuAnchorEl}
        selectedItemAction={this.getMoreMenu}
        onAddfilter={this.handleAddFilter}
        handleToggleOpenClick={this.handleToggleOpenClick}
        onRemoveFilter={this.handleRemoveFilter}
        onOpenFiltersMenu={this.handleOpenMenu}
        onCloseFiltersMenu={this.handleCloseMenu}
      />
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setScopeFilterOrders: filters => dispatch(setScopeFilterOrders(filters))
  };
};

const enhance = compose(
  withRouter,
  connect(
    null,
    mapDispatchToProps
  )
);

export default enhance(FiltersContainer);
