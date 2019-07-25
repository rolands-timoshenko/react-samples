import PropTypes from "prop-types";
import React from "react";
import TableList from "../../tableList/TableList";
import TurbotActivityRowByType from "../turbotActivityRowByType/TurbotActivityRowByType";
import { TypeActivityViewType } from "./../TurbotActivity.types";
import { ActivityViewTypes } from "../TurbotActivity.types";

const TypeActivityList = PropTypes.shape({
  data: PropTypes.any.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
});

const propTypes = {
  list: PropTypes.arrayOf(TypeActivityList),
  viewType: TypeActivityViewType.isRequired
};

const getColumnCount = viewType => {
  if (
    viewType === ActivityViewTypes.ACTOR ||
    viewType === ActivityViewTypes.SINGLE
  ) {
    return 5;
  }
  return 6;
};

const TurbotActivityList = ({ list, viewType }) => {
  return (
    <TableList
      columnCount={getColumnCount(viewType)}
      tableFixed
      style={{ border: "none", borderRadius: 0, width: "100%" }}
    >
      {list.map(row => (
        <TurbotActivityRowByType
          viewType={viewType}
          key={row.id}
          activity={row.data}
          type={row.type}
        />
      ))}
    </TableList>
  );
};

TurbotActivityList.propTypes = propTypes;

export default TurbotActivityList;
