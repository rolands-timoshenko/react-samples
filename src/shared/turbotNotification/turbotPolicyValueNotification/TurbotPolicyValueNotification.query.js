import gql from "graphql-tag";
import resourceFragments from "../../graphql/fragments/resourceFragments";

const QUERY = gql`
  query PolicyValueNotification($id: String!) {
    data: notification(id: $id) {
      policyValue {
        isCalculated
        state
        default
        value
        precedence
        default
        setting {
          resource {
            turbot {
              ...turbotResourceMetadata
            }
          }
        }
        resource {
          turbot {
            ...turbotResourceMetadata
          }
        }
        type {
          defaultTemplate
          defaultTemplateInput
          schema
          secret
          readOnly
        }
      }
      oldPolicyValue {
        isCalculated
        state
        value
        precedence
      }
    }
  }
  ${resourceFragments.turbotResourceMetadata}
`;
export default QUERY;
