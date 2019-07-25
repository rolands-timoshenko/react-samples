import React from "react";
import PropTypes from "prop-types";
import * as Diff from "diff";
import { withStyles } from "@material-ui/core";
import TurbotDiffStyles from "./TurbotDiff.styles";
import TurbotDiffAdd from "./turbotDiffAdd/TurbotDiffAdd";
import TurbotDiffDel from "./turbotDiffDel/TurbotDiffDel";

const propTypes = {
  curr: PropTypes.string.isRequired,
  prev: PropTypes.string.isRequired
};

const TurbotDiff = ({ classes, curr, prev }) => {
  const diff = Diff.diffLines(prev, curr);

  const render = () => {
    return diff.map((part, index) => {
      if (part.added)
        return <TurbotDiffAdd key={index}>{part.value}</TurbotDiffAdd>;

      if (part.removed)
        return <TurbotDiffDel key={index}>{part.value}</TurbotDiffDel>;

      return part.value;
    });
  };

  return <pre className={classes.root}>{render()}</pre>;
};

TurbotDiff.propTypes = propTypes;

export default withStyles(TurbotDiffStyles)(TurbotDiff);
