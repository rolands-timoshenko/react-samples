import { storiesOf } from "@storybook/react";
import React from "react";
import TurbotButton from "./TurbotButton";

storiesOf("TurbotButton", module).add("primary", () => (
  <div>
    <TurbotButton color="primary" size="small" variant="contained">
      Small turbot button
    </TurbotButton>
    <br /> <br />
    <TurbotButton color="primary" size="medium" variant="contained">
      Medium turbot button
    </TurbotButton>
    <br /> <br />
    <TurbotButton color="primary" size="large" variant="contained">
      Large turbot button
    </TurbotButton>
  </div>
));
