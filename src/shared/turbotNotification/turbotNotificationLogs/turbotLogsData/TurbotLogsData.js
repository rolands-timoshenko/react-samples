import React from "react";
import withTheme from "@material-ui/core/styles/withTheme";
import YAML from "js-yaml";

const codeBlock = theme => ({
  fontFamily: theme.typography.code.fontFamily,
  fontSize: "0.9em",
  maxHeight: "400px",
  overflow: "scroll"
});

const TurbotLogsData = ({ data, theme }) => {
  if (!data) {
    return null;
  }
  return (
    <pre>
      <code style={codeBlock(theme)}>{YAML.safeDump(data, { indent: 2 })}</code>
    </pre>
  );
};

export default withTheme()(TurbotLogsData);
