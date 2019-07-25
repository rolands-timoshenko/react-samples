import React from "react";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import SectionHeader from "./sectionHeader/SectionHeader";
import ContentSectionStyles from "./ContentSection.styles";
import TurbotSectionHeader from "../../../../shared/turbotSectionHeader/TurbotSectionHeader";
import { Divider } from "@material-ui/core";

const propTypes = {
  title: PropTypes.string
};

const ContentSection = ({
  title,
  gridSize,
  actions,
  classes,
  style,
  horizontalRule = false,
  children
}) => {
  let conditionalStyle;
  if (!horizontalRule)
    conditionalStyle = {
      marginBottom: "0.75rem"
    };
  return (
    <Grid item {...gridSize} style={{ marginBottom: "0.75rem", ...style }}>
      <div style={conditionalStyle} className={classes.content}>
        {title && (
          <TurbotSectionHeader
            title={title}
            style={{ marginTop: "0.5rem", ...style }}
          />
        )}
        {actions}
      </div>
      {horizontalRule && <Divider classes={{ root: classes.horizontalRule }} />}
      {children}
    </Grid>
  );
};

ContentSection.propTypes = propTypes;

export default withStyles(ContentSectionStyles)(ContentSection);
