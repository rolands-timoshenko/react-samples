import { UI_URLS } from "../../../../config/urls";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import PropTypes from "prop-types";
import React, { Component } from "react";
import QUERY from "./TurbotActivityPolicyActionMenu.queries";
import ActionFilterLink from "../../../tableList/tableItemActionPopover/actionFilterLink/ActionFilterLink";
import TableItemActionPopoverContainer from "../../../tableList/tableItemActionPopover/TableItemActionPopoverContainer";
import ActionFilters from "../../../tableList/tableItemActionPopover/actionFilters/ActionFilters";
import withClient from "../../../../hoc/withClient";
import { getTitle } from "../../../../utils/resources";
import withTurbotErrorHandlerConsumer from "../../../turbotErrorHandler/withTurbotErrorHandlerConsumer";

const transform = (data, onClick) => [
  {
    title: "Policy",
    ...(data.policyType && {
      breadcrumbs: [
        {
          title: "Detail",
          actionCmp: (
            <ActionFilterLink onClick={() => onClick(UI_URLS.POLICY)}>
              Policy details
            </ActionFilterLink>
          )
        },
        {
          title: "Type",
          filters: data.policyType.trunk.items.map(item => {
            return {
              label: getTitle(item),
              key: "policyType",
              value: item.turbot.id
            };
          })
        },
        {
          title: "Category",
          filters: data.policyType.category.trunk.items.map(item => {
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

class TurbotActivityPolicyActionMenuContainer extends Component {
  static propTypes = {
    policyId: PropTypes.string.isRequired,
    resourceId: PropTypes.string.isRequired,
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

  handleDetailsLinkClick = resourceType => {
    try {
      if (
        !this.state.data.resource ||
        !this.state.data.resource.turbot ||
        !this.state.data.resource.turbot.id
      )
        throw new Error("Missing resource ID");

      switch (resourceType) {
        case UI_URLS.POLICY:
          if (
            !this.state.data.policyType ||
            !this.state.data.policyType.turbot ||
            !this.state.data.policyType.turbot.id
          )
            throw new Error("Missing policyType ID");

          if (!this.state.data.policyType || !this.state.data.policyType.uri)
            throw new Error("Missing policyType uri");

          this.props.history.push(
            `${UI_URLS.POLICY}/typeUri/${encodeURIComponent(
              this.state.data.policyType.uri
            )}/resource/${this.state.data.resource.turbot.id}${
              this.props.location.search
            }`
          );
          return;

        case UI_URLS.RESOURCE:
          this.props.history.push(
            `${UI_URLS.RESOURCE}/${this.state.data.resource.turbot.id}${this.props.location.search}`
          );
          return;

        default:
          return;
      }
    } catch (e) {
      // TODO: log error
      console.info(e);
    }
  };

  handleLoadData = async () => {
    try {
      if (!this.props.policyId || !this.props.resourceId)
        throw new Error("Missing policy, resource ID");
      this.setProcessing(true);
      const { data } = await this.props.client.query({
        query: QUERY,
        variables: {
          policyTypeId: this.props.policyId,
          resourceId: this.props.resourceId
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

export default enhance(TurbotActivityPolicyActionMenuContainer);
