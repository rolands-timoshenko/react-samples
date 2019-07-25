import React, { Component, Fragment } from "react";
import BrowseDivider from "../browseDivider/BrowseDivider";
import BrowseList from "./BrowseList";
import PropTypes from "prop-types";
import queries from "./queries";
import withClient from "../../../../hoc/withClient";
import withTurbotErrorHandlerConsumer from "../../../../shared/turbotErrorHandler/withTurbotErrorHandlerConsumer";
import { artificialRoot } from "../utils";
import { compose } from "redux";
import { connect } from "react-redux";
import { hasPermission } from "../../../../utils/permissions";
import {
  selectPermissionsMetadata,
  selectUserPermissions
} from "../../../../store/selectors/Permissions";
import { withRouter } from "react-router-dom";

class AncestorsListContainer extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired,
    // Process management
    processes: PropTypes.array.isRequired,
    setProcessing: PropTypes.func.isRequired
  };

  state = {
    processing: false,
    list: [],
    next: null
  };

  get list() {
    if (this.state.list.length === 0) {
      return [];
    }
    let ancestors = this.state.list.slice(0, this.state.list.length - 1);
    if (this.props.type.value !== "resource") {
      ancestors = [artificialRoot(this.props.type), ...ancestors];
    }
    return ancestors;
  }

  get itemId() {
    return this.props.item.turbot.id;
  }

  get processing() {
    return this.state.processing && this.props.processes.length > 0;
  }

  handleLoadMore = async (reload = false, clearList = false) => {
    await this.loadAncestorsById(this.itemId, reload, clearList);
  };

  loadAncestorsById = async (itemId, reload, clearList = false) => {
    try {
      this.props.setProcessing(true);

      this.setState({
        ...(this.state.list.length > 0 && { processing: true }),
        ...(clearList && { list: [] })
      });

      const { data } = await this.props.client.query({
        query: queries[this.props.type.value].ancestors,
        variables: {
          filter: `level:ancestor,self ${this.props.type.value}:${itemId} sort:path limit:50`
        }
      });

      // If rootResource is provided don't show the ancestors of a resource.
      const list = this.props.filterAncestors
        ? this.props.filterAncestors(data.list.items, this.props.rootResource)
        : data.list.items;

      this.setState({
        processing: false,
        list: list
      });
      this.props.setProcessing(false);
    } catch (error) {
      this.props.errorHandler.setError(error);
      this.setState({
        processing: false
      });
      this.props.setProcessing(false);
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

  componentDidMount() {
    this.handleLoadMore();
  }

  componentDidUpdate(prevProps) {
    if (this.itemId !== prevProps.item.turbot.id) {
      this.handleLoadMore(true, true);
    }
  }

  hasPermissionForResource = resource => {
    if (this.props.type.value !== "resource") {
      return true;
    }

    return this.props.permissionsMetadata && this.props.userPermissions
      ? hasPermission(
          resource.turbot.path,
          "",
          "",
          this.props.permissionsMetadata,
          this.props.userPermissions
        )
      : false;
  };

  render() {
    const { onSelect } = this.props;
    return (
      this.state.list && (
        <Fragment>
          <BrowseList
            processing={this.processing}
            list={this.list}
            hasPermissionForResource={this.hasPermissionForResource}
            onSelect={onSelect}
          />
          <BrowseDivider />
        </Fragment>
      )
    );
  }
}

const mapStateToProps = state => {
  return {
    permissionsMetadata: selectPermissionsMetadata(state),
    userPermissions: selectUserPermissions(state)
  };
};

const enhance = compose(
  connect(mapStateToProps),
  withRouter,
  withClient,
  withTurbotErrorHandlerConsumer
);

export default enhance(AncestorsListContainer);
