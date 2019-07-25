// TODO: should be applied for every place where used control states key
export const ControlStates = Object.freeze({
  ALARM: "alarm",
  ERROR: "error",
  INVALID: "invalid",
  OK: "ok",
  SKIPPED: "skipped",
  TBD: "tbd"
});

export const controlStateChartData = (data, theme) => {
  return [
    {
      backgroundColor: theme.palette.error.light,
      borderColor: theme.palette.error.dark,
      icon: icon(ControlStates.ERROR),
      value: (data && data.error) || 0,
      iconColor: theme.palette.error.dark,
      label: "Errors",
      filter: "state:error"
    },
    {
      backgroundColor: theme.palette.error.dark,
      borderColor: theme.palette.error.dark,
      stroke: true,
      icon: icon(ControlStates.INVALID),
      value: (data && data.invalid) || 0,
      label: "Invalid",
      filter: "state:invalid"
    },
    {
      backgroundColor: theme.palette.error.dark,
      borderColor: theme.palette.error.dark,
      icon: icon(ControlStates.ALARM),
      value: (data && data.alarm) || 0,
      label: "Alarms",
      filter: "state:alarm"
    },
    {
      backgroundColor: theme.palette.green,
      borderColor: theme.palette.green,
      icon: icon(ControlStates.OK),
      value: (data && data.ok) || 0,
      label: "OK",
      filter: "state:ok"
    },
    {
      backgroundColor: theme.palette.grey["500"],
      borderColor: theme.palette.grey["500"],
      stroke: true,
      icon: icon(ControlStates.SKIPPED),
      value: (data && data.skipped) || 0,
      label: "Skipped",
      filter: "state:skipped"
    },
    {
      backgroundColor: theme.palette.grey["100"],
      borderColor: theme.palette.grey["500"],
      icon: icon(ControlStates.TBD),
      value: (data && data.tbd) || 0,
      iconColor: theme.palette.grey["500"],
      label: "TBD",
      filter: "state:tbd"
    }
  ];
};

export const colours = (state, theme) => {
  switch (state) {
    case ControlStates.ALARM:
      return {
        icon: theme.palette.error.dark,
        text: theme.palette.common.white,
        chip: theme.palette.error.main
      };
    case ControlStates.ERROR:
      return {
        icon: theme.palette.error.dark,
        text: theme.palette.common.white,
        chip: theme.palette.error.main
      };
    case ControlStates.INVALID:
      return {
        icon: theme.palette.error.dark,
        text: theme.palette.common.white,
        chip: theme.palette.error.main
      };
    case ControlStates.OK:
      return {
        icon: theme.palette.green,
        text: theme.palette.common.white,
        chip: theme.palette.green
      };
    case ControlStates.SKIPPED:
      return {
        icon: theme.palette.grey["500"],
        text: theme.palette.text.primary,
        chip: theme.palette.grey["300"]
      };
    case ControlStates.TBD:
      return {
        icon: theme.palette.grey["500"],
        text: theme.palette.text.primary,
        chip: theme.palette.grey["300"]
      };
    default:
      return {
        icon: theme.palette.grey["500"],
        text: theme.palette.text.primary,
        chip: theme.palette.grey["300"]
      };
  }
};

export const icon = state => {
  switch (state) {
    case ControlStates.ALARM:
      return ["fas", "times-circle"];
    case ControlStates.ERROR:
      return ["fas", "exclamation-circle"];
    case ControlStates.INVALID:
      return ["fas", "ban"];
    case ControlStates.OK:
      return ["fas", "check-circle"];
    case ControlStates.SKIPPED:
      return ["fas", "arrow-circle-right"];
    case ControlStates.TBD:
      return ["fal", "question-circle"];
    default:
      return ["fal", "question-circle"];
  }
};

export const label = state => {
  switch (state) {
    case ControlStates.ALARM:
      return "ALARM";
    case ControlStates.ERROR:
      return "ERROR";
    case ControlStates.INVALID:
      return "INVALID";
    case ControlStates.OK:
      return "OK";
    case ControlStates.SKIPPED:
      return "SKIPPED";
    case ControlStates.TBD:
      return "TBD";
    default:
      return "UNKNOWN";
  }
};
