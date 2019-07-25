import React, { useState } from "react";
import PropTypes from "prop-types";
import TurbotIcon from "../turbotIcon/TurbotIcon";
import TurbotTooltip from "../turbotTooltip/TurbotTooltip";

const propTypes = {
  icons: PropTypes.array.isRequired,
  tooltip: PropTypes.string.isRequired,
  dialogCmp: PropTypes.element,
  onClose: PropTypes.func
};

const TurbotChipAction = ({ icons, tooltip, dialogCmp, onClose }) => {
  const [open, setOpen] = useState(false);
  const handleClick = evt => {
    if (evt) {
      evt.stopPropagation();
    }
    open && onClose && onClose();
    setOpen(!open);
  };
  return open ? (
    <span onClick={handleClick}>
      {icons.map((icon, index) => (
        <TurbotIcon key={index} icon={icon} />
      ))}
      {dialogCmp &&
        React.cloneElement(dialogCmp, {
          onClose: handleClick
        })}
    </span>
  ) : (
    <TurbotTooltip title={tooltip}>
      <span onClick={handleClick}>
        {icons.map((icon, index) => (
          <TurbotIcon key={index} icon={icon} />
        ))}
      </span>
    </TurbotTooltip>
  );
};

TurbotChipAction.propTypes = propTypes;

export default TurbotChipAction;
