import React from "react";
import TurbotIcon from "../turbotIcon/TurbotIcon";

const TurbotDropdownLabel = ({ icon, label, dialogCmp }) => (
  <>
    <TurbotIcon icon={icon} style={{ marginRight: ".2rem" }} /> {label}
  </>
);

export default TurbotDropdownLabel;
