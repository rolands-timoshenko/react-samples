import { UI_URLS } from "../../../../config/urls";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import PropTypes from "prop-types";
import React, { Component } from "react";
import QUERY from "./TurbotActivityControlActionMenu.queries";
import ActionFilterLink from "../../../tableList/tableItemActionPopover/actionFilterLink/ActionFilterLink";
import TableItemActionPopoverContainer from "../../../tableList/tableItemActionPopover/TableItemActionPopoverContainer";
import ActionFilters from "../../../tableList/tableItemActionPopover/actionFilters/ActionFilters";
import withClient from "../../../../hoc/withClient";
import { getTitle } from "../../../../utils/resources";
import withTurbotErrorHandlerConsumer from "../../../turbotErrorHandler/withTurbotErrorHandlerConsumer";

const transform = (data, onClick) => [
  {
    title: "Control",
    ...(data.type && {
      breadcrumbs: [
        {
          title: "Detail",
          actionCmp: (
            <ActionFilterLink onClick={() => onClick(UI_URLS.CONTROL)}>
              Control Detail
            </ActionFilterLink>
          )
        },
        {
          title: "Type",
          filters: data.type.trunk.items.map(item => {
            return {
              label: getTitle(item),
              key: "controlType",
              value: item.turbot.id
            };
          })
        },
        {
          title: "Category",
          filters: data.type.category.trunk.items.map(item => {
            return {
              label: getTitle(item),
              key: "controlCategory",
              value: item.turbot.id
            };
          })
        }
      ]
    })
  },
  {
    title: "Resource",
    ...(data.resource && {
      breadcrumbs: [
        {
          title: "Detail",
          actionCmp: (
            <ActionFilterLink onClick={() => onClick(UI_URLS.RESOURCE)}>
              {getTitle(data.resource)}
            </ActionFilterLink>
          )
        },
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

class TurbotActivityControlActionMenuContainer extends Component {
  static propTypes = {
    controlId: PropTypes.string.isRequired,
    client: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
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

  handleDetailsLinkClick = resourceTypeUrl => {
    try {
      switch (resourceTypeUrl) {
        case UI_URLS.CONTROL:
          this.props.history.push(
            `${UI_URLS.CONTROL}/${this.state.data.control.turbot.id}${this.props.location.search}`
          );
          return;

        case UI_URLS.RESOURCE:
          this.props.history.push(
            `${UI_URLS.RESOURCE}/${this.state.data.control.resource.turbot.id}${this.props.location.search}`
          );
          return;
      }
    } catch (error) {
      // TODO: log error
      console.error(error);
    }
  };

  handleLoadData = async () => {
    try {
      if (!this.props.controlId) throw new Error("Missing control ID");
      this.setProcessing(true);
      const { data } = await this.props.client.query({
        query: QUERY,
        variables: {
          id: this.props.controlId
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
              this.state.data.control,
              this.handleDetailsLinkClick
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

export default enhance(TurbotActivityControlActionMenuContainer);
