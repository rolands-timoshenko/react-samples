import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import React from "react";
import TurbotLogoWrapper from "../turbotLogoWrapper/TurbotLogoWrapper";
import FiltersContainer from "./filters/FiltersContainer";
import LeftNavbarStyles from "./LeftNavbar.styles";
import TurbotDrawerContainer from "./turbotDrawer/TurbotDrawerContainer";

const propTypes = {
  onItemClick: PropTypes.func.isRequired,
  profile: PropTypes.string.isRequired
};

const LeftNavbar = ({ classes, selected, profile, onItemClick }) => {
  return (
    <TurbotDrawerContainer draggable>
      <TurbotLogoWrapper />
      <FiltersContainer />
    </TurbotDrawerContainer>
  );
};

LeftNavbar.propTypes = propTypes;

export default withStyles(LeftNavbarStyles)(LeftNavbar);
