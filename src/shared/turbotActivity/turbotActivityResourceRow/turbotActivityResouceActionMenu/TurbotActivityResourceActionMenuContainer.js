import { UI_URLS } from "./../../../../config/urls";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import PropTypes from "prop-types";
import React, { Component } from "react";
import QUERY from "./TurbotActivityResourceActionMenu.queries";
import ActionFilterLink from "../../../tableList/tableItemActionPopover/actionFilterLink/ActionFilterLink";
import TableItemActionPopoverContainer from "../../../tableList/tableItemActionPopover/TableItemActionPopoverContainer";
import ActionFilters from "../../../tableList/tableItemActionPopover/actionFilters/ActionFilters";
import withClient from "../../../../hoc/withClient";
import { getTitle } from "../../../../utils/resources";
import withTurbotErrorHandlerConsumer from "../../../turbotErrorHandler/withTurbotErrorHandlerConsumer";

const transform = (data, onClick, withDetails) => [
  {
    title: "Resource",
    ...(data.resource && {
      breadcrumbs: [
        ...(withDetails
          ? [
              {
                title: "Detail",
                actionCmp: (
                  <ActionFilterLink onClick={() => onClick()}>
                    {getTitle(data.resource)}
                  </ActionFilterLink>
                )
              }
            ]
          : []),
        {
          title: "Resource",
          filters: data.resource.trunk.items.map(item => {
            return {
              label: getTitle(item),
              key: "resource",
              path: item.turbot.path,
              value: item.turbot.id
            };
          })
        },
        {
          title: "Type",
          filters: data.resource.type.trunk.items.map(item => {
            return {
              label: getTitle(item),
              key: "resourceType",
              value: item.turbot.id
            };
          })
        },
        {
          title: "Category",
          filters: data.resource.type.category.trunk.items.map(item => {
            return {
              label: getTitle(item),
              key: "resourceCategory",
              value: item.turbot.id
            };
          })
        }
      ]
    })
  }
];

class TurbotActivityResourceActionMenuContainer extends Component {
  static propTypes = {
    resourceId: PropTypes.string.isRequired,
    client: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    withDetails: PropTypes.bool
  };

  static defaultProps = {
    withDetails: true
  };

  state = {
    processing: false,
    data: null
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

  setData = async data => {
    return new Promise(resolve => {
      this.setState(
        {
          data: data
        },
        resolve
      );
    });
  };

  handleDetailsLinkClick = () => {
    this.props.history.push(
      `${UI_URLS.RESOURCE}/${this.props.resourceId}${this.props.location.search}`
    );
  };

  handleLoadData = async () => {
    try {
      if (!this.props.resourceId) throw new Error("Missing resource ID");
      this.setProcessing(true);
      const { data } = await this.props.client.query({
        query: QUERY,
        variables: {
          id: this.props.resourceId
        }
      });
      await this.setData(data);
    } catch (e) {
      this.props.errorHandler.setError(e);
    } finally {
      this.setProcessing(false);
    }
  };

  render() {
    return (
      <TableItemActionPopoverContainer
        processing={this.state.processing}
        onOpen={this.handleLoadData}
      >
        {this.state.data && (
          <ActionFilters
            filters={transform(
              this.state.data,
              this.handleDetailsLinkClick,
              this.props.withDetails
            )}
          />
        )}
      </TableItemActionPopoverContainer>
    );
  }
}

const enhance = compose(
  withClient,
  withRouter,
  withTurbotErrorHandlerConsumer
);

export default enhance(TurbotActivityResourceActionMenuContainer);
