import { Typography } from "@material-ui/core";
import moment from "moment";
import React from "react";
import PropTypes from "prop-types";
import TurbotProcessStepNote from "../../turbotProcessStepNote/TurbotProcessStepNote";
import TurbotIcon from "../../turbotIcon/TurbotIcon";
import ProcessAbortButton from "../processAbortButton/ProcessAbortButton";
import TurbotTimeFormat from "../../turbotTimeFormat/TurbotTimeFormat";
import withTheme from "@material-ui/core/styles/withTheme";

const propTypes = {
  currState: PropTypes.string,
  state: PropTypes.string.isRequired,
  onAbort: PropTypes.func
};

const timeSinceOpen = stateInfo => {
  const now = moment();
  const open = moment(stateInfo.open);
  const seconds = now.diff(open, "seconds");
  if (seconds > 60) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const t = [`${minutes} ${getAsPlural(minutes, "min")}`];
    if (remainderSeconds > 0)
      t.push(`${remainderSeconds} ${getAsPlural(remainderSeconds, "sec")}`);
    return t.join(" ");
  } else {
    return `${seconds} ${getAsPlural(seconds, "sec")}`;
  }
};

const getAsPlural = (number, text) => {
  return number > 1 ? `${text}s` : text;
};

const ProcessNote = ({ currState, onAbort, state, stateInfo, theme }) => {
  const notes = [];
  if (stateInfo && !stateInfo.close && currState === state) {
    notes.push(
      <TurbotProcessStepNote key={`${state}-open-since`}>
        <Typography variant={"caption"}>
          <TurbotIcon
            icon={["far", "stopwatch"]}
            style={{ color: theme.palette.secondary.main }}
          />
          &nbsp;&nbsp;{stateInfo && timeSinceOpen(stateInfo)}
        </Typography>
        {/*<ProcessAbortButton onClick={onAbort} />*/}
      </TurbotProcessStepNote>
    );
  } else if (stateInfo && stateInfo.close) {
    notes.push(
      <TurbotProcessStepNote key={`${state}-close-since`}>
        <Typography variant={"caption"}>
          <TurbotIcon icon={["fas", "arrow-alt-to-right"]} />
          &nbsp;&nbsp;
          <TurbotTimeFormat
            format={"MMM DD, YYYY HH:mm:ss"}
            timestamp={stateInfo.close}
          />
        </Typography>
      </TurbotProcessStepNote>
    );
  }
  return notes;
};

ProcessNote.propTypes = propTypes;

export default withTheme()(ProcessNote);
