import Menu from "@material-ui/core/Menu";
import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core";
import TurbotMenuStyles from "./TurbotMenu.styles";

const propTypes = {};

const TurbotMenu = props => {
  const { classes, ...propsWithoutClasses } = props;
  const { menuList__root, ...trimmedClasses } = classes;
  return (
    <Menu
      {...trimmedClasses}
      MenuListProps={{
        classes: {
          root: menuList__root
        }
      }}
      {...propsWithoutClasses}
    >
      {propsWithoutClasses.children}
    </Menu>
  );
};

TurbotMenu.propTypes = propTypes;

export default withStyles(TurbotMenuStyles)(TurbotMenu);
