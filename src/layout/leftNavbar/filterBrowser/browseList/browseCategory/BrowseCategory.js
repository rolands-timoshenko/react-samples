import React from "react";
import ListItem from "@material-ui/core/ListItem";
import PropTypes from "prop-types";
import BrowseCategoryStyles from "./BrowseCategory.styles";
import { withStyles } from "@material-ui/core";

const propTypes = {
  category: PropTypes.string.isRequired
};

const BrowseCategory = ({ classes, category }) => {
  return (
    <ListItem classes={classes} key={category}>
      {category}
    </ListItem>
  );
};

BrowseCategory.propTypes = propTypes;

export default withStyles(BrowseCategoryStyles)(BrowseCategory);
