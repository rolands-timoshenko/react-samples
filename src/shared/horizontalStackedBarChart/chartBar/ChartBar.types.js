import PropTypes from "prop-types";

export const TypeChartBar = PropTypes.shape({
  backgroundColor: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired,
  iconColor: PropTypes.string,
  label: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  stroke: PropTypes.bool,
  fill: PropTypes.string
});
