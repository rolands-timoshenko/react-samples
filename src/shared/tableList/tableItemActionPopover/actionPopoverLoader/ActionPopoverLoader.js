import { withStyles } from "@material-ui/core";
import React from "react";
import ActionPopoverLoaderStyles from "./ActionPopoverLoader.styles";
import TurbotLoader from "../../../turbotLoader/TurbotLoader";

const ActionPopoverLoader = ({ classes }) => {
  return (
    <div className={classes.root}>
      <TurbotLoader inline />
    </div>
  );
};

export default withStyles(ActionPopoverLoaderStyles)(ActionPopoverLoader);
