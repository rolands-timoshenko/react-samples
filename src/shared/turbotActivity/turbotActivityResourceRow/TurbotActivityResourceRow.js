import React, { Fragment } from "react";
import TableCell from "@material-ui/core/TableCell";
import TableCellAction from "../../tableList/tableCellAction/TableCellAction";
import TableCellDatetime from "../../tableList/tableCellDatetime/TableCellDatetime";
import TableCellIcon from "../../tableList/tableCellIcon/TableCellIcon";
import TableItemTitle from "../../tableList/tableItemTitle/TableItemTitle";
import TurbotActivityResourceActionMenuContainer from "./turbotActivityResouceActionMenu/TurbotActivityResourceActionMenuContainer";
import TurbotActivityRowContainer from "../turbotActivityRow/TurbotActivityRowContainer";
import TurbotActivityTitle from "../turbotActivityTitle/TurbotActivityTitle";
import TurbotActorWithRole from "../../../shared/turbotActorWithRole/TurbotActorWithRole";
import TurbotFunctionWrapper from "../../turbotFunctionWrapper/TurbotFunctionWrapper";
import TurbotIcon from "../../turbotIcon/TurbotIcon";
import TurbotRelativeTime from "../../turbotRelativeTime/TurbotRelativeTime";
import TurbotResourceNotificationContainer from "../../turbotNotification/turbotResourceNotification/TurbotResourceNotificationContainer";
import TurbotTableCellTitle from "../../turbotTableCellTitle/TurbotTableCellTitle";
import TurbotTitle from "../../turbotTitle/TurbotTitle";
import Typography from "@material-ui/core/Typography";
import {
  TypeActivityData,
  TypeActivityViewType
} from "../TurbotActivity.types";
import { ActivityViewTypes } from "./../TurbotActivity.types";
import { getTitle } from "../../../utils/resources";
import { NotificationTypes } from "./../../../utils/notifications";
import { withTheme } from "@material-ui/core";

const propTypes = {
  viewType: TypeActivityViewType.isRequired,
  activity: TypeActivityData.isRequired
};

const getIconByState = theme => ({
  [NotificationTypes.RESOURCE_CREATED]: {
    icon: ["fas", "plus-square"],
    color: theme.palette.notification.created
  },
  [NotificationTypes.RESOURCE_UPDATED]: {
    icon: ["fas", "arrow-square-up"],
    color: theme.palette.notification.updated
  },
  [NotificationTypes.RESOURCE_DELETED]: {
    icon: ["fas", "minus-square"],
    color: theme.palette.notification.deleted
  }
});

const TurbotActivityResourceRow = ({ theme, activity, viewType }) => {
  const icon = getIconByState(theme)[activity.notificationType];

  const getNotificationTitle = (title, type) => {
    switch (type) {
      case NotificationTypes.RESOURCE_CREATED:
        return (
          <Fragment>
            <TurbotActivityTitle>{title}</TurbotActivityTitle> created
          </Fragment>
        );

      case NotificationTypes.RESOURCE_UPDATED:
        return (
          <Fragment>
            <TurbotActivityTitle>{title}</TurbotActivityTitle> updated
          </Fragment>
        );

      case NotificationTypes.RESOURCE_DELETED:
        return (
          <Fragment>
            <TurbotActivityTitle>{title}</TurbotActivityTitle> deleted
          </Fragment>
        );

      default:
        return null;
    }
  };

  const cells = [];

  const resource =
    activity.notificationType === NotificationTypes.RESOURCE_DELETED
      ? activity.oldResource
      : activity.resource;

  // Activity icon
  cells.push(
    <TableCellIcon style={{ width: 35 }} fit={false}>
      <TurbotIcon icon={icon.icon} style={{ color: icon.color }} />
    </TableCellIcon>
  );

  // Activity type title & breadcrumbs
  cells.push(
    <TurbotTableCellTitle>
      <TableItemTitle
        item={resource.type}
        title={
          <TurbotTitle>
            {getNotificationTitle(
              getTitle(resource.type),
              activity.notificationType
            )}
          </TurbotTitle>
        }
        asLinks={false}
      />
    </TurbotTableCellTitle>
  );

  // Activity title & breadcrumbs
  viewType !== ActivityViewTypes.SINGLE &&
    cells.push(
      <TurbotTableCellTitle>
        <TableItemTitle
          item={resource}
          title={<TurbotTitle>{getTitle(resource)}</TurbotTitle>}
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
        resourceId={resource.turbot.id}
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
          <div>
            <TurbotResourceNotificationContainer
              notificationId={activity.turbot.id}
              processId={activity.turbot.processId}
              type={activity.notificationType}
            />
          </div>
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

TurbotActivityResourceRow.propTypes = propTypes;

export default withTheme()(TurbotActivityResourceRow);
