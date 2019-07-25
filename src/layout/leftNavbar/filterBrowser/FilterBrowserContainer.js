import withTheme from "@material-ui/core/styles/withTheme";
import { isEmpty } from "lodash";
import PropTypes from "prop-types";
import React, { Component, Fragment } from "react";
import { compose } from "react-apollo";
import { withBus } from "react-bus";
import isEqual from "react-fast-compare";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Events from "../../../config/events";
import withClient from "../../../hoc/withClient";
import withTurbotErrorHandlerConsumer from "../../../shared/turbotErrorHandler/withTurbotErrorHandlerConsumer";
import withTurbotErrorHandlerProvider from "../../../shared/turbotErrorHandler/withTurbotErrorHandlerProvider";
import TurbotErrorHandlerMessage from "../../../shared/turbotErrorHandlerMessage/TurbotErrorHandlerMessage";
import {
  deleteScopeFilterItem,
  setScopeFilterItem
} from "../../../store/actions/Filter";
import { getTitle } from "../../../utils/resources";
import { addScopeFilterToUrl } from "../../../utils/urls";
import DrawerItem from "../drawerItem/DrawerItem";
import DrawerItemText from "../drawerItem/drawerItemText/DrawerItemText";
import BrowseDivider from "./browseDivider/BrowseDivider";
import FilterBrowser from "./FilterBrowser";
import queries from "./queries";
import { artificialRoot, insufficientPermissions } from "./utils";

class FilterBrowserContainer extends Component {
  static propTypes = {
    // Event bus
    bus: PropTypes.object.isRequired,
    withResourceNavNodes: PropTypes.bool.isRequired
  };

  state = {
    root: null,
    selected: null,
    processing: null
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.selectedItem !== nextProps.selectedItem ||
      !isEqual(this.state.selected, nextState.selected) ||
      this.props.isOpen !== nextProps.isOpen
    );
  }

  async componentDidUpdate() {
    const updates = {
      ...(await this.loadItemById(
        this.props.selectedItem || this.state.root.turbot.id
      ))
    };
    this.setState(updates, () => this.postSelectionActions(updates.selected));
  }

  async componentDidMount() {
    let tempState = {};
    const rootResource = await this.loadRootResource();

    if (this.props.type.value === "resource") {
      // If we get an empty list then we can conclude that user does't have
      // permission.
      if (isEmpty(rootResource)) {
        tempState.root = insufficientPermissions();
      } else {
        tempState.root = rootResource;
      }
    } else {
      tempState.root = rootResource;
    }

    if (this.props.selectedItem) {
      tempState = {
        ...tempState,
        ...(await this.loadItemById(this.props.selectedItem))
      };
    } else {
      tempState = {
        ...tempState,
        ...(await this.loadItemById(tempState.root.turbot.id))
      };
    }

    this.setState(
      {
        ...tempState
      },
      () => this.postSelectionActions(tempState.selected)
    );

    // Lets reload selected resource if it was updated
    this.props.bus.on(Events.RESOURCE_UPDATED, this.reloadSelectedResource);
  }

  reloadSelectedResource = async () => {
    const { selected } = await this.loadItemById(this.state.selected.turbot.id);
    this.setState({
      selected: selected
    });
  };

  componentWillUnmount() {
    this.props.deleteScopeFilterItem(this.props.type.value);
    this.props.bus &&
      this.props.bus.off(Events.RESOURCE_UPDATED, this.reloadSelectedResource);
  }

  postSelectionActions(selected) {
    this.ensureSelected(selected);
    this.props.setScopeFilterItem(this.props.type.value, selected);
  }

  ensureSelected(selected) {
    if (!this.props.selectedItem) {
      this.handleSelect(selected, true, false);
    }
  }

  loadRootResource = async () => {
    try {
      switch (this.props.type.value) {
        case "resource":
          const { data } = await this.props.client.query({
            query: queries[this.props.type.value].root
          });

          return (
            data &&
            data.rootResource &&
            data.rootResource.items.length > 0 &&
            data.rootResource.items[0]
          );
        default:
          return artificialRoot(this.props.type);
      }
    } catch (error) {
      this.props.errorHandler.setError(error);
    }
  };

  loadItemById = async itemId => {
    if (itemId === "insufficientPermissions") {
      return {
        selected: insufficientPermissions()
      };
    }

    if (
      this.props.type.value !== "resource" &&
      itemId === "turbotArtificialRoot"
    ) {
      return {
        selected: artificialRoot(this.props.type)
      };
    }
    try {
      const { data } = await this.props.client.query({
        query: queries[this.props.type.value].item,
        variables: {
          id: itemId
        }
      });
      return {
        selected: data.item
      };
    } catch (error) {
      this.props.errorHandler.setError(error);
    }
  };

  handleSelect = (
    item,
    addFilterInCurrentPosition = true,
    withRouteRedirect = true,
    isNavigationNode = false
  ) => {
    if (isNavigationNode) {
      addScopeFilterToUrl(
        this.props.location,
        this.props.history,
        "resourceType",
        item.type.turbot.id,
        addFilterInCurrentPosition,
        withRouteRedirect
      );
    } else {
      addScopeFilterToUrl(
        this.props.location,
        this.props.history,
        this.props.type.value,
        item.turbot.id,
        addFilterInCurrentPosition,
        withRouteRedirect
      );
    }
  };

  setProcessing = async processing => {
    return new Promise(resolve => {
      this.setState(
        {
          processing: processing
        },
        resolve
      );
    });
  };

  getFilterTitle = selected => {
    return (
      <Fragment>
        {this.props.type.title}
        {!this.props.isOpen && this.props.selectedItem && ": "}
        {!this.props.isOpen && this.props.selectedItem && (
          <span
            style={{ fontWeight: this.props.theme.typography.fontWeightMedium }}
          >
            {selected && getTitle(selected)}
          </span>
        )}
      </Fragment>
    );
  };

  render() {
    const selected = this.state.selected;
    return (
      <Fragment>
        <DrawerItem
          hasDropdown
          canRemove
          dropDownOpen={this.props.isOpen}
          onClick={() =>
            this.props.handleToggleOpenClick(this.props.type, this.props.isOpen)
          }
          onClickRemove={() => this.props.onRemove(this.props.type)}
        >
          <DrawerItemText>{this.getFilterTitle(selected)}</DrawerItemText>
        </DrawerItem>
        {this.props.isOpen && selected && (
          <Fragment>
            <BrowseDivider />
            <FilterBrowser
              onSelect={this.handleSelect}
              item={selected}
              selectedItemAction={this.props.selectedItemAction}
              type={this.props.type}
              withResourceNavNodes={true}
            />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setScopeFilterItem: (filterType, item) =>
      dispatch(setScopeFilterItem(filterType, item)),
    deleteScopeFilterItem: filterType =>
      dispatch(deleteScopeFilterItem(filterType))
  };
};

const enhance = compose(
  // order is crucial
  withTurbotErrorHandlerProvider(TurbotErrorHandlerMessage),
  withRouter,
  withClient,
  withTurbotErrorHandlerConsumer,
  withTheme(),
  withBus(),
  connect(
    null,
    mapDispatchToProps
  )
);

export default enhance(FilterBrowserContainer);
