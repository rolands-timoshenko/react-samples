import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";
import LeftNavbar from "../leftNavbar/LeftNavbarContainer";

export const withProtectedLayout = PageComponent => {
  const styles = theme => ({
    root: {
      flexGrow: 1,
      height: "100%",
      zIndex: 1,
      overflow: "hidden",
      position: "relative",
      display: "flex",
      width: "100%"
    }
  });
  class cmp extends Component {
    render() {
      const { classes, ...rest } = this.props;
      return (
        <div className={classes.root}>
          <LeftNavbar />
          <PageComponent {...rest} />
        </div>
      );
    }
  }

  return withStyles(styles)(cmp);
};
