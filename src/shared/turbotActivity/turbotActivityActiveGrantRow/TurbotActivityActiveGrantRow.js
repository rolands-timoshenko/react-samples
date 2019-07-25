import { withTheme } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import Typography from "@material-ui/core/Typography";
import React, { Fragment } from "react";
import { NotificationTypes } from "../../../utils/notifications";
import { getTitle } from "../../../utils/resources";
import PermissionTitle from "../../permissionTitle/PermissionTitle";
import TableCellAction from "../../tableList/tableCellAction/TableCellAction";
import TableCellDatetime from "../../tableList/tableCellDatetime/TableCellDatetime";
import TableCellIcon from "../../tableList/tableCellIcon/TableCellIcon";
import TableItemTitle from "../../tableList/tableItemTitle/TableItemTitle";
import TurbotActorWithRole from "../../turbotActorWithRole/TurbotActorWithRole";
import TurbotFunctionWrapper from "../../turbotFunctionWrapper/TurbotFunctionWrapper";
import TurbotIcon from "../../turbotIcon/TurbotIcon";
import TurbotActiveGrantNotificationContainer from "../../turbotNotification/turbotActiveGrantNotification/TurbotActiveGrantNotificationContainer";
import TurbotRelativeTime from "../../turbotRelativeTime/TurbotRelativeTime";
import TurbotTableCellTitle from "../../turbotTableCellTitle/TurbotTableCellTitle";
import TurbotTitle from "../../turbotTitle/TurbotTitle";
import {
  ActivityViewTypes,
  TypeActivityData,
  TypeActivityViewType
} from "../TurbotActivity.types";
import TurbotActivityRowContainer from "../turbotActivityRow/TurbotActivityRowContainer";
import TurbotActivityTitle from "../turbotActivityTitle/TurbotActivityTitle";
import TurbotActivityActiveGrantActionMenuContainer from "./turbotActivityActiveGrantActionMenu/TurbotActivityActiveGrantActionMenuContainer";

const propTypes = {
  viewType: TypeActivityViewType.isRequired,
  activity: TypeActivityData.isRequired
};

const getIconByState = theme => ({
  [NotificationTypes.ACTIVE_GRANT_CREATED]: {
    icon: ["fal", "play-circle"],
    color: theme.palette.notification.created
  },
  [NotificationTypes.ACTIVE_GRANT_DELETED]: {
    icon: ["fal", "pause-circle"],
    color: theme.palette.notification.deleted
  }
});

const TurbotActivityActiveGrantRow = ({ theme, activity, viewType }) => {
  const canExpand = activity => {
    return activity.turbot.id && activity.turbot.processId;
  };

  const icon = getIconByState(theme)[activity.notificationType];

  const getNotificationTitle = (grant, type) => {
    switch (type) {
      case NotificationTypes.ACTIVE_GRANT_CREATED:
        return (
          <Fragment>
            <TurbotActivityTitle>
              <PermissionTitle type={grant.type} level={grant.level} />
            </TurbotActivityTitle>
            &nbsp;activated for&nbsp;
            <TurbotActivityTitle>
              {getTitle(grant.identity)}
            </TurbotActivityTitle>
          </Fragment>
        );

      case NotificationTypes.ACTIVE_GRANT_DELETED:
        return (
          <Fragment>
            <TurbotActivityTitle>
              <PermissionTitle type={grant.type} level={grant.level} />
            </TurbotActivityTitle>
            &nbsp;deactivated from&nbsp;
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

  const grant =
    activity.notificationType === NotificationTypes.ACTIVE_GRANT_DELETED
      ? activity.oldActiveGrant.grant
      : activity.activeGrant.grant;

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
      <TurbotActivityActiveGrantActionMenuContainer grantId={grant.turbot.id} />
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
            <TurbotActiveGrantNotificationContainer
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

TurbotActivityActiveGrantRow.propTypes = propTypes;

export default withTheme()(TurbotActivityActiveGrantRow);
