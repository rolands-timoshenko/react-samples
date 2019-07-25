import React from "react";
import PropTypes from "prop-types";
import TurbotButton from "../turbotButton2/TurbotButton";
import withTheme from "@material-ui/core/styles/withTheme";

const SmartFoldersNavigationButton = ({ onClick, theme }) => {
  return (
    <TurbotButton
      onClick={onClick}
      style={{
        borderColor: theme.palette.divider,
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightMedium,
        marginLeft: theme.spacing.unit * 2
      }}
      variant="outline-light"
    >
      Smart Folders
    </TurbotButton>
  );
};

SmartFoldersNavigationButton.propTypes = {
  onClick: PropTypes.func
};

export default withTheme()(SmartFoldersNavigationButton);
