export const LogType = Object.freeze({
  EMERGENCY: "emergency",
  ALERT: "alert",
  CRITICAL: "critical",
  ERROR: "error",
  WARNING: "warning",
  NOTICE: "notice",
  INFO: "info",
  DEBUG: "debug"
});

export const logColor = theme => ({
  [LogType.EMERGENCY]: theme.palette.error.dark,
  [LogType.ALERT]: theme.palette.error.dark,
  [LogType.CRITICAL]: theme.palette.error.dark,
  [LogType.ERROR]: theme.palette.error.dark,
  [LogType.WARNING]: theme.palette.log.warning,
  [LogType.NOTICE]: theme.palette.log.notice,
  [LogType.INFO]: theme.palette.log.info,
  [LogType.DEBUG]: theme.palette.log.debug
});

export const logIcon = {
  [LogType.EMERGENCY]: ["fal", "skull"],
  [LogType.ALERT]: ["fal", "fire-extinguisher"],
  [LogType.CRITICAL]: ["fal", "heartbeat"],
  [LogType.ERROR]: ["fal", "exclamation-circle"],
  [LogType.WARNING]: ["fal", "exclamation-triangle"],
  [LogType.NOTICE]: ["fal", "bell"],
  [LogType.INFO]: ["fal", "info-circle"],
  [LogType.DEBUG]: ["fal", "bug"]
};
