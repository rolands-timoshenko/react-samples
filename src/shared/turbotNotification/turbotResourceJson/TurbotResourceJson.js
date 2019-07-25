import React from "react";
import PropTypes from "prop-types";
import ReactJson from "react-json-view";
import { withTheme } from "@material-ui/core/styles";

const propTypes = {
  data: PropTypes.any.isRequired
};

const TurbotResourceJson = ({ data, style, theme }) => {
  const computedStyle = {
    ...style,
    padding: ".75rem"
  };
  return (
    <div style={computedStyle}>
      <ReactJson
        src={data}
        indentWidth={2}
        collapseStringsAfterLength={50}
        displayDataTypes={false}
        name={false}
        enableClipboard={false}
        sortKeys={true}
      />
    </div>
  );
};

TurbotResourceJson.propTypes = propTypes;

export default withTheme()(TurbotResourceJson);
