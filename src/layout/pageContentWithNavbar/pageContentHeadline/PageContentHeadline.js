import React from "react";
import { Typography, withStyles } from "@material-ui/core";
import PageContentHeadlineStyles from "./PageContentHeadline.styles";

const PageContentHeadline = ({ classes, children }) => {
  return (
    <Typography classes={classes} variant="h5">
      {children}
    </Typography>
  );
};

export default withStyles(PageContentHeadlineStyles)(PageContentHeadline);
