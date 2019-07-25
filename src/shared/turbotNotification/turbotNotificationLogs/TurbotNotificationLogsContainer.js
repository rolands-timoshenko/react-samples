import PropTypes from "prop-types";
import React, { Component } from "react";
import { ListQueryContext } from "./../../../hoc/withScopeFilterListQuery";
import TurbotNotificationLogs from "./TurbotNotificationLogs";

const emptyData = [];
const mockData = [
  {
    level: "debug",
    message: "Process state: new.",
    data: {},
    turbot: {
      createTimestamp: "2019-04-07T22:50:18.818Z",
      __typename: "turbotProcessLogMetadata"
    },
    __typename: "processLog"
  },
  {
    level: "debug",
    message: "Current process instantiated",
    data: {
      state: "starting",
      logLevel: "notice",
      processId: "156310137734727"
    },
    turbot: {
      createTimestamp: "2019-04-07T22:50:18.915Z",
      __typename: "turbotProcessLogMetadata"
    },
    __typename: "processLog"
  },
  {
    level: "debug",
    message: "Message details",
    data: {
      meta: {
        tenantId: "parker.williamsburg.turbot.io",
        sqsMessageId: "fa2e7625-78b0-41a3-9235-b4ab0d200536",
        tenantSchema: "parker"
      }
    },
    turbot: {
      createTimestamp: "2019-04-07T22:50:18.915Z",
      __typename: "turbotProcessLogMetadata"
    },
    __typename: "processLog"
  },
  {
    level: "debug",
    message: "Current process instantiated",
    data: {
      state: "starting",
      logLevel: "notice",
      processId: "156310137734727"
    },
    turbot: {
      createTimestamp: "2019-04-07T22:50:21.405Z",
      __typename: "turbotProcessLogMetadata"
    },
    __typename: "processLog"
  },
  {
    level: "debug",
    message: "Message details",
    data: {
      meta: {
        pid: "156310137734727",
        tenantId: "parker.williamsburg.turbot.io",
        controlId: "156310137014820",
        processId: "156310137734727",
        resourceId: "156310137002524",
        snsMessageId: "ab9ce8e8-1dd0-537e-a74c-bdcc9d3b7fe2",
        sqsMessageId: "b16149fd-c977-4137-87b5-ab56212f0ac3",
        tenantSchema: "parker"
      }
    },
    turbot: {
      createTimestamp: "2019-04-07T22:50:21.405Z",
      __typename: "turbotProcessLogMetadata"
    },
    __typename: "processLog"
  },
  {
    level: "debug",
    message: "Process state: starting to running.",
    data: {},
    turbot: {
      createTimestamp: "2019-04-07T22:50:23.419Z",
      __typename: "turbotProcessLogMetadata"
    },
    __typename: "processLog"
  },
  {
    level: "debug",
    message: "Process state: running to handling.",
    data: {},
    turbot: {
      createTimestamp: "2019-04-07T22:50:23.500Z",
      __typename: "turbotProcessLogMetadata"
    },
    __typename: "processLog"
  },
  {
    level: "debug",
    message: "Process state: handling to running.",
    data: {},
    turbot: {
      createTimestamp: "2019-04-07T22:50:23.536Z",
      __typename: "turbotProcessLogMetadata"
    },
    __typename: "processLog"
  },
  {
    level: "debug",
    message: "Process state: running to handling.",
    data: {},
    turbot: {
      createTimestamp: "2019-04-07T22:50:25.693Z",
      __typename: "turbotProcessLogMetadata"
    },
    __typename: "processLog"
  },
  {
    level: "info",
    message:
      "Upsert resource #/resource/types/serviceAccountKey with parent: 156310137002524.",
    data: {
      gcp: {
        projectId: "cody-179817"
      },
      name:
        "projects/cody-179817/serviceAccounts/cody-179817@appspot.gserviceaccount.com/keys/1123feffa7624e4f4760027a4e0ee3c8158a23ff",
      title: "1123feffa7624e4f4760027a4e0ee3c8158a23ff",
      keyAlgorithm: "KEY_ALG_RSA_2048",
      validAfterTime: "2019-04-01T16:01:17Z",
      validBeforeTime: "2019-04-18T16:01:17Z"
    },
    turbot: {
      createTimestamp: "2019-04-07T22:50:24.677Z",
      __typename: "turbotProcessLogMetadata"
    },
    __typename: "processLog"
  },
  {
    level: "info",
    message: "Update control state: ok.",
    data: {
      state: "ok",
      timestamp: "2019-04-07T22:50:24.677Z"
    },
    turbot: {
      createTimestamp: "2019-04-07T22:50:24.677Z",
      __typename: "turbotProcessLogMetadata"
    },
    __typename: "processLog"
  },
  {
    level: "debug",
    message: "Process state: handling to terminated.",
    data: {},
    turbot: {
      createTimestamp: "2019-04-07T22:50:31.161Z",
      __typename: "turbotProcessLogMetadata"
    },
    __typename: "processLog"
  },
  {
    level: "debug",
    message: "Process state: terminated to terminated.",
    data: {},
    turbot: {
      createTimestamp: "2019-04-07T22:50:31.161Z",
      __typename: "turbotProcessLogMetadata"
    },
    __typename: "processLog"
  },
  {
    level: "info",
    message: "Terraform will perform the following actions:",
    data: {},
    turbot: {
      createTimestamp: "2019-04-07T22:50:31.161Z",
      __typename: "turbotProcessLogMetadata"
    },
    __typename: "processLog"
  },
  {
    level: "info",
    message: "  + google_project_iam_member.project",
    data: {},
    turbot: {
      createTimestamp: "2019-04-07T22:50:31.161Z",
      __typename: "turbotProcessLogMetadata"
    },
    __typename: "processLog"
  },
  {
    level: "info",
    message: "    id:    <computed>",
    data: {},
    turbot: {
      createTimestamp: "2019-04-07T22:50:31.161Z",
      __typename: "turbotProcessLogMetadata"
    },
    __typename: "processLog"
  }
];

class TurbotNotificationLogsContainer extends Component {
  static contextType = ListQueryContext;

  static propTypes = {
    processId: PropTypes.string,
    list: PropTypes.array.isRequired,
    onLoad: PropTypes.func,
    filter: PropTypes.string,
    onFilterSelect: PropTypes.func,
    filters: PropTypes.array
  };

  get isProcessing() {
    return this.props.list.length < 1 && this.context.processing;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.filter !== this.props.filter) {
      this.handleLoadMore(true);
    }
  }

  handleLoadMore = (reload = false) => {
    //If we don't have a process ID, don't try to load
    if (!this.props.processId) {
      return;
    }
    const variables = {
      filter: [`process:${this.props.processId}`, this.props.filter]
    };
    this.props.onLoad(variables, reload);
  };

  handleFilterSelect = () => {
    this.props.onFilterSelect(this.props.filters[0]);
  };

  componentDidMount() {
    this.handleLoadMore(true);
  }

  render() {
    return (
      <TurbotNotificationLogs
        list={this.props.list}
        filter={this.props.filter}
        onLoadMore={this.handleLoadMore}
        processing={this.isProcessing}
        onDefaultFilterSelect={this.handleFilterSelect}
      />
    );
  }
}

export default TurbotNotificationLogsContainer;
