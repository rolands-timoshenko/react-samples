import { storiesOf } from "@storybook/react";
import React from "react";
import TurbotAlert, { AlertTypes } from "../src/shared/turbotAlert/TurbotAlert";

storiesOf("TurbotAlert", module)
  .add("success", () => (
    <TurbotAlert
      message="This is success alert."
      type={AlertTypes.SUCCESS}
      onClose={() => {}}
    />
  ))
  .add("warning", () => (
    <TurbotAlert
      message="This is warning alert."
      type={AlertTypes.WARNING}
      onClose={() => {}}
    />
  ))
  .add("danger", () => (
    <TurbotAlert
      message="This is danger alert."
      type={AlertTypes.DANGER}
      onClose={() => {}}
    />
  ))
  .add("info", () => (
    <TurbotAlert
      message="This is info alert."
      type={AlertTypes.INFO}
      onClose={() => {}}
    />
  ));
