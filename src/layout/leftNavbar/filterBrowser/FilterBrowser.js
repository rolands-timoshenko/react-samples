import React, { useState } from "react";
import AncestorsListContainer from "./browseList/AncestorsListContainer";
import BrowseSelectedContainer from "./browseSelected/BrowseSelectedContainer";
import ChildrensListContainer from "./browseList/ChildrensListContainer";
import FilterBrowserStyles from "./FilterBrowser.styles";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import TurbotErrorHandlerMessage from "../../../shared/turbotErrorHandlerMessage/TurbotErrorHandlerMessage";
import TurbotErrorHandlerProvider from "../../../shared/turbotErrorHandler/TurbotErrorHandlerProvider";
import { TBrowseItem } from "./browseList/BrowseList";
import { withStyles } from "@material-ui/core/styles";

const propTypes = {
  item: TBrowseItem.isRequired,
  onSelect: PropTypes.func.isRequired,
  childrenFilters: PropTypes.arrayOf(PropTypes.string)
  // TODO: add type type and selectedItemAction type
};

const FilterBrowser = ({
  childrenFilters,
  classes,
  isSelected,
  item,
  onSelect,
  selectedItemAction,
  filterAncestors,
  rootResource,
  type,
  withResourceNavNodes = false
}) => {
  const [processes, setProcesses] = useState([]);

  const setProcessing = procesing => {
    if (procesing) {
      setProcesses([...processes, true]);
    } else {
      processes.pop();
      setProcesses([...processes]);
    }
  };

  return (
    <Paper className={classes.browse}>
      <TurbotErrorHandlerProvider errorView={<TurbotErrorHandlerMessage />}>
        <AncestorsListContainer
          onSelect={onSelect}
          item={item}
          filterAncestors={filterAncestors}
          rootResource={rootResource}
          type={type}
          processes={processes}
          setProcessing={setProcessing}
        />
      </TurbotErrorHandlerProvider>
      <TurbotErrorHandlerProvider errorView={<TurbotErrorHandlerMessage />}>
        <BrowseSelectedContainer
          isSelected={isSelected}
          onSelect={onSelect}
          item={item}
          type={type}
          action={selectedItemAction}
        />
      </TurbotErrorHandlerProvider>
      <TurbotErrorHandlerProvider errorView={<TurbotErrorHandlerMessage />}>
        <ChildrensListContainer
          filters={childrenFilters}
          itemId={item.turbot.id}
          onSelect={onSelect}
          type={type}
          processes={processes}
          setProcessing={setProcessing}
          withResourceNavNodes={withResourceNavNodes}
        />
      </TurbotErrorHandlerProvider>
    </Paper>
  );
};

FilterBrowser.propTypes = propTypes;

export default withStyles(FilterBrowserStyles)(FilterBrowser);
