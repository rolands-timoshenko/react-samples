import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableCellAction from "../../tableList/tableCellAction/TableCellAction";
import TableCellDatetime from "../../tableList/tableCellDatetime/TableCellDatetime";
import TableCellIcon from "../../tableList/tableCellIcon/TableCellIcon";
import TableItemTitle from "../../tableList/tableItemTitle/TableItemTitle";
import TurbotActivityControlActionMenuContainer from "./turbotActivityControlActionMenu/TurbotActivityControlActionMenuContainer";
import TurbotActivityRowContainer from "../turbotActivityRow/TurbotActivityRowContainer";
import TurbotActorWithRole from "../../../shared/turbotActorWithRole/TurbotActorWithRole";
import TurbotIcon from "../../turbotIcon/TurbotIcon";
import TurbotControlNotificationContainer from "../../turbotNotification/turbotControlNotification/TurbotControlNotificationContainer";
import TurbotFunctionWrapper from "../../turbotFunctionWrapper/TurbotFunctionWrapper";
import TurbotNotificationIcon from "../../turbotNotification/turbotNotificationIcon/TurbotNotificationIcon";
import TurbotNotificationTitleForControl from "../../turbotNotification/turbotNotificationTitle/turbotNotificationTitleForControl/TurbotNotificationTitleForControl";
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

const TurbotActivityControlRow = ({ activity, viewType }) => {
  const cells = [];

  const control =
    activity.notificationType === NotificationTypes.CONTROL_DELETED
      ? activity.oldControl
      : activity.control;

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
        item={control.type}
        title={
          <TurbotTitle>
            <TurbotNotificationTitleForControl
              state={activity.control && activity.control.state}
              oldState={activity.oldControl && activity.oldControl.state}
              type={activity.notificationType}
              reason={control.reason}
              controlType={getTitle(control.type)}
            />
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
          item={control.resource}
          title={<TurbotTitle>{getTitle(control.resource)}</TurbotTitle>}
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
      <TurbotActivityControlActionMenuContainer controlId={control.turbot.id} />
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
          <TurbotControlNotificationContainer
            processId={activity.turbot.processId}
          />
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

TurbotActivityControlRow.propTypes = propTypes;

export default TurbotActivityControlRow;
