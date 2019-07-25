import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import TableCellAction from "../../tableList/tableCellAction/TableCellAction";
import TableCellDatetime from "../../tableList/tableCellDatetime/TableCellDatetime";
import TableCellIcon from "../../tableList/tableCellIcon/TableCellIcon";
import TableCellText from "../../tableList/tableCellText/TableCellText";
import TableItemTitle from "../../tableList/tableItemTitle/TableItemTitle";
import TurbotActivityPolicyActionMenuContainer from "../turbotActivityPolicySettingRow/turbotActivityPolicyActionMenu/TurbotActivityPolicyActionMenuContainer";
import TurbotActivityRowContainer from "../turbotActivityRow/TurbotActivityRowContainer";
import TurbotActivityTitle from "../turbotActivityTitle/TurbotActivityTitle";
import TurbotActorWithRole from "../../../shared/turbotActorWithRole/TurbotActorWithRole";
import TurbotFunctionWrapper from "../../turbotFunctionWrapper/TurbotFunctionWrapper";
import TurbotIcon from "../../turbotIcon/TurbotIcon";
import TurbotPolicyValueNotificationContainer from "../../turbotNotification/turbotPolicyValueNotification/TurbotPolicyValueNotificationContainer";
import TurbotRelativeTime from "../../turbotRelativeTime/TurbotRelativeTime";
import TurbotTableCellTitle from "../../turbotTableCellTitle/TurbotTableCellTitle";
import TurbotTitle from "../../turbotTitle/TurbotTitle";
import { ActivityViewTypes } from "./../TurbotActivity.types";
import { getTitle } from "../../../utils/resources";
import {
  getPolicyType,
  isPrimitivePolicyType,
  SECRET
} from "../../../utils/policies";
import { NotificationTypes } from "../../../utils/notifications";
import {
  TypeActivityData,
  TypeActivityViewType
} from "../TurbotActivity.types";
import { withTheme, TableCell } from "@material-ui/core";

const propTypes = {
  viewType: TypeActivityViewType.isRequired,
  activity: TypeActivityData.isRequired
};

const getIconByState = theme => ({
  [NotificationTypes.POLICY_VALUE_CREATED]: {
    icon: ["fal", "map-marker-plus"],
    color: theme.palette.notification.created
  },
  [NotificationTypes.POLICY_VALUE_UPDATED]: {
    icon: ["fal", "map-marker-alt"],
    color: theme.palette.notification.updated
  },
  [NotificationTypes.POLICY_VALUE_DELETED]: {
    icon: ["fal", "map-marker-minus"],
    color: theme.palette.notification.deleted
  }
});

const getPolicyValue = (type, activity) => {
  switch (type) {
    case NotificationTypes.POLICY_VALUE_DELETED:
      return activity.oldPolicyValue;
    default:
      return activity.policyValue;
  }
};

const TurbotActivityPolicyValueRow = ({ theme, activity, viewType }) => {
  const icon = getIconByState(theme)[activity.notificationType];

  const getNotificationTitle = (policyType, type, value) => {
    const isPrimitive = isPrimitivePolicyType(policyType);
    const isPrimitiveString = getPolicyType(policyType) === "string";
    const showValue = isPrimitive || (isPrimitiveString && value.length <= 200);

    switch (type) {
      case NotificationTypes.POLICY_VALUE_CREATED:
        return (
          <Fragment>
            <TurbotActivityTitle>{getTitle(policyType)}</TurbotActivityTitle>{" "}
            set
            {showValue && (
              <Fragment>
                {" to "}
                <TurbotActivityTitle>
                  {value && policyType.secret ? SECRET : value}
                </TurbotActivityTitle>
              </Fragment>
            )}
          </Fragment>
        );

      case NotificationTypes.POLICY_VALUE_UPDATED:
        return (
          <Fragment>
            <TurbotActivityTitle>{getTitle(policyType)}</TurbotActivityTitle>{" "}
            changed
            {showValue && (
              <Fragment>
                {" to "}
                <TurbotActivityTitle>
                  {value && policyType.secret ? SECRET : value}
                </TurbotActivityTitle>
              </Fragment>
            )}
          </Fragment>
        );

      case NotificationTypes.POLICY_VALUE_DELETED:
        return (
          <Fragment>
            <TurbotActivityTitle>{getTitle(policyType)}</TurbotActivityTitle>{" "}
            deleted
          </Fragment>
        );

      default:
        return null;
    }
  };

  const cells = [];

  // Activity icon
  cells.push(
    <TableCellIcon style={{ width: 35 }}>
      <TurbotIcon icon={icon.icon} style={{ color: icon.color }} />
    </TableCellIcon>
  );

  const policyValue = getPolicyValue(activity.notificationType, activity);

  // Activity type title & breadcrumbs
  //TODO remove when activity list is built from history
  {
    !policyValue.type && cells.push(<TableCellText />);
  }
  {
    policyValue.type &&
      cells.push(
        <TurbotTableCellTitle>
          <TableItemTitle
            item={policyValue.type}
            title={
              <TurbotTitle>
                {getNotificationTitle(
                  policyValue.type,
                  activity.notificationType,
                  policyValue.value
                )}
              </TurbotTitle>
            }
            asLinks={false}
          />
        </TurbotTableCellTitle>
      );
  }

  // Activity title & breadcrumbs
  viewType !== ActivityViewTypes.SINGLE &&
    cells.push(
      <TurbotTableCellTitle>
        <TableItemTitle
          item={policyValue.resource}
          title={<TurbotTitle>{getTitle(policyValue.resource)}</TurbotTitle>}
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
      <TurbotActivityPolicyActionMenuContainer
        policyId={
          policyValue.type &&
          policyValue.type.turbot &&
          policyValue.type.turbot.id
        }
        resourceId={
          policyValue.resource &&
          policyValue.resource.turbot &&
          policyValue.resource.turbot.id
        }
      />
    </TableCellAction>
  );

  // TODO: enable when expansion component added
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
            <TurbotPolicyValueNotificationContainer
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

TurbotActivityPolicyValueRow.propTypes = propTypes;

export default withTheme()(TurbotActivityPolicyValueRow);
