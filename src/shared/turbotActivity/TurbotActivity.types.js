import PropTypes from "prop-types";

export const ActivityViewTypes = Object.freeze({
  SINGLE: "single",
  ACTOR: "actor",
  FULL: "full"
});

export const TypeActivityViewType = PropTypes.oneOf([
  ActivityViewTypes.SINGLE,
  ActivityViewTypes.ACTOR,
  ActivityViewTypes.FULL
]);

export const TypeActivityData = PropTypes.shape({
  time: PropTypes.string,
  actor: PropTypes.object
});
