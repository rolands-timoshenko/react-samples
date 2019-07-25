import { icon } from "../../utils/controls";

export const chartData = (data, theme, turbotId) => {
  return [
    [
      {
        backgroundColor: theme.palette.error.dark,
        borderColor: theme.palette.error.dark,
        value: data && data.alarm ? data.alarm : 0,
        icon: icon("alarm"),
        iconColor: theme.palette.error.dark,
        label: "Alarms",
        filter: "state:alarm",
        turbotId: turbotId
      },
      {
        backgroundColor: theme.palette.error.dark,
        borderColor: theme.palette.error.dark,
        stroke: true,
        value: data && data.invalid ? data.invalid : 0,
        icon: icon("invalid"),
        iconColor: theme.palette.error.dark,
        label: "Invalid",
        filter: "state:invalid",
        turbotId: turbotId
      },
      {
        backgroundColor: theme.palette.error.light,
        borderColor: theme.palette.error.dark,
        value: data && data.error ? data.error : 0,
        icon: icon("error"),
        iconColor: theme.palette.error.dark,
        label: "Errors",
        filter: "state:error",
        turbotId: turbotId
      }
    ],
    [
      {
        backgroundColor: theme.palette.green,
        borderColor: theme.palette.green,
        value: data && data.ok ? data.ok : 0,
        icon: icon("ok"),
        iconColor: theme.palette.green,
        label: "OK",
        filter: "state:ok",
        turbotId: turbotId
      },
      {
        backgroundColor: theme.palette.grey["500"],
        borderColor: theme.palette.grey["500"],
        stroke: true,
        value: data && data.skipped ? data.skipped : 0,
        icon: icon("skipped"),
        iconColor: theme.palette.grey["500"],
        label: "Skipped",
        filter: "state:skipped",
        turbotId: turbotId
      },
      {
        backgroundColor: theme.palette.grey["100"],
        borderColor: theme.palette.grey["500"],
        value: data && data.tbd ? data.tbd : 0,
        icon: icon("tbd"),
        iconColor: theme.palette.grey["500"],
        label: "TBD",
        filter: "state:tbd",
        turbotId: turbotId
      }
    ]
  ];
};
