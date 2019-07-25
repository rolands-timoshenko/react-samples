import { storiesOf } from "@storybook/react";
import React from "react";
import TurbotCrudButton, {
  CrudButtonVariants,
  CrudButtonHoverStates
} from "./TurbotCrudButton";
import TurbotIcon from "../turbotIcon/TurbotIcon";

storiesOf("TurbotCrudButton", module)
  .add("success", () => (
    <TurbotCrudButton variant={CrudButtonVariants.SUCCESS} label="Success" />
  ))
  .add("warning", () => (
    <TurbotCrudButton variant={CrudButtonVariants.WARNING} label="Warning" />
  ))
  .add("danger", () => (
    <TurbotCrudButton variant={CrudButtonVariants.DANGER} label="Danger" />
  ))
  .add("default", () => (
    <TurbotCrudButton variant={CrudButtonVariants.DEFAULT} label="Default" />
  ))
  .add("crud outline icon", () => (
    <>
      <TurbotCrudButton
        variant={CrudButtonVariants.DEFAULT}
        hoverState={CrudButtonHoverStates.CREATE}
        label={<TurbotIcon icon={["fas", "pencil-alt"]} />}
        outline
        iconType
      />
      <br />
      <TurbotCrudButton
        variant={CrudButtonVariants.DEFAULT}
        hoverState={CrudButtonHoverStates.UPDATE}
        label={
          <>
            <TurbotIcon icon={["fas", "level-down-alt"]} />
          </>
        }
        outline
        iconType
      />
      <br />
      <TurbotCrudButton
        variant={CrudButtonVariants.DEFAULT}
        hoverState={CrudButtonHoverStates.UPDATE}
        label={
          <>
            <TurbotIcon icon={["fas", "level-up-alt"]} /> Activate
          </>
        }
        outline
        iconType
      />
      <br />
      <TurbotCrudButton
        variant={CrudButtonVariants.DEFAULT}
        hoverState={CrudButtonHoverStates.DELETE}
        label={<TurbotIcon icon={["fas", "times"]} />}
        outline
        iconType
      />
    </>
  ));
