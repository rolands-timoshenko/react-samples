export const statusType = Object.freeze({
  ERROR: "error",
  SUCCESS: "success",
  INFO: "info"
});

export const color = theme => ({
  [statusType.ERROR]: theme.palette.error.dark,
  [statusType.SUCCESS]: theme.palette.green,
  [statusType.INFO]: theme.palette.log.info
});

export const borderColor = theme => ({
  [statusType.ERROR]: theme.palette.error.dark,
  [statusType.SUCCESS]: theme.palette.green,
  [statusType.INFO]: theme.palette.grey["300"]
});

export const colors = (status, theme) => {
  switch (status) {
    case statusType.ERROR:
      return {
        icon: theme.palette.error.dark,
        border: theme.palette.error.dark,
        text: theme.palette.error.dark
      };
    case statusType.SUCCESS:
      return {
        icon: theme.palette.green,
        border: theme.palette.green,
        text: theme.palette.text.secondary
      };
    case statusType.INFO:
      return {
        icon: theme.palette.log.info,
        border: theme.palette.grey["300"],
        text: theme.palette.text.secondary
      };
    default: {
      return {
        icon: theme.palette.log.info,
        border: theme.palette.grey["300"],
        text: theme.palette.text.secondary
      };
    }
  }
};

export const icon = {
  [statusType.ERROR]: ["fal", "exclamation-circle"],
  [statusType.SUCCESS]: ["fas", "check-circle"],
  [statusType.INFO]: ["fal", "info-circle"]
};

export const primaryText = {
  GraphqlInputEditor: {
    [statusType.ERROR]: "Invalid Graphql input query",
    [statusType.SUCCESS]: "Valid Graphql input query",
    [statusType.INFO]: "Graphql query run in the context of the target"
  },
  GraphqlResultViewer: {
    [statusType.ERROR]: "Invalid Graphql query",
    [statusType.SUCCESS]: "Valid Graphql query",
    [statusType.INFO]: "Graphql query run in the context of the target"
  },
  NunjucksInputEditor: {
    [statusType.ERROR]: "Error: Invalid template",
    [statusType.SUCCESS]: "Valid template",
    [statusType.INFO]: ""
  },
  NunjucksResultViewer: {
    [statusType.ERROR]: "Template render error",
    [statusType.SUCCESS]: "YAML value",
    [statusType.INFO]: ""
  },
  PolicySettingsViewer: {
    [statusType.ERROR]: "Error while parsing rendered template",
    [statusType.SUCCESS]: "Policy Value for ",
    [statusType.INFO]: ""
  }
};
