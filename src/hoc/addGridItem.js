import React from "react";
import Grid from "@material-ui/core/Grid";

const addGridItem = grid => Component => props => (
  <Grid item xs={grid}>
    <Component {...props} />
  </Grid>
);

export default addGridItem;
