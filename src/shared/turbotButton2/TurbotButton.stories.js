import { storiesOf } from "@storybook/react";
import React from "react";
import TurbotButton from "./TurbotButton";

storiesOf("TurbotButton2", module).add("primary", () => (
  <div>
    <TurbotButton size="sm" variant="primary">
      Small turbot2 button
    </TurbotButton>
    <br /> <br />
    <TurbotButton size="lg" variant="primary">
      Large turbot2 button
    </TurbotButton>
  </div>
));
