import _ from "lodash";
import { isNotEmptyString } from "./utils";

export const getVisibleMetadata = resource => {
  const { turbot, ...rest } = resource;
  const resourceData = {
    ...rest
  };

  if (!turbot) {
    return resourceData;
  }

  if (!_.isEmpty(turbot.akas)) {
    _.set(resourceData, "turbot.akas", turbot.akas);
  }
  if (!_.isEmpty(turbot.custom)) {
    _.set(resourceData, "turbot.custom", turbot.custom);
  }
  if (turbot.resourceParentAka) {
    _.set(resourceData, "turbot.resourceParentAka", turbot.resourceParentAka);
  }
  if (!_.isEmpty(turbot.tags)) {
    _.set(resourceData, "turbot.tags", turbot.tags);
  }
  if (turbot.title) {
    _.set(resourceData, "turbot.title", turbot.title);
  }

  if (!turbot.terraform) {
    return resourceData;
  }

  if (turbot.terraform.resourceAddress) {
    _.set(
      resourceData,
      "turbot.terraform.resourceAddress",
      turbot.terraform.resourceAddress
    );
  }
  if (turbot.terraform.stack) {
    _.set(resourceData, "turbot.terraform.stack", turbot.terraform.stack);
  }
  if (turbot.terraform.stackSource) {
    _.set(
      resourceData,
      "turbot.terraform.stackSource",
      turbot.terraform.stackSource
    );
  }

  return resourceData;
};

/**
 * Get title from resource object
 * @param {Object} resource resource object
 * @param {String} noTitle title to show if we can't find a title or ID
 * @return {any}
 */
export const getTitle = (resource, noTitle = null) => {
  const metadataTitle = _.get(resource, "turbot.title", null);
  if (isNotEmptyString(metadataTitle)) {
    return metadataTitle;
  }
  return _.get(resource, "turbot.id", noTitle);
};

export const getNavigationNodeTitle = (resource, noTitle = null) => {
  const metadataTitle = _.get(resource, "type.turbot.title", null);
  if (isNotEmptyString(metadataTitle)) {
    return metadataTitle;
  }
  return _.get(resource, "turbot.navigationNodeId", noTitle);
};

export const getBreadcrumbString = (trunk, seperator = " > ") => {
  if (!trunk) return null;
  const titles = trunk.items.map(item => getTitle(item));
  return titles.join(seperator);
};

export const getBreadcrumbArray = trunk => {
  return trunk.items && trunk.items.length > 1
    ? trunk.items.slice(0, trunk.items.length - 1).map(trunk => ({
        label: getTitle(trunk),
        value: getTitle(trunk)
      }))
    : null;
};

export const getIcon = data => {
  return data.icon ? data.icon : data.type ? data.type.icon : null;
};

export const resourceSummaryChartData = (data, theme) => {
  return {
    recent: {
      backgroundColor: theme.palette.summary.chart.resource.background,
      borderColor: theme.palette.summary.chart.resource.border,
      color: theme.palette.summary.chart.resource.border,
      value: data.recent || 0
    },
    total: {
      backgroundColor: theme.palette.appBar.divider,
      borderColor: theme.palette.appBar.divider,
      color: theme.palette.summary.chart.common.total,
      value: data.total || 0
    }
  };
};

export const transformFromTagsMap = tagsMap => {
  const transformedTags = [];
  if (!tagsMap) {
    return transformedTags;
  }
  Object.entries(tagsMap).forEach(([key, value]) => {
    transformedTags.push({
      key,
      value
    });
  });
  return transformedTags;
};

export const transformToTagsMap = tags => {
  const tagsMap = {};
  tags.forEach(tag => {
    if (tag.key) {
      tagsMap[tag.key.trim()] = tag.value ? tag.value.trim() : "";
    }
  });
  return Object.entries(tagsMap).length > 0 ? tagsMap : {};
};
