import RootRef from "@material-ui/core/RootRef";
import React, { Fragment } from "react";
import ReactResizeDetector from "react-resize-detector";

class TurbotTableWidthDetectorContainer extends React.Component {
  state = {
    tableWidth: 0
  };

  constructor(props) {
    super(props);
    this.tableRef = React.createRef();
  }

  findNewTableWidth = () => {
    this.setState({
      tableWidth: this.tableRef.current.clientWidth
    });
  };

  render() {
    const { children } = this.props;
    return (
      <Fragment>
        <ReactResizeDetector handleWidth onResize={this.findNewTableWidth} />
        <RootRef rootRef={this.tableRef}>
          {React.cloneElement(children, {
            tableWidth: this.state.tableWidth
          })}
        </RootRef>
      </Fragment>
    );
  }
}

export default TurbotTableWidthDetectorContainer;
