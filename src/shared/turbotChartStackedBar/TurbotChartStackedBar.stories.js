import { chartData } from "./chartData";
import { storiesOf } from "@storybook/react";
import React, { Fragment } from "react";
import TurbotChartStackedBarContainer from "./TurbotChartStackedBarContainer";
import { withTheme } from "@material-ui/core";

// All custom data add here
const customSummaryData = [
  // #1050 -->
  {
    total: 89,
    alarm: 0,
    error: 0,
    invalid: 0,
    ok: 89,
    skipped: 0,
    tbd: 0
  },
  {
    total: 93,
    alarm: 0,
    error: 38,
    invalid: 0,
    ok: 55,
    skipped: 0,
    tbd: 0
  },
  {
    total: 101,
    alarm: 0,
    error: 1,
    invalid: 0,
    ok: 100,
    skipped: 0,
    tbd: 0
  },
  {
    total: 2325,
    alarm: 158,
    error: 28,
    invalid: 0,
    ok: 857,
    skipped: 1205,
    tbd: 77
  },
  {
    total: 23414,
    alarm: 201,
    error: 1562,
    invalid: 0,
    ok: 7529,
    skipped: 11832,
    tbd: 2290
  },
  // <-- #1050
  // #963 -->
  {
    total: 2582,
    alarm: 1,
    error: 8,
    invalid: 0,
    ok: 1220,
    skipped: 1293,
    tbd: 60
  },
  {
    total: 543,
    alarm: 0,
    error: 2,
    invalid: 0,
    ok: 531,
    skipped: 8,
    tbd: 2
  },
  {
    total: 114,
    alarm: 0,
    error: 1,
    invalid: 0,
    ok: 65,
    skipped: 48,
    tbd: 0
  },
  // <-- #963
  // #??? ->
  {
    total: 5722,
    alarm: 56,
    error: 638,
    invalid: 1,
    ok: 1468,
    skipped: 3533,
    tbd: 26
  },
  // <-- #???
  // #758 -->
  {
    total: 6093,
    alarm: 0,
    error: 1501,
    invalid: 0,
    ok: 2834,
    skipped: 1756,
    tbd: 2
  },
  {
    total: 1024,
    alarm: 0,
    error: 866,
    invalid: 0,
    ok: 128,
    skipped: 16,
    tbd: 14
  },
  {
    total: 905,
    alarm: 8,
    error: 271,
    invalid: 0,
    ok: 260,
    skipped: 301,
    tbd: 65
  },
  {
    total: 654,
    alarm: 11,
    error: 2,
    invalid: 0,
    ok: 110,
    skipped: 531,
    tbd: 0
  },
  {
    total: 654,
    alarm: 8,
    error: 2,
    invalid: 3,
    ok: 110,
    skipped: 531,
    tbd: 0
  },
  {
    total: 273,
    alarm: 0,
    error: 122,
    invalid: 0,
    ok: 90,
    skipped: 61,
    tbd: 0
  },
  // // <-- #758
  {
    total: 34,
    alarm: 0,
    error: 21,
    invalid: 0,
    ok: 4,
    skipped: 4,
    tbd: 5
  },
  {
    total: 21,
    alarm: 0,
    error: 0,
    invalid: 0,
    ok: 21,
    skipped: 0,
    tbd: 0
  },
  {
    total: 9,
    alarm: 0,
    error: 0,
    invalid: 0,
    ok: 9,
    skipped: 0,
    tbd: 0
  },
  {
    total: 9,
    alarm: 0,
    error: 9,
    invalid: 0,
    ok: 0,
    skipped: 0,
    tbd: 0
  },
  {
    total: 1,
    alarm: 0,
    error: 0,
    invalid: 0,
    ok: 1,
    skipped: 0,
    tbd: 0
  }
];

// Generate rundom namber between range
const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function generateChartSummaryData(length, keys, min, max) {
  const data = [];

  for (let i = 0; i < length; i++) {
    const summary = {};
    keys.forEach(key => {
      summary[key] = getRandomInt(min, max);
    });

    summary.total = Object.keys(summary)
      .map(key => summary[key])
      .reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);

    data.push(summary);
  }

  return data;
}

// Lets generate random data for chart
let summaryData = generateChartSummaryData(
  10,
  ["alarm", "error", "invalid", "ok", "skipped", "tbd"],
  0,
  5000
);
// add custom data into generated
summaryData = customSummaryData; //summaryData.concat(customSummaryData);

// Will prepare data for TurbotChartStackedBarContainer component
const TestPrepareChartData = withTheme()(({ theme, children }) => {
  const data = summaryData.map((val, index) => chartData(val, theme, index));
  const totals = TurbotChartStackedBarContainer.getMaxTotals(data);
  return children({
    data,
    totals
  });
});

storiesOf("TurbotChartStackedBar", module).add("playground", () => (
  <Fragment>
    <div style={{ padding: 20 }}>
      <TestPrepareChartData>
        {({ data, totals }) => {
          // console.info(data, totals);
          return data.map((item, index) => (
            <TurbotChartStackedBarContainer
              key={index}
              data={item}
              totals={totals}
              onClick={() => {}}
            />
          ));
        }}
      </TestPrepareChartData>
    </div>
  </Fragment>
));
