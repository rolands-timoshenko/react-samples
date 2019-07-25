import PropTypes from "prop-types";
import React, { Component } from "react";
import TurbotNotification, {
  TypeTurbotNotification
} from "./TurbotNotification";

class TurbotNotificationContainer extends Component {
  static propTypes = {
    notification: TypeTurbotNotification.isRequired,
    defaultExpanded: PropTypes.bool
  };

  static defaultProps = {
    defaultExpanded: false
  };

  state = {
    expanded: false
  };

  handleExpanded = expanded => {
    this.setState({ expanded: expanded });
  };

  renderChildren = (children, props) => {
    return React.isValidElement(children)
      ? React.cloneElement(children, { ...props })
      : children({ ...props });
  };

  render() {
    const { expanded } = this.state;
    const { notification, defaultExpanded, children } = this.props;
    return (
      <TurbotNotification
        isExpanded={expanded}
        notification={notification}
        onChange={this.handleExpanded}
        defaultExpanded={defaultExpanded}
      >
        {this.renderChildren(children, { notification: notification })}
      </TurbotNotification>
    );
  }
}

export default TurbotNotificationContainer;
