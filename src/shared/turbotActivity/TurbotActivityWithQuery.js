import PropTypes from "prop-types";
import React from "react";
import TurbotListQuery from "../turbotListQuery/TurbotListQuery";
import TurbotQueryFilterConvertor from "../turbotQueryFilterConvertor/TurbotQueryFilterConvertor";
import TurbotActivityContainer from "./TurbotActivityContainer";
import TurbotBackoff from "../turbotBackoff/TurbotBackoff";

const propTypes = {
  query: PropTypes.any.isRequired
};

const TurbotActivityWithQuery = ({ query, ...rest }) => {
  return (
    <TurbotBackoff interval={10000}>
      <TurbotListQuery dataFetchKey={"data"} query={query}>
        <TurbotQueryFilterConvertor {...rest}>
          {props => <TurbotActivityContainer {...props} />}
        </TurbotQueryFilterConvertor>
      </TurbotListQuery>
    </TurbotBackoff>
  );
};

TurbotActivityWithQuery.propTypes = propTypes;

export default TurbotActivityWithQuery;
