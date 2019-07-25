import React, { Fragment } from "react";
import TableCellAction from "../../tableList/tableCellAction/TableCellAction";
import TableCellDatetime from "../../tableList/tableCellDatetime/TableCellDatetime";
import TableCellIcon from "../../tableList/tableCellIcon/TableCellIcon";
import TableCellText from "../../tableList/tableCellText/TableCellText";
import TableItemTitle from "../../tableList/tableItemTitle/TableItemTitle";
import TurbotActivityPolicyActionMenuContainer from "./turbotActivityPolicyActionMenu/TurbotActivityPolicyActionMenuContainer";
import TurbotActivityRowContainer from "../turbotActivityRow/TurbotActivityRowContainer";
import TurbotActivityTitle from "../turbotActivityTitle/TurbotActivityTitle";
import TurbotActorWithRole from "../../../shared/turbotActorWithRole/TurbotActorWithRole";
import TurbotFunctionWrapper from "../../turbotFunctionWrapper/TurbotFunctionWrapper";
import TurbotIcon from "../../turbotIcon/TurbotIcon";
import TurbotPolicySettingNotificationContainer from "../../turbotNotification/turbotPolicySettingNotification/TurbotPolicySettingNotificationContainer";
import TurbotRelativeTime from "../../turbotRelativeTime/TurbotRelativeTime";
import TurbotTableCellTitle from "../../turbotTableCellTitle/TurbotTableCellTitle";
import TurbotTitle from "../../turbotTitle/TurbotTitle";
import Typography from "@material-ui/core/Typography";
import { ActivityViewTypes } from "./../TurbotActivity.types";
import { getTitle } from "../../../utils/resources";
import { isNull } from "util";
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
  [NotificationTypes.POLICY_SETTING_CREATED]: {
    icon: ["fas", "map-marker-plus"],
    color: theme.palette.notification.created
  },
  [NotificationTypes.POLICY_SETTING_DELETED]: {
    icon: ["fas", "map-marker-minus"],
    color: theme.palette.notification.deleted
  },
  [NotificationTypes.POLICY_SETTING_UPDATED]: {
    icon: ["fas", "map-marker-alt"],
    color: theme.palette.notification.updated
  }
});

const getPolicySetting = (type, activity) => {
  switch (type) {
    case NotificationTypes.POLICY_SETTING_DELETED:
      return activity.oldPolicySetting;
    default:
      return activity.policySetting;
  }
};

const TurbotActivityPolicySettingRow = ({ theme, activity, viewType }) => {
  const icon = getIconByState(theme)[activity.notificationType];

  const getNotificationTitle = (policyType, type, value) => {
    const isPrimitive = isPrimitivePolicyType(policyType);
    const isPrimitiveString = getPolicyType(policyType) === "string";
    let showValue = isPrimitive || (isPrimitiveString && value.length <= 200);
    switch (type) {
      case NotificationTypes.POLICY_SETTING_CREATED:
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

      case NotificationTypes.POLICY_SETTING_UPDATED:
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

      case NotificationTypes.POLICY_SETTING_DELETED:
        return (
          <Fragment>
            <TurbotActivityTitle>{getTitle(policyType)}</TurbotActivityTitle>{" "}
            deleted
          </Fragment>
        );

      default:
        return isNull;
    }
  };

  const cells = [];

  // Activity icon
  cells.push(
    <TableCellIcon style={{ width: 35 }}>
      <TurbotIcon icon={icon.icon} style={{ color: icon.color }} />
    </TableCellIcon>
  );

  const policySetting = getPolicySetting(activity.notificationType, activity);

  // Activity type title & breadcrumbs
  //TODO remove when activity list is built from history
  {
    !policySetting.type && cells.push(<TableCellText />);
  }
  {
    policySetting.type &&
      cells.push(
        <TurbotTableCellTitle>
          <TableItemTitle
            item={policySetting.type}
            title={
              <TurbotTitle>
                {getNotificationTitle(
                  policySetting.type,
                  activity.notificationType,
                  policySetting.value
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
          item={policySetting.resource}
          title={<TurbotTitle>{getTitle(policySetting.resource)}</TurbotTitle>}
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
          policySetting.type &&
          policySetting.type.turbot &&
          policySetting.type.turbot.id
        }
        resourceId={
          policySetting.resource &&
          policySetting.resource.turbot &&
          policySetting.resource.turbot.id
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
            <TurbotPolicySettingNotificationContainer
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

TurbotActivityPolicySettingRow.propTypes = propTypes;

export default withTheme()(TurbotActivityPolicySettingRow);
