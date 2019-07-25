import React, { Component } from "react";
import ActionFilters from "../../../tableList/tableItemActionPopover/actionFilters/ActionFilters";
import PropTypes from "prop-types";
import QUERY from "./TurbotActivityGrantActionMenu.queries";
import TableItemActionPopoverContainer from "../../../tableList/tableItemActionPopover/TableItemActionPopoverContainer";
import withClient from "../../../../hoc/withClient";
import withTurbotErrorHandlerConsumer from "../../../turbotErrorHandler/withTurbotErrorHandlerConsumer";
import { compose } from "redux";
import { getTitle } from "../../../../utils/resources";
import { withRouter } from "react-router-dom";

const transform = data => [
  {
    title: "Identity",
    ...(data.grant &&
      data.grant.identity && {
        breadcrumbs: [
          {
            title: "Resource",
            filters: data.grant.identity.trunk.items.map(item => {
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
            filters: data.grant.identity.type.trunk.items.map(item => {
              return {
                label: getTitle(item),
                key: "resourceType",
                value: item.turbot.id
              };
            })
          },
          {
            title: "Category",
            filters: data.grant.identity.type.category.trunk.items.map(item => {
              return {
                label: getTitle(item),
                key: "resourceCategory",
                value: item.turbot.id
              };
            })
          }
        ]
      })
  },
  {
    title: "Resource",
    ...(data.grant.resource && {
      breadcrumbs: [
        {
          title: "Resource",
          filters: data.grant.resource.trunk.items.map(item => {
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
          filters: data.grant.resource.type.trunk.items.map(item => {
            return {
              label: getTitle(item),
              key: "resourceType",
              value: item.turbot.id
            };
          })
        },
        {
          title: "Category",
          filters: data.grant.resource.type.category.trunk.items.map(item => {
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
    grantId: PropTypes.string.isRequired,
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

  handleLoadData = async () => {
    try {
      if (!this.props.grantId) throw new Error("Missing resource ID");
      this.setProcessing(true);
      const { data } = await this.props.client.query({
        query: QUERY,
        variables: {
          id: this.props.grantId
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
            filters={transform(this.state.data, this.handleDetailsLinkClick)}
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
