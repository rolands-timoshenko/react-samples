import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

export const withPublicLayout = PageComponent => {
  const styles = theme => ({
    root: {
      flexGrow: 1,
      height: "100%",
      zIndex: 1,
      overflow: "hidden",
      position: "relative",
      display: "flex",
      width: "100%"
    },
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing.unit * 3,
      paddingTop: theme.overrides.MuiToolbar.root.minHeight
    }
  });
  class cmp extends Component {
    render() {
      const { classes, ...rest } = this.props;
      return (
        <div className={classes.root}>
          <main className={classes.content}>
            <PageComponent {...rest} />
          </main>
        </div>
      );
    }
  }

  return withStyles(styles)(cmp);
};
