import PropTypes from "prop-types";
import React from "react";
import TurbotAppBar from "../../layout/turbotAppBar/TurbotAppBar";
import { LeftNavbarContext } from "./../leftNavbar/LeftNavbarContextWrapper";

class SiteContainer extends React.Component {
  static contextType = LeftNavbarContext;

  static propTypes = {
    withLeftNavbar: PropTypes.bool
  };

  static defaultProps = {
    withLeftNavbar: true
  };

  componentDidMount() {
    if (this.context.setVisibility) {
      const { withLeftNavbar } = this.props;
      this.context.setVisibility(withLeftNavbar);
    }
  }

  render() {
    const { children, withLeftNavbar } = this.props;
    return (
      <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <TurbotAppBar withLogoContainer={!withLeftNavbar} />
        {children}
      </div>
    );
  }
}
export default SiteContainer;
