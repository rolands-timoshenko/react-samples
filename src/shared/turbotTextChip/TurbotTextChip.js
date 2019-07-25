import React from "react";
import withTheme from "@material-ui/core/styles/withTheme";

const TurbotTextChip = ({ style, text, theme }) => {
  return (
    <span
      style={{
        borderRadius: theme.shape.borderRadius,
        color: theme.palette.common.white,
        display: "inline-block",
        fontSize: theme.typography.label.fontSize,
        fontWeight: theme.typography.fontWeightMedium,
        padding: "4px 4px",
        textTransform: "uppercase",
        ...style
      }}
    >
      {text}
    </span>
  );
};

export default withTheme()(TurbotTextChip);
