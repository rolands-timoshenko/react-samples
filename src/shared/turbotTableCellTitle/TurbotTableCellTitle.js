import { withStyles } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import React, { useEffect } from "react";
import TurbotTableCellTitleStyles from "./TurbotTableCellTitle.styles";

const TurbotTableCellTitle = ({ classes, children, style, ...rest }) => {
  let container = React.createRef();
  let content = React.createRef();

  useEffect(() => {
    const contentHeight = content.current.clientHeight;
    container.current.style.height = `${contentHeight}px`;
  });

  const mergedStyles = {
    padding: "0.8rem",
    verticalAlign: "top",
    ...style
  };

  return (
    <TableCell {...rest} style={mergedStyles}>
      <div ref={container} className={classes.container}>
        <div ref={content} className={classes.content}>
          {children}
        </div>
      </div>
    </TableCell>
  );
};

export default withStyles(TurbotTableCellTitleStyles)(TurbotTableCellTitle);
