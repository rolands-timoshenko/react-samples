import gql from "graphql-tag";

const QUERY = gql`
  query PolicySettingsNotification($id: String!) {
    data: notification(id: $id) {
      policySetting {
        precedence
        value
        note
        validFromTimestamp
        validToTimestamp
        template
        templateInput
        valueSource
        type {
          defaultTemplate
          defaultTemplateInput
          schema
          secret
        }
      }
      oldPolicySetting {
        precedence
        value
        note
        validFromTimestamp
        validToTimestamp
        template
        templateInput
        type {
          defaultTemplate
          defaultTemplateInput
          schema
        }
      }
    }
  }
`;
export default QUERY;
