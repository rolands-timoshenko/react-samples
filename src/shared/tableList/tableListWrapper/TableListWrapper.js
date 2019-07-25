import React, { Fragment } from "react";
import PropTypes from "prop-types";
import TableRowProcessing from "../tableRowProcessing/TableRowProcessing";
import TableRowEmpty from "../tableRowEmpty/TableRowEmpty";
import TableRowError from "../tableRowError/TableRowError";
import withListQueryContext from "../hoc/withListQueryContext";

const propTypes = {
  listCount: PropTypes.number,
  processing: PropTypes.bool.isRequired,
  error: PropTypes.any
};

const TableListWrapper = ({
  columnCount,
  listCount,
  processing,
  loading,
  error,
  noItemsText,
  processingText,
  showFilterReset,
  noLoader = false,
  children
}) => {
  return (
    <Fragment>
      {children}
      {!error && !processing && listCount < 1 && (
        <TableRowEmpty
          colSpan={columnCount}
          noItemsText={noItemsText}
          showFilterReset={showFilterReset}
        />
      )}
      {loading === null && processing && !noLoader && (
        <TableRowProcessing
          colSpan={columnCount}
          processingText={processingText}
        />
      )}
      {loading && !noLoader && (
        <TableRowProcessing
          colSpan={columnCount}
          processingText={processingText}
        />
      )}
      {!processing && error && (
        <TableRowError colSpan={columnCount} error={error} />
      )}
    </Fragment>
  );
};

TableListWrapper.propTypes = propTypes;

export default withListQueryContext(TableListWrapper);
