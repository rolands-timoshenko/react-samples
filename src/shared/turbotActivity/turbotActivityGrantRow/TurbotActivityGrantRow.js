import React, { Fragment } from "react";
import PermissionTitle from "../../permissionTitle/PermissionTitle";
import TableCell from "@material-ui/core/TableCell";
import TableCellAction from "../../tableList/tableCellAction/TableCellAction";
import TableCellDatetime from "../../tableList/tableCellDatetime/TableCellDatetime";
import TableCellIcon from "../../tableList/tableCellIcon/TableCellIcon";
import TableItemTitle from "../../tableList/tableItemTitle/TableItemTitle";
import TurbotActivityGrantActionMenuContainer from "./turbotActivityGrantActionMenu/TurbotActivityGrantActionMenuContainer";
import TurbotActivityRowContainer from "../turbotActivityRow/TurbotActivityRowContainer";
import TurbotActivityTitle from "../turbotActivityTitle/TurbotActivityTitle";
import TurbotActorWithRole from "../../turbotActorWithRole/TurbotActorWithRole";
import TurbotFunctionWrapper from "../../turbotFunctionWrapper/TurbotFunctionWrapper";
import TurbotGrantNotificationContainer from "../../turbotNotification/turbotGrantNotification/TurbotGrantNotificationContainer";
import TurbotIcon from "../../turbotIcon/TurbotIcon";
import TurbotRelativeTime from "../../turbotRelativeTime/TurbotRelativeTime";
import TurbotTableCellTitle from "../../turbotTableCellTitle/TurbotTableCellTitle";
import TurbotTitle from "../../turbotTitle/TurbotTitle";
import Typography from "@material-ui/core/Typography";
import { ActivityViewTypes } from "../TurbotActivity.types";
import { getTitle } from "../../../utils/resources";
import { NotificationTypes } from "../../../utils/notifications";
import {
  TypeActivityData,
  TypeActivityViewType
} from "../TurbotActivity.types";
import { withTheme } from "@material-ui/core";

const propTypes = {
  viewType: TypeActivityViewType.isRequired,
  activity: TypeActivityData.isRequired
};

const getIconByState = theme => ({
  [NotificationTypes.GRANT_CREATED]: {
    icon: ["fas", "plus-circle"],
    color: theme.palette.notification.created
  },
  [NotificationTypes.GRANT_UPDATED]: {
    icon: ["fas", "arrow-circle-up"],
    color: theme.palette.notification.updated
  },
  [NotificationTypes.GRANT_DELETED]: {
    icon: ["fas", "minus-circle"],
    color: theme.palette.notification.deleted
  }
});

const TurbotActivityGrantRow = ({ theme, activity, viewType }) => {
  const canExpand = activity => {
    return activity.turbot.id && activity.turbot.processId;
  };

  const icon = getIconByState(theme)[activity.notificationType];

  const getNotificationTitle = (grant, type) => {
    switch (type) {
      case NotificationTypes.GRANT_CREATED:
        return (
          <Fragment>
            <TurbotActivityTitle>
              <PermissionTitle type={grant.type} level={grant.level} />
            </TurbotActivityTitle>{" "}
            granted to&nbsp;
            <TurbotActivityTitle>
              {getTitle(grant.identity)}
            </TurbotActivityTitle>
          </Fragment>
        );

      case NotificationTypes.GRANT_UPDATED:
        return (
          <Fragment>
            <TurbotActivityTitle>
              <PermissionTitle type={grant.type} level={grant.level} />
            </TurbotActivityTitle>{" "}
            grant updated for&nbsp;
            <TurbotActivityTitle>
              {getTitle(grant.identity)}
            </TurbotActivityTitle>
          </Fragment>
        );

      case NotificationTypes.GRANT_DELETED:
        return (
          <Fragment>
            <TurbotActivityTitle>
              <PermissionTitle type={grant.type} level={grant.level} />
            </TurbotActivityTitle>{" "}
            deleted from&nbsp;
            <TurbotActivityTitle>
              {getTitle(grant.identity)}
            </TurbotActivityTitle>
          </Fragment>
        );

      default:
        return null;
    }
  };

  const cells = [];

  // FIXME: #869 get grant
  const grant =
    activity.notificationType === NotificationTypes.GRANT_DELETED
      ? activity.oldGrant
      : activity.grant;

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
        item={grant.identity}
        title={
          <TurbotTitle>
            {getNotificationTitle(grant, activity.notificationType)}
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
          item={grant.resource.type}
          title={<TurbotTitle>{getTitle(grant.resource)}</TurbotTitle>}
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
      <TurbotActivityGrantActionMenuContainer grantId={grant.turbot.id} />
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
          {canExpand(activity) && (
            <Typography variant={"body2"}>
              {expanded ? (
                <TurbotIcon icon={["fal", "angle-up"]} />
              ) : (
                <TurbotIcon icon={["fal", "angle-down"]} />
              )}
            </Typography>
          )}
        </TableCell>
      )}
    </TurbotFunctionWrapper>
  );

  return (
    <TurbotActivityRowContainer
      canExpand={canExpand(activity)}
      cmp={
        <TableCell style={{ padding: 0 }} colSpan={cells.length}>
          <div>
            <TurbotGrantNotificationContainer
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

TurbotActivityGrantRow.propTypes = propTypes;

export default withTheme()(TurbotActivityGrantRow);
