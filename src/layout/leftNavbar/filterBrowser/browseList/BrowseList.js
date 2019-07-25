import React from "react";
import BrowseCategory from "./browseCategory/BrowseCategory";
import BrowseItem from "./browseItem/BrowseItem";
import BrowseListStyles from "./BrowseList.styles";
import BrowseListWithLoadMore from "./hoc/BrowseListWithLoadMore";
import List from "@material-ui/core/List";
import PropTypes from "prop-types";
import TurbotLoader from "../../../../shared/turbotLoader/TurbotLoader";
import { withStyles } from "@material-ui/core/styles";

const TTurbotTypeItem = PropTypes.shape({
  id: PropTypes.string.isRequired,
  path: PropTypes.string
});

const TTypeItem = PropTypes.shape({
  icon: PropTypes.string,
  title: PropTypes.string
});

export const TBrowseItem = PropTypes.shape({
  turbot: TTurbotTypeItem,
  title: PropTypes.string,
  type: TTypeItem
});

const TBrowseListWithoutCategory = PropTypes.arrayOf(TBrowseItem);

const TBrowseListWithCategory = PropTypes.shape({
  [PropTypes.string]: TBrowseListWithoutCategory
});

export const TBrowseList = PropTypes.oneOfType([
  TBrowseListWithoutCategory,
  TBrowseListWithCategory
]);

const propTypes = {
  list: TBrowseList.isRequired,
  onSelect: PropTypes.func.isRequired,
  withCategory: PropTypes.bool
};

const BrowseList = ({
  classes,
  hasPermissionForResource,
  list,
  onSelect,
  onLoadMore,
  withCategory = false,
  withLoadMore = false,
  withIndent = false,
  processing = false
}) => {
  const renderListWithoutCategories = list => {
    return list.map(item => (
      <BrowseItem
        key={item.turbot.id}
        item={item}
        onSelect={
          hasPermissionForResource
            ? hasPermissionForResource(item)
              ? onSelect
              : null
            : onSelect
        }
      />
    ));
  };

  const renderListWithCategories = list => {
    return Object.keys(list).map(category => {
      return [
        <BrowseCategory category={category} key={category} />,
        ...renderListWithoutCategories(list[category])
      ];
    });
  };

  const renderBrowseList = () => {
    return withCategory
      ? renderListWithCategories(list)
      : renderListWithoutCategories(list);
  };

  const renderBrowseListWithLoadMore = () => {
    return (
      <BrowseListWithLoadMore
        hasMore={withLoadMore}
        onLoadMore={onLoadMore}
        processing={processing}
      >
        {renderBrowseList()}
      </BrowseListWithLoadMore>
    );
  };

  const listClasses = {
    root: withIndent ? classes.root__with_indent : classes.root
  };

  return (
    <List classes={listClasses}>
      {processing && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "-5px"
          }}
        >
          <TurbotLoader />
          <div
            style={{
              color: "grey",
              marginLeft: "-5px"
            }}
          >
            Loading...
          </div>
        </div>
      )}
      {!processing && withLoadMore
        ? renderBrowseListWithLoadMore()
        : renderBrowseList()}
    </List>
  );
};

BrowseList.propTypes = propTypes;

export default withStyles(BrowseListStyles)(BrowseList);
