import React, { Fragment } from "react";
import HorizontalStackedBarChart from "../../shared/horizontalStackedBarChart/HorizontalStackedBarChart";
import Typography from "@material-ui/core/Typography";
import withTheme from "@material-ui/core/styles/withTheme";
import { controlStateChartData } from "../../utils/controls";
import { TurbotNumberFormatter } from "../../utils/utils";

const getAlertTotal = data => {
  if (!data) {
    return 0;
  }
  return parseInt(data.error + data.invalid + data.alarm);
};

const getNonAlertTotal = data => {
  if (!data) {
    return 0;
  }
  return parseInt(data.ok + data.skipped + data.tbd);
};

const ControlStatusHorizontalStackedBarChart = ({
  data,
  showLabels = false,
  onClick,
  theme
}) => {
  const alertTotal = getAlertTotal(data);
  const nonAlertTotal = getNonAlertTotal(data);

  return (
    <Fragment>
      <HorizontalStackedBarChart
        data={controlStateChartData(data, theme)}
        showLabels={showLabels}
        style={{ marginBottom: "0.3em" }}
        barStyles={{ height: "0.7rem" }}
        onClick={onClick}
      />
      <div
        style={{
          display: "flex",
          justifyContent:
            alertTotal > 0 && nonAlertTotal === 0
              ? "flex-start"
              : alertTotal === 0 && nonAlertTotal > 0
              ? "flex-end"
              : "space-between"
        }}
      >
        {alertTotal > 0 && (
          <Typography
            variant="caption"
            style={{ color: theme.palette.error.main, lineHeight: "normal" }}
          >
            {TurbotNumberFormatter(alertTotal)}
          </Typography>
        )}
        {nonAlertTotal > 0 && (
          <Typography
            variant="caption"
            style={{ color: theme.palette.grey["600"], lineHeight: "normal" }}
          >
            {TurbotNumberFormatter(nonAlertTotal)}
          </Typography>
        )}
      </div>
    </Fragment>
  );
};

export default withTheme()(ControlStatusHorizontalStackedBarChart);
