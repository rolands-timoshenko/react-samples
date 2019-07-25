import { getTitle } from "./../../utils/resources";
import { Typography } from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";

const propTypes = {};

const TurbotListBreadcrumbs = ({ resource }) => {
  breadcrumbs =
    resource &&
    resource.trunk &&
    resource.trunk.items &&
    resource.trunk.items.length > 1
      ? resource.trunk.items
          .slice(0, resource.trunk.items.length - 1)
          .map(trunk => ({
            label: getTitle(trunk) || trunk.turbot.id,
            value: trunk.turbot.id
          }))
      : null;

  return (
    <Typography
      variant="caption"
      noWrap={true}
      style={{
        direction: "rtl",
        marginLeft: "-4px",
        paddingLeft: "4px"
      }}
    >
      <TurbotBreadcrumbs links={asLinks} breadcrumbs={breadcrumbs} />
    </Typography>
  );
};

TurbotListBreadcrumbs.propTypes = propTypes;

export default TurbotListBreadcrumbs;
