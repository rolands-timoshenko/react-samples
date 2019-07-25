import { storiesOf } from "@storybook/react";
import React, { useState } from "react";
import TurbotSelectContainer from "./TurbotSelectContainer";

const mockTurbotSelectOptions = [
  { label: "Label1", value: "Value1" },
  { label: "Label2", value: "Value2" },
  { label: "Label3", value: "Value3" },
  { label: "Label4", value: "Value4" }
];

const MultiSelectionStorie = () => {
  const [selected, setSelected] = useState([]);

  const handleSelect = item => {
    const copyOfSelected = [...selected];
    if (copyOfSelected.some(sel => sel.value === item.value)) {
      setSelected(copyOfSelected.filter(sel => sel.value !== item.value));
    } else {
      setSelected([...copyOfSelected, item]);
    }
  };

  return (
    <TurbotSelectContainer
      onSelect={handleSelect}
      label={"Label"}
      options={mockTurbotSelectOptions}
      selected={selected}
    />
  );
};

storiesOf("TurbotSelect", module)
  .add("default", () => (
    <TurbotSelectContainer
      onSelect={() => {}}
      label={"Label"}
      options={mockTurbotSelectOptions}
      selected={[]}
    />
  ))
  .add("multiple selection", () => <MultiSelectionStorie />);
