import React from "react";
import NavbarTabUrlGenerator from "../../shared/navbarTabUrlGenerator/NavbarTabUrlGenerator";
import TurbotLogoWrapper from "../turbotLogoWrapper/TurbotLogoWrapper";
import TurbotAppBarStyles from "./TurbotAppBar.styles";
import TurbotAppBarActionsContainer from "./turbotAppBarActions/TurbotAppBarActionsContainer";
import TurbotAppBarSearchContainer from "./turbotAppBarSearch/TurbotAppBarSearchContainer";
import withStyles from "@material-ui/core/styles/withStyles";
import "./TurbotAppBar.scss";

const TurbotAppBar = ({ classes, withLogoContainer }) => {
  return (
    <div className={classes.root}>
      {withLogoContainer && <TurbotLogoWrapper fixed={300} />}
      <div
        className={withLogoContainer ? classes.appBarWithLogo : classes.appBar}
      >
        <div className={classes.rightContainer}>
          <NavbarTabUrlGenerator>
            <TurbotAppBarSearchContainer />
          </NavbarTabUrlGenerator>
          <TurbotAppBarActionsContainer />
        </div>
      </div>
    </div>
  );
};

export default withStyles(TurbotAppBarStyles)(TurbotAppBar);
