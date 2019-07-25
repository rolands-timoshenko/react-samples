import React from "react";
import PropTypes from "prop-types";
import YAML from "js-yaml";
import TurbotDiff from "../../turbotDiff/TurbotDiff";
import { withStyles } from "@material-ui/core";
import TurbotResourceDiffStyles from "./TurbotResourceDiff.styles";

const propTypes = {
  current: PropTypes.object.isRequired,
  previous: PropTypes.object.isRequired
};

const TurbotResourceDiff = ({ classes, current, previous, style }) => {
  const curr = YAML.safeDump(current, { indent: 2, sortKeys: true });
  const prev = YAML.safeDump(previous, { indent: 2, sortKeys: true });
  return (
    <div style={style} className={classes.root}>
      <TurbotDiff curr={curr} prev={prev} />
    </div>
  );
};

TurbotResourceDiff.propTypes = propTypes;

export default withStyles(TurbotResourceDiffStyles)(TurbotResourceDiff);
