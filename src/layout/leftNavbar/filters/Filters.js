import React, { Fragment } from "react";
import AddFilterMenu from "./addFilterMenu/AddFilterMenu";
import DrawerItem from "../drawerItem/DrawerItem";
import DrawerItemIcon from "../drawerItem/drawerItemIcon/DrawerItemIcon";
import DrawerItemText from "../drawerItem/drawerItemText/DrawerItemText";
import FilterBrowserContainer from "../filterBrowser/FilterBrowserContainer";
import { Divider } from "@material-ui/core";

const Filters = ({
  filterChoices,
  filters,
  menuAnchorEl,
  handleToggleOpenClick,
  selectedItemAction,
  onAddfilter,
  onRemoveFilter,
  onOpenFiltersMenu,
  onCloseFiltersMenu
}) => {
  return (
    <Fragment>
      {filters.map(filter => (
        <Fragment key={filter.type.value}>
          <FilterBrowserContainer
            type={filter.type}
            selectedItem={filter.selectedItem}
            isOpen={filter.isOpen}
            handleToggleOpenClick={handleToggleOpenClick}
            selectedItemAction={selectedItemAction}
            onRemove={onRemoveFilter}
          />
          <Divider style={{ margin: "0 13px" }} />
        </Fragment>
      ))}
      <DrawerItem
        hasDropdown
        dropdownDirection={"right"}
        onClick={onOpenFiltersMenu}
        aria-owns={menuAnchorEl ? "add-filter-menu" : undefined}
      >
        <DrawerItemIcon style={{ marginLeft: 6 }} icon={["far", "filter"]} />
        <DrawerItemText>Filters</DrawerItemText>
      </DrawerItem>
      <AddFilterMenu
        anchorEl={menuAnchorEl}
        filterChoices={filterChoices}
        onAddfilter={onAddfilter}
        onRemoveFilter={onRemoveFilter}
        onClose={onCloseFiltersMenu}
      />
    </Fragment>
  );
};

export default Filters;
