import React from "react";
import Typography from "@material-ui/core/Typography";
import "./SubpageHeading.scss";

const SubpageHeading = ({ children, heading }) => {
  return (
    <div className="Subpage-heading">
      <Typography
        classes={{ root: "Subpage-heading__typography" }}
        variant="h5"
        gutterBottom
      >
        {heading}
      </Typography>
      <div className="Subpage-heading__actions">{children}</div>
    </div>
  );
};

export default SubpageHeading;
