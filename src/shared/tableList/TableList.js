import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import PropTypes from "prop-types";
import React from "react";
import withFilterContext from "../listFilter/hoc/withFilterContext";
import TurbotPaper from "../turbotPaper/TurbotPaper";
import TableHeader from "./tableHeader/TableHeader";
import TableListStyles from "./TableList.styles";
import TableListWrapper from "./tableListWrapper/TableListWrapper";

const propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.node.isRequired,
  headers: PropTypes.any,
  onAddFilter: PropTypes.func,
  filtersAsUrlQuery: PropTypes.string,
  tableFixed: PropTypes.bool,
  withLoadMore: PropTypes.bool
};

const TableList = ({
  classes,
  columnCount,
  headers,
  filtersAsUrlQuery,
  children,
  noItemsText,
  processingText,
  onAddFilter = () => {},
  style,
  tableFixed = false,
  noLoader = false,
  showFilterReset = true
}) => {
  const turbotPaperClasses = {
    root: classes.turbotPaper + "__root"
  };

  const tableStyles = {
    ...(tableFixed && { tableLayout: "fixed" })
  };

  return (
    <TurbotPaper style={style} classes={turbotPaperClasses}>
      <Table style={tableStyles}>
        {headers && (
          <TableHeader
            items={headers}
            filters={filtersAsUrlQuery}
            onSort={onAddFilter}
          />
        )}
        <TableBody>
          <TableListWrapper
            columnCount={columnCount}
            noLoader={noLoader}
            noItemsText={noItemsText}
            processingText={processingText}
            showFilterReset={showFilterReset}
          >
            {children}
          </TableListWrapper>
        </TableBody>
      </Table>
    </TurbotPaper>
  );
};

TableList.propTypes = propTypes;

export default withFilterContext(withStyles(TableListStyles)(TableList));
