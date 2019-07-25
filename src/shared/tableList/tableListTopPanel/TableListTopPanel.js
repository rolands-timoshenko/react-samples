import React from "react";
import Grid from "@material-ui/core/Grid";
import TableListTopPanelStyles from "./TableListTopPanel.styles";
import withStyles from "@material-ui/core/styles/withStyles";

const TableListTopPanel = ({ children, classes }) => {
  return (
    <Grid classes={{ container: classes.container }} container>
      {children}
    </Grid>
  );
};

export default withStyles(TableListTopPanelStyles)(TableListTopPanel);
