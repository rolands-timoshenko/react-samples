import React, { Fragment } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableCellAction from "../../tableList/tableCellAction/TableCellAction";
import TableCellDatetime from "../../tableList/tableCellDatetime/TableCellDatetime";
import TableCellIcon from "../../tableList/tableCellIcon/TableCellIcon";
import TableItemTitle from "../../tableList/tableItemTitle/TableItemTitle";
import TurbotActivityResourceActionMenuContainer from "../turbotActivityResourceRow/turbotActivityResouceActionMenu/TurbotActivityResourceActionMenuContainer";
import TurbotActivityRowContainer from "../turbotActivityRow/TurbotActivityRowContainer";
import TurbotActivityTitle from "../turbotActivityTitle/TurbotActivityTitle";
import TurbotActorWithRole from "../../../shared/turbotActorWithRole/TurbotActorWithRole";
import TurbotFunctionWrapper from "../../turbotFunctionWrapper/TurbotFunctionWrapper";
import TurbotIcon from "../../turbotIcon/TurbotIcon";
import TurbotNotificationIcon from "../../turbotNotification/turbotNotificationIcon/TurbotNotificationIcon";
import TurbotNotifyNotificationContainer from "../../turbotNotification/turbotNotifyNotification/TurbotNotifyNotificationContainer";
import TurbotRelativeTime from "../../turbotRelativeTime/TurbotRelativeTime";
import TurbotTableCellTitle from "../../turbotTableCellTitle/TurbotTableCellTitle";
import TurbotTitle from "../../turbotTitle/TurbotTitle";
import Typography from "@material-ui/core/Typography";
import { ActivityViewTypes } from "./../TurbotActivity.types";
import { getTitle } from "../../../utils/resources";
import { NotificationTypes } from "../../../utils/notifications";
import {
  TypeActivityData,
  TypeActivityViewType
} from "../TurbotActivity.types";

const propTypes = {
  viewType: TypeActivityViewType.isRequired,
  activity: TypeActivityData.isRequired
};

const getNotifyTitle = (title, type) => {
  switch (type) {
    case NotificationTypes.ACTION_NOTIFY:
    case NotificationTypes.CONTROL_NOTIFY:
    case NotificationTypes.POLICY_NOTIFY:
      return (
        <Fragment>
          <TurbotActivityTitle>{title}</TurbotActivityTitle>
        </Fragment>
      );
    default:
      return null;
  }
};

const TurbotActivityNotifyRow = ({ activity, viewType }) => {
  const cells = [];

  // Activity icon
  cells.push(
    <TableCellIcon style={{ width: 35 }}>
      <TurbotNotificationIcon notification={activity} />
    </TableCellIcon>
  );

  // Activity type title & breadcrumbs
  cells.push(
    <TurbotTableCellTitle>
      <TableItemTitle
        title={
          <TurbotTitle>
            {getNotifyTitle(activity.message, activity.notificationType)}
          </TurbotTitle>
        }
        asLinks={false}
        withBreadcrumbs={false}
      />
    </TurbotTableCellTitle>
  );

  // Activity title & breadcrumbs
  viewType !== ActivityViewTypes.SINGLE &&
    cells.push(
      <TurbotTableCellTitle>
        <TableItemTitle
          item={activity.resource}
          title={
            activity.resource && (
              <TurbotTitle>{getTitle(activity.resource)}</TurbotTitle>
            )
          }
          asLinks={false}
        />
      </TurbotTableCellTitle>
    );

  // Activity actor & time
  viewType !== ActivityViewTypes.ACTOR &&
    cells.push(
      <TableCellDatetime
        style={{ width: 50 }}
        avatar={<TurbotActorWithRole actor={activity.actor} />}
      >
        <TurbotRelativeTime
          timestamp={activity.turbot.createTimestamp}
          highlightSecs={0}
        />
      </TableCellDatetime>
    );

  // Action menu
  cells.push(
    <TableCellAction style={{ width: 30, paddingTop: 6, textAlign: "center" }}>
      <TurbotActivityResourceActionMenuContainer
        withDetails={false}
        resourceId={activity.resource.turbot.id}
      />
    </TableCellAction>
  );

  cells.push(
    <TurbotFunctionWrapper>
      {({ expanded }) => (
        <TableCell
          style={{
            width: 30,
            padding: "10px 0px 0 0px",
            verticalAlign: "top",
            textAlign: "center"
          }}
        >
          <Typography variant={"body2"}>
            {expanded ? (
              <TurbotIcon icon={["fal", "angle-up"]} />
            ) : (
              <TurbotIcon icon={["fal", "angle-down"]} />
            )}
          </Typography>
        </TableCell>
      )}
    </TurbotFunctionWrapper>
  );

  return (
    <TurbotActivityRowContainer
      cmp={
        <TableCell style={{ padding: 0 }} colSpan={cells.length}>
          {activity.turbot.processId ? (
            <TurbotNotifyNotificationContainer
              notification={activity}
              processId={activity.turbot.processId}
            />
          ) : (
            "Missing process ID"
          )}
        </TableCell>
      }
    >
      {({ expanded }) => {
        return cells.map((cell, index) => {
          if (cell.type === TurbotFunctionWrapper)
            return React.cloneElement(cell, { key: index, expanded: expanded });
          return React.cloneElement(cell, { key: index });
        });
      }}
    </TurbotActivityRowContainer>
  );
};

TurbotActivityNotifyRow.propTypes = propTypes;

export default TurbotActivityNotifyRow;
