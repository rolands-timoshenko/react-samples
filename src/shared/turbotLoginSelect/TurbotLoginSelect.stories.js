import { storiesOf } from "@storybook/react";
import React from "react";
import TurbotAwsSignInButton from "../turbotLoginButtons/turbotAwsSignInButton/TurbotAwsSignInButton";
import TurbotAzureSignInButton from "../turbotLoginButtons/turbotAzureSignInButton/TurbotAzureSignInButton";
import TurbotGcpSignInButton from "../turbotLoginButtons/turbotGcpSignInButton/TurbotGcpSignInButton";
import TurbotLoginSelect from "./TurbotLoginSelect";

const mockTurbotSelectOptions = [
  {
    label: <TurbotAwsSignInButton asText />,
    value: "aws"
  },
  {
    label: <TurbotAzureSignInButton asText />,
    value: "azure"
  },
  {
    label: <TurbotGcpSignInButton asText />,
    value: "gcp"
  }
];

storiesOf("TurbotLoginSelect", module).add("default", () => (
  <TurbotLoginSelect options={mockTurbotSelectOptions} />
));
