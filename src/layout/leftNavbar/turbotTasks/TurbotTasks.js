import React from "react";
import TurbotTasksStyles from "./TurbotTasks.styles";
import TurbotIcon from "../../../shared/turbotIcon/TurbotIcon";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import { UI_URLS } from "../../../config/urls";

const TurbotTasks = ({ classes, taskCount }) => {
  return (
    <Link className={classes.link} to={UI_URLS.TASKS}>
      <Typography className={classes.subtitle1} variant="subtitle1">
        <TurbotIcon icon={["fas", "flag"]} />
        &nbsp;&nbsp;
        {taskCount} Tasks
      </Typography>
    </Link>
  );
};

export default withStyles(TurbotTasksStyles)(TurbotTasks);
