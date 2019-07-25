import { Typography } from "@material-ui/core";
import { storiesOf } from "@storybook/react";
import React from "react";
import TurbotModal from "../turbotModal/TurbotModal";
import TurbotModalContent from "../turbotModal/TurbotModalContent";
import TurbotModalTitle from "../turbotModal/TurbotModalTitle";
import TurbotChip from "./TurbotChip";
import TurbotChipAction from "./TurbotChipAction";

const TestDialog = ({ onClose }) => {
  return (
    <TurbotModal open={true} onClose={onClose}>
      <TurbotModalTitle onClose={onClose}>Title</TurbotModalTitle>
      <TurbotModalContent>Hello</TurbotModalContent>
    </TurbotModal>
  );
};

storiesOf("TurbotChip", module)
  .add("default", () => (
    <Typography variant="body1">
      <TurbotChip
        label="AWS/Super/User"
        actions={[
          <TurbotChipAction
            tooltip="Deactivate"
            icons={[["fas", "level-down-alt"]]}
          />,
          <TurbotChipAction tooltip="Remove" icons={[["fas", "times"]]} />
        ]}
      />
    </Typography>
  ))
  .add("invert", () => (
    <Typography variant="body1">
      <TurbotChip
        invert={true}
        label="AWS/Super/User"
        actions={[
          <TurbotChipAction
            tooltip="Deactivate"
            icons={[["fas", "level-down-alt"]]}
          />,
          <TurbotChipAction tooltip="Remove" icons={[["fas", "times"]]} />
        ]}
      />
    </Typography>
  ))
  .add("custom color", () => (
    <Typography variant="body1">
      <TurbotChip
        color="209, 147, 4"
        label="AWS/Super/User"
        actions={[
          <TurbotChipAction
            tooltip="Deactivate"
            icons={[["fas", "level-down-alt"]]}
          />,
          <TurbotChipAction tooltip="Remove" icons={[["fas", "times"]]} />
        ]}
      />
    </Typography>
  ))
  .add("custom color - invert", () => (
    <Typography variant="body1">
      <TurbotChip
        color="209, 147, 4"
        invert
        label="AWS/Super/User"
        actions={[
          <TurbotChipAction
            tooltip="Deactivate"
            icons={[["fas", "level-down-alt"]]}
          />,
          <TurbotChipAction tooltip="Remove" icons={[["fas", "times"]]} />
        ]}
      />
    </Typography>
  ))
  .add("with dialog", () => (
    <Typography variant="body1">
      <TurbotChip
        color="209, 147, 4"
        label="AWS/Super/User"
        actions={[
          <TurbotChipAction
            dialogCmp={<TestDialog />}
            tooltip="Deactivate"
            icons={[["fas", "level-down-alt"]]}
          />,
          <TurbotChipAction
            dialogCmp={<TestDialog />}
            tooltip="Remove"
            icons={[["fas", "times"]]}
          />
        ]}
      />
    </Typography>
  ));
