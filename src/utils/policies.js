import React from "react";
import TurbotTitle from "../shared/turbotTitle/TurbotTitle";
import _ from "lodash";

export const getPolicyTypeMetadata = policyType => {
  return {
    type: getPolicyType(policyType),
    format: getPolicyFormat(policyType),
    language: getPolicySchemaTypeLanguage(policyType),
    multiline: isMultilineStringPolicy(policyType)
  };
};

export const getPolicyTypeSchema = policyType => {
  return policyType.schema ? policyType.schema : {};
};

export const getPolicyType = policyType => {
  const schemaFormType = _.get(policyType, "schema.x-schema-form.type", null);
  const schemaType = _.get(policyType, "schema.type", "string");
  if (schemaFormType === "code") {
    return schemaFormType;
  }
  return schemaType;
};

export const getPolicyFormat = policyType => {
  const schemaFormat = _.get(policyType, "schema.format", null);
  return schemaFormat;
};

export const getPolicySchemaLanguage = policyType => {
  const schemaFormLanguage = _.get(
    policyType,
    "schema.x-schema-form.language",
    "text"
  );

  return schemaFormLanguage;
};

export const getPolicySchemaTypeLanguage = policyType => {
  const schemaFormLanguage = getPolicySchemaLanguage(policyType);
  return schemaFormLanguage === "hcl" ? "text" : schemaFormLanguage;
};

export const isMultilineStringPolicy = policyType => {
  return _.get(policyType, "schema.x-schema-form.type", null) === "textarea";
};

const isPolicyTypeSchemaTypePrimitive = type => {
  return type !== "array" && type !== "object";
};

export const isPrimitivePolicyType = policyType => {
  const schemaType = _.get(policyType, "schema.type", "string");
  if (Array.isArray(schemaType)) {
    return schemaType.some(isPolicyTypeSchemaTypePrimitive);
  }

  return isPolicyTypeSchemaTypePrimitive(schemaType);
};

export const ensurePrimitiveValueCorrectType = (value, policyType) => {
  const schemaType = _.get(policyType, "schema.type", "string");
  if (schemaType === "boolean") {
    return Boolean(value);
  }
  if (schemaType === "integer") {
    return parseInt(value);
  }
  if (schemaType === "number") {
    return parseFloat(value);
  }
  return value;
};

export const policySummaryChartData = (data, theme) => {
  return {
    recent: {
      backgroundColor: theme.palette.summary.chart.policy.background,
      borderColor: theme.palette.summary.chart.policy.border,
      color: theme.palette.summary.chart.policy.border,
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

export const getPolicySettingValue = (policyType, setting) => {
  if (isPrimitivePolicyType(policyType)) {
    return setting.value && policyType.secret ? "" : setting.value;
  }
  return setting.valueSource;
};

export const getPolicySettingTitle = (policyType, policySetting) => {
  if (policyType.secret) {
    return <TurbotTitle tooltipTextAsString>{SECRET}</TurbotTitle>;
  } else if (policySetting.isCalculated) {
    return <TurbotTitle tooltipTextAsString>Calculated</TurbotTitle>;
  } else if (isPrimitivePolicyType(policyType)) {
    return <TurbotTitle tooltipTextAsString>{policySetting.value}</TurbotTitle>;
  }
  return <TurbotTitle tooltipTextAsString>Template</TurbotTitle>;
};

export const PolicyStates = Object.freeze({
  ERROR: "error",
  INVALID: "invalid",
  OK: "ok",
  TBD: "tbd"
});

export const icon = state => {
  switch (state) {
    case PolicyStates.ERROR:
      return ["fas", "exclamation-circle"];
    case PolicyStates.INVALID:
      return ["fas", "stop-circle"];
    case PolicyStates.OK:
      return ["fas", "check"];
    case PolicyStates.TBD:
      return ["fas", "question-circle"];
    default:
      return ["fal", "question-circle"];
  }
};

export const policyCardIcon = state => {
  switch (state) {
    case PolicyStates.ERROR:
      return ["fal", "exclamation-circle"];
    case PolicyStates.INVALID:
      return ["far", "stop-circle"];
    case PolicyStates.OK:
      return ["fas", "check-circle"];
    case PolicyStates.TBD:
      return ["fal", "question-circle"];
    default:
      return ["fal", "question-circle"];
  }
};

export const isPolicyReadOnly = policyType => {
  const readonly = _.get(policyType, "readOnly");
  return !!readonly;
};

export const SECRET = "Secret";
