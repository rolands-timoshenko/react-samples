import React from "react";
import PropTypes from "prop-types";
import TurbotResourceYamlStyles from "./TurbotResourceYaml.styles";
import TurbotEditor from "../../turbotFormFields/turbotEditor/TurbotEditor";
import YAML from "js-yaml";
import { withStyles } from "@material-ui/core";

const propTypes = {
  data: PropTypes.any.isRequired
};

class TurbotResourceYaml extends React.Component {
  componentDidMount() {
    if (this.yaml) {
      const gutters = this.yaml.querySelector(".CodeMirror-gutters");
      gutters.style.backgroundColor = "white";
    }
  }

  render() {
    const { classes, data, style } = this.props;
    const yamlData = YAML.safeDump(data, { indent: 2, sortKeys: true });

    return (
      <div
        className={classes.root}
        style={style}
        ref={el => {
          this.yaml = el;
        }}
      >
        <TurbotEditor
          mode="yaml"
          theme="neo"
          readOnly={true}
          lineNumbers={true}
          value={yamlData}
        />
      </div>
    );
  }
}

TurbotResourceYaml.propTypes = propTypes;

export default withStyles(TurbotResourceYamlStyles)(TurbotResourceYaml);
