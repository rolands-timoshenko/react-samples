const TurbotChipStyles = (theme, rgbColor, invert) => {
  const getBackgroundColor = () => {
    if (invert) return "white";
    if (rgbColor) return `rgba(${rgbColor}, 0.8)`;
    return theme.palette.grey["500"];
  };

  const getBorderColor = () => {
    if (rgbColor) return `rgba(${rgbColor}, 1)`;
    return theme.palette.grey["500"];
  };

  const getColor = () => {
    if (invert) return `rgba(${rgbColor}, 1)`;
    return "white";
  };

  return {
    container: {
      backgroundColor: getBackgroundColor(),
      color: getColor(),
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: getBorderColor(),
      padding: 0,
      display: "inline-flex",
      alignItems: "stretch",
      borderRadius: theme.shape.borderRadius
    },
    action: {
      borderLeftWidth: 1,
      borderLeftStyle: "solid",
      borderLeftColor: getBorderColor(),
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: getBorderColor(),
        color: "white"
      },
      "& > *": {
        display: "block",
        padding: "3px 5px"
      }
    },
    label: {
      padding: "3px 5px"
    }
  };
};

export default TurbotChipStyles;
