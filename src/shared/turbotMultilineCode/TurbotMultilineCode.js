import React from "react";
import TurbotMultilineText from "../turbotMultilineText/TurbotMultilineText";
const TurbotMultilineCode = ({ value = "" }) => (
  <pre>
    <code>
      <TurbotMultilineText value={value} />
    </code>
  </pre>
);

export default TurbotMultilineCode;
