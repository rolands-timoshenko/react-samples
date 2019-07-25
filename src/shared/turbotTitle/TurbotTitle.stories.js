import { Typography, withStyles } from "@material-ui/core";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Tooltip from "@material-ui/core/Tooltip";
import { storiesOf } from "@storybook/react";
import React, { Fragment, useEffect } from "react";
import TableList from "../tableList/TableList";
import TurbotIcon from "../turbotIcon/TurbotIcon";
import TurbotSupIcon from "../turbotSupIcon/TurbotSupIcon";
import TurbotTableCellTitle from "../turbotTableCellTitle/TurbotTableCellTitle";
import TurbotTitle from "./TurbotTitle";

const mockList = [
  {
    icon: ["fas", "anchor"],
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    typeTitle:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },
  {
    icon: ["fas", "birthday-cake"],
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    typeTitle:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },
  {
    icon: ["fas", "bone"],
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    typeTitle:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },
  {
    icon: ["fas", "bat"],
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    typeTitle:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  }
];

const mockLongStringWithoutSpaces = `dfdkfgjdkgjsd
flkgjkflsdjgkldfsj
gkldfsjgkldfsjgkldfjgkldfsjgkldfsjgkldfjgkldfjgkldfsjgklsdfjgklsjdfklgjdfsklgjdfsklgjdfklgjdfsklgjdfklgjlkjdfsklgjdfklgjdflkgdfdkfgjdkgjsdflkgjkflsdjgkldfsjgkldfsjgkldfsjgkldfjgkldfsjgkldfsjgkldfjgkldfjgkldfsjgklsdfjgklsjdfklgjdfsklgjdfsklgjdfklgjdfsklgjdfklgjlkjdfsklgjdfklgjdflkgdfdkfgjdkgjsdflkgjkflsdjgkldfsjgkldfsjgkldfsjgkldfjgkldfsjgkldfsjgkldfjgkldfjgkldfsjgklsdfjgklsjdfklgjdfsklgjdfsklgjdfklgjdfsklgjdfklgjlkjdfsklgjdfklgjdflkgdfdkfgjdkgjsdflkgjkflsdjgkldfsjgkldfsjgkldfsjgkldfjgkldfsjgkldfsjgkldfjgkldfjgkldfsjgklsdfjgklsjdfklgjdfsklgjdfsklgjdfklgjdfsklgjdfklgjlkjdfsklgjdfklgjdflkgdfdkfgjdkgjsdflkgjkflsdjgkldfsjgkldfsjgkldfsjgkldfjgkldfsjgkldfsjgkldfjgkldfjgkldfsjgklsdfjgklsjdfklgjdfsklgjdfsklgjdfklgjdfsklgjdfklgjlkjdfsklgjdfklgjdflkgdfdkfgjdkgjsdflkgjkflsdjgkldfsjgkldfsjgkldfsjgkldfjgkldfsjgkldfsjgkldfjgkldfjgkldfsjgklsdfjgklsjdfklgjdfsklgjdfsklgjdfklgjdfsk`;

storiesOf("TurbotTitle", module).add("without tooltip", () => (
  <Fragment>
    <div style={{ width: 400, border: "2px dotted red" }}>
      <Typography variant="h6">
        <TurbotTitle showTooltip={false}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </TurbotTitle>
      </Typography>
    </div>
  </Fragment>
));

storiesOf("TurbotTitle", module).add("with default TurbotTooltip", () => (
  <Fragment>
    <div style={{ width: 400, border: "2px dotted red" }}>
      <Typography variant="h6">
        <TurbotTitle>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </TurbotTitle>
      </Typography>
    </div>
  </Fragment>
));

storiesOf("TurbotTitle", module).add("with passed in tooltip", () => (
  <Fragment>
    <div style={{ width: 400, border: "2px dotted red" }}>
      <Typography variant="h6">
        <TurbotTitle tooltipCmp={<Tooltip />}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </TurbotTitle>
      </Typography>
    </div>
  </Fragment>
));

storiesOf("TurbotTitle", module).add("with long title", () => (
  <Fragment>
    <div style={{ width: 400, border: "2px dotted red" }}>
      <Typography variant="h6">
        <TurbotTitle tooltipTextAsString>
          <span>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a
            treatise on the theory of ethics, very popular during the
            Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
            amet..", comes from a line in section 1.10.32. The standard chunk of
            Lorem Ipsum used since the 1500s is reproduced below for those
            interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
            Malorum" by Cicero are also reproduced in their exact original form,
            accompanied by English versions from the 1914 translation by H.
            Rackham.
          </span>
        </TurbotTitle>
      </Typography>
    </div>
  </Fragment>
));

storiesOf("TurbotTitle", module).add("with sup icon", () => (
  <Fragment>
    <div style={{ width: 400, border: "2px dotted red" }}>
      <Typography variant="h6">
        <TurbotSupIcon icon={["far", "filter"]}>
          <TurbotTitle>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </TurbotTitle>
        </TurbotSupIcon>
      </Typography>
    </div>
  </Fragment>
));

storiesOf("TurbotTitle", module).add("inside responsive block", () => (
  <Fragment>
    <div style={{ width: "100%", border: "2px dotted red" }}>
      <Typography variant="h6">
        <TurbotSupIcon icon={["far", "filter"]}>
          <TurbotTitle>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </TurbotTitle>
        </TurbotSupIcon>
      </Typography>
    </div>
  </Fragment>
));

storiesOf("TurbotTitle", module).add("as table list title", () => (
  <TableList>
    {mockList.map(item => (
      <TableRow>
        <TableCell style={{ width: 30 }} align="right">
          <TurbotIcon icon={item.icon} />
        </TableCell>
        <TurbotTableCellTitle>
          <Typography variant="body1">
            <TurbotSupIcon icon={["far", "filter"]}>
              <TurbotTitle>{item.title}</TurbotTitle>
            </TurbotSupIcon>
          </Typography>
        </TurbotTableCellTitle>
        <TurbotTableCellTitle>
          <Typography variant="body1">
            <TurbotTitle>{item.typeTitle}</TurbotTitle>
          </Typography>
        </TurbotTableCellTitle>
      </TableRow>
    ))}
  </TableList>
));

storiesOf("TurbotTitle", module).add("with long title without spaces", () => (
  <Fragment>
    <div style={{ width: 400, border: "2px dotted red" }}>
      <Typography variant="h6">
        <TurbotTitle tooltipTextAsString>
          <p>{mockLongStringWithoutSpaces}</p>
        </TurbotTitle>
      </Typography>
    </div>
  </Fragment>
));
