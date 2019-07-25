import { compose } from "redux";
import React, { Component } from "react";
import gql from "graphql-tag";
import ProcessNote from "./processNote/ProcessNote";
import PropTypes from "prop-types";
import TurbotIcon from "../turbotIcon/TurbotIcon";
import TurbotProcessStep from "../turbotProcessStep/TurbotProcessStep";
import TurbotProcessStepper from "./TurbotProcessStepper";
import TurbotProcessStepConnector from "../turbotProcessStepConnector/TurbotProcessStepConnector";
import withClient from "../../hoc/withClient";
import { ProcessStepStatuses } from "./../turbotProcessStep/TurbotProcessStep";
import withTurbotErrorHandlerConsumer from "../turbotErrorHandler/withTurbotErrorHandlerConsumer";

export const ProcessStates = Object.freeze({
  STARTING: "starting",
  RUNNING: "running",
  HANDLING: "handling",
  TERMINATED: "terminated"
});

const PROCESS_HISTORY = gql`
  query ProcessHistory($filter: [String!]) {
    processHistory(filter: $filter) {
      items {
        state
        turbot {
          id
          versionOpenTimestamp
          versionCloseTimestamp
        }
      }
    }
  }
`;

class TurbotProcessStepperContainer extends Component {
  static propTypes = {
    processId: PropTypes.string.isRequired,
    onStateUpdate: PropTypes.func,
    isHistoryMode: PropTypes.bool
  };

  state = {
    states: {
      [ProcessStates.STARTING]: null,
      [ProcessStates.RUNNING]: null,
      [ProcessStates.HANDLING]: null,
      [ProcessStates.TERMINATED]: null
    },
    currentState: null
  };

  componentDidMount() {
    if (!this.props.processId) throw new Error("Missing process id");
    this.pollingProcessStateById(this.props.processId);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  findEntry = (processHistory, processState) => {
    return processHistory.find(entry => entry.state === processState);
  };

  findLastEntry = (processHistory, processState) => {
    let lastEntry,
      index = processHistory.length - 1;
    for (index; index >= 0; index--) {
      if (processHistory[index].state === processState) {
        lastEntry = processHistory[index];
        break;
      }
    }
    return lastEntry;
  };

  getInfoFromEntry = entry => {
    return {
      open: entry.turbot.versionOpenTimestamp,
      close: entry.turbot.versionCloseTimestamp
    };
  };

  parseResults = processHistory => {
    if (!processHistory || processHistory.length === 0) {
      return null;
    }
    const currentState = processHistory[0].state;
    const startingEntry = this.findEntry(
      processHistory,
      ProcessStates.STARTING
    );
    const lastRunningEntry = this.findLastEntry(
      processHistory,
      ProcessStates.RUNNING
    );
    const lastHandlingEntry = this.findLastEntry(
      processHistory,
      ProcessStates.HANDLING
    );
    const terminatedEntry = this.findEntry(
      processHistory,
      ProcessStates.TERMINATED
    );

    const states = { ...this.state.states };
    if (startingEntry) {
      states[ProcessStates.STARTING] = this.getInfoFromEntry(startingEntry);
    }
    if (lastRunningEntry) {
      states[ProcessStates.RUNNING] = this.getInfoFromEntry(lastRunningEntry);
    }
    if (lastHandlingEntry) {
      states[ProcessStates.HANDLING] = this.getInfoFromEntry(lastHandlingEntry);
    }
    if (terminatedEntry) {
      states[ProcessStates.TERMINATED] = this.getInfoFromEntry(terminatedEntry);
    }

    return {
      currentState,
      states
    };
  };

  getProcessHistory = async processId => {
    try {
      const { data, errors } = await this.props.client.query({
        fetchPolicy: "no-cache",
        query: PROCESS_HISTORY,
        variables: {
          filter: `process:${processId} sort:-versionOpenTimestamp limit:100`
        }
      });
      if (errors) {
        return null;
      }
      return this.parseResults(
        data && data.processHistory ? data.processHistory.items : null
      );
    } catch (err) {
      return null;
    }
  };

  pollingProcessStateById = async processId => {
    const processHistory = await this.getProcessHistory(processId);
    if (!processHistory) {
      return;
    }
    this.setState(processHistory);
    if (processHistory.currentState === ProcessStates.TERMINATED) {
      return;
    }
    if (this.props.isHistoryMode) return;
    this.timeout = setTimeout(
      () => this.pollingProcessStateById(processId),
      2000
    );
  };

  handleAbort = () => {
    // TODO: abort of process
  };

  getProcessStepStatus = (stepStatus, stepOrder) => {
    if (this.state.currentState === stepStatus)
      return ProcessStepStatuses.ACTIVE;
    const activeIndex = stepOrder.findIndex(
      item => item === this.state.currentState
    );
    const currIndex = stepOrder.findIndex(item => item === stepStatus);
    if (activeIndex > currIndex) return ProcessStepStatuses.COMPLETED;
    else return ProcessStepStatuses.QUEUE;
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentState !== this.state.currentState) {
      this.props.onStateUpdate &&
        this.props.onStateUpdate(this.state.currentState);
    }
  }

  render() {
    const stepOrder = [
      ProcessStates.STARTING,
      ProcessStates.HANDLING,
      ProcessStates.RUNNING,
      ProcessStates.TERMINATED
    ];
    return (
      <TurbotProcessStepper>
        <TurbotProcessStep
          title={"Starting"}
          status={this.getProcessStepStatus(ProcessStates.STARTING, stepOrder)}
          icon={<TurbotIcon icon={["fas", "arrow-alt-from-left"]} />}
          notes={
            <ProcessNote
              currState={this.state.currentState}
              state={ProcessStates.STARTING}
              stateInfo={this.state.states[ProcessStates.STARTING]}
              onAbort={this.handleAbort}
            />
          }
        />
        <TurbotProcessStepConnector directions={["right"]} />
        <TurbotProcessStep
          title={"Running"}
          status={this.getProcessStepStatus(ProcessStates.RUNNING, stepOrder)}
          icon={<TurbotIcon icon={["fas", "running"]} />}
          notes={
            <ProcessNote
              currState={this.state.currentState}
              state={ProcessStates.RUNNING}
              stateInfo={this.state.states[ProcessStates.RUNNING]}
              onAbort={this.handleAbort}
            />
          }
        />
        <TurbotProcessStepConnector directions={["right", "left"]} />
        <TurbotProcessStep
          title={"Handling"}
          status={this.getProcessStepStatus(ProcessStates.HANDLING, stepOrder)}
          icon={<TurbotIcon icon={["fas", "person-carry"]} />}
          notes={
            <ProcessNote
              currState={this.state.currentState}
              state={ProcessStates.HANDLING}
              stateInfo={this.state.states[ProcessStates.HANDLING]}
              onAbort={this.handleAbort}
            />
          }
        />
        <TurbotProcessStepConnector directions={["right"]} />
        <TurbotProcessStep
          title={"Terminated"}
          status={this.getProcessStepStatus(
            ProcessStates.TERMINATED,
            stepOrder
          )}
          icon={<TurbotIcon icon={["fas", "arrow-alt-to-right"]} />}
          notes={
            <ProcessNote
              currState={this.state.currentState}
              state={ProcessStates.TERMINATED}
              stateInfo={this.state.states[ProcessStates.TERMINATED]}
            />
          }
        />
      </TurbotProcessStepper>
    );
  }
}

const enhance = compose(
  withTurbotErrorHandlerConsumer,
  withClient
);

export default enhance(TurbotProcessStepperContainer);
