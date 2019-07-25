import React, { useState } from "react";
import TurbotArrow, { TypeArrowDirection } from "./TurbotArrow";

const propTypes = {
  direction: TypeArrowDirection
};

const TurbotArrowContainer = ({ style, direction }) => {
  const [ref, setRef] = useState(null);

  const containerStyles = {
    display: "flex",
    ...(["left", "right"].includes(direction) && {
      alignItems: "center",
      minHeight: 15,
      width: "100%"
    }),
    ...(["top", "bottom"].includes(direction) && {
      justifyContent: "center",
      minWidth: 15,
      minHeight: 30
    }),
    ...style
  };

  return (
    <div ref={ref => setRef(ref)} style={containerStyles}>
      {ref && <TurbotArrow parentRef={ref} direction={direction} />}
    </div>
  );
};

TurbotArrowContainer.propTypes = propTypes;

export default TurbotArrowContainer;
