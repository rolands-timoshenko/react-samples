import React from "react";
import PropTypes from "prop-types";
import RowTableItem from "../../tableList/rowTableItem/RowTableItem";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TurbotInfinityScroll from "../../turbotInfinityScroll/TurbotInfinityScroll";
import TurbotLoader from "../../turbotLoader/TurbotLoader";
import TurbotLogsTime from "./turbotLogsTime/TurbotLogsTime";
import TurbotLogsIcon from "./turbotLogsIcon/TurbotLogsIcon";
import TurbotLogsMessageContainer from "./turbotLogsMessage/TurbotLogsMessageContainer";
import TurbotNotificationLogsStyles from "./TurbotNotificationLogs.styles";
import { ListQueryContext } from "./../../../hoc/withScopeFilterListQuery";
import { withStyles } from "@material-ui/core";
import { withTheme } from "@material-ui/core/styles";

const propTypes = {
  list: PropTypes.array.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  onDefaultFilterSelect: PropTypes.func,
  processing: PropTypes.bool
};

const hasGoodData = log => {
  return !!log.turbot && !!log.level && !!log.message;
};

const preserveMsgSpacing = msg => {
  let result = msg;

  // safely handles HTML-like characters, due to rendering requirements
  result = result.replace(/&/g, "&amp;");
  result = result.replace(/>/g, "&gt;");
  result = result.replace(/</g, "&lt;");

  // handles spacing
  result = result.replace(/\s/g, "&nbsp;");

  return result;
};

const TurbotNotificationLogs = ({
  classes,
  list,
  theme,
  filter,
  onLoadMore,
  onDefaultFilterSelect,
  processing = false
}) => {
  const renderTime = log => {
    return (
      <TurbotLogsTime type={log.level} timestamp={log.turbot.createTimestamp} />
    );
  };

  const renderIcon = log => {
    return <TurbotLogsIcon type={log.level} />;
  };

  const renderMessage = log => {
    return (
      <TurbotLogsMessageContainer
        message={preserveMsgSpacing(log.message)}
        data={log.data}
        type={log.level}
      />
    );
  };

  const renderLoader = () => {
    return (
      <div
        style={{
          padding: 10,
          width: "100%",
          display: "flex",
          justifyContent: "center"
        }}
      >
        <TurbotLoader />
      </div>
    );
  };

  const renderNoLogs = () => {
    const zeroLogs =
      (!Array.isArray(list) || !list.length) && filter.includes("debug");

    if (onDefaultFilterSelect)
      return (
        <div className={classes.noLogs}>
          No Logs.{" "}
          {!zeroLogs && (
            <React.Fragment>
              Switch to{" "}
              <span onClick={() => onDefaultFilterSelect()}>debug level</span>.
            </React.Fragment>
          )}
        </div>
      );
    else return <>No Logs.</>;
  };

  const renderEmptyMessage = () => {
    return (
      <ListQueryContext.Consumer>
        {({ error }) => {
          // If no error, show link for switching to debug level
          const message = error ? error : renderNoLogs();
          return <TurbotLogsMessageContainer message={message} type="debug" />;
        }}
      </ListQueryContext.Consumer>
    );
  };

  const renderList = () => {
    return (
      <TurbotInfinityScroll onLoadMore={onLoadMore}>
        <Table style={{ marginBottom: "3rem" }}>
          <TableBody>
            {!list.length && (
              <RowTableItem
                cellSizes={["80px", "40px", "auto"]}
                cellStyle={{
                  padding: ".75rem",
                  verticalAlign: "top",
                  fontSize: theme.typography.body2.fontSize,
                  fontFamily: theme.typography.code.fontFamily,
                  borderBottom: "none"
                }}
                keys={[renderEmptyMessage]}
                hover={false}
              />
            )}
            {!!list.length &&
              list
                .filter(log => hasGoodData(log))
                .map((row, index) => (
                  <RowTableItem
                    cellSizes={["80px", "40px", "auto"]}
                    cellStyle={{
                      padding: "7px 10px",
                      verticalAlign: "top",
                      fontSize: theme.typography.body2.fontSize,
                      fontFamily: theme.typography.code.fontFamily
                    }}
                    key={index}
                    item={row}
                    bottomBorder={false}
                    keys={[renderTime, renderIcon, renderMessage]}
                    hover={false}
                  />
                ))}
          </TableBody>
        </Table>
      </TurbotInfinityScroll>
    );
  };

  return (
    <div className={classes.root}>
      {processing ? renderLoader() : renderList()}
    </div>
  );
};

TurbotNotificationLogs.propTypes = propTypes;

export default withTheme()(
  withStyles(TurbotNotificationLogsStyles)(TurbotNotificationLogs)
);
