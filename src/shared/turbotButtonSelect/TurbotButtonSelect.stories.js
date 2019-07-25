import { storiesOf } from "@storybook/react";
import React from "react";
import TurbotButtonSelectContainer from "./TurbotButtonSelectContainer";

const mockTurbotSelectOptions = [
  { label: "Label1", value: "Value1" },
  { label: "Label2", value: "Value2" }
];

storiesOf("TurbotButtonSelect", module).add("default", () => (
  <TurbotButtonSelectContainer
    label="TurbotButtonSelect"
    options={mockTurbotSelectOptions}
    onSelect={() => {}}
    size="md"
  />
));
