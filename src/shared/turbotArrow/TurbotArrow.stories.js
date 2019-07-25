import { storiesOf } from "@storybook/react";
import React from "react";
import TurbotArrowContainer from "./TurbotArrowContainer";

storiesOf("TurbotArrow", module).add("left", () => (
  <TurbotArrowContainer direction="left" style={{ border: "1px solid red" }} />
));

storiesOf("TurbotArrow", module).add("right", () => (
  <TurbotArrowContainer direction="right" style={{ border: "1px solid red" }} />
));

storiesOf("TurbotArrow", module).add("up", () => (
  <TurbotArrowContainer
    direction="up"
    style={{ border: "1px solid red", height: 300 }}
  />
));

storiesOf("TurbotArrow", module).add("down", () => (
  <TurbotArrowContainer
    direction="down"
    style={{ border: "1px solid red", height: 300 }}
  />
));
