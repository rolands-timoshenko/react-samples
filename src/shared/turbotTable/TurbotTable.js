import Table from "@material-ui/core/Table";
import React from "react";

const TurbotTable = ({ children, ...props }) => {
  return <Table {...props}>{children}</Table>;
};

export default TurbotTable;
