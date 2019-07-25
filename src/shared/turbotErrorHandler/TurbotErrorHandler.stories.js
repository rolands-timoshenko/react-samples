import { storiesOf } from "@storybook/react";
import React, { Fragment, useEffect } from "react";
import TurbotErrorHandlerProvider from "./TurbotErrorHandlerProvider";
import TurbotErrorHandlerConsumer from "./TurbotErrorHandlerConsumer";
import TurbotErrorHandlerMessage from "../turbotErrorHandlerMessage/TurbotErrorHandlerMessage";

const MockComponent = () => {
  throw "Error";
  return <p>This is test component which throws error</p>;
};

const MockComponent2 = ({ errorHandler }) => {
  if (errorHandler.error) {
    return <p>{errorHandler.error}</p>;
  }
  (async () => {
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          reject("Big trobble here");
        }, 500);
      });
    } catch (e) {
      errorHandler.setError(e);
    }
  })();
  return <p>Component with async call</p>;
};

const MockComponent3 = () => {
  useEffect(() => {
    throw "lifecycle error";
  });
  const action = () => {
    throw "action error";
  };
  return (
    <p>
      This is test component which throws error on action.&nbsp;
      <span onClick={action}>Action</span>
    </p>
  );
};

const MockErrorView = ({ onReset }) => {
  const listStyle = {
    cursor: "pointer",
    color: "blue"
  };
  return (
    <p>
      Something went wrong!&nbsp;
      <a style={listStyle} onClick={onReset}>
        Reload
      </a>
    </p>
  );
};

storiesOf("TurbotErrorHandler", module).add("with error inside render", () => (
  <Fragment>
    <TurbotErrorHandlerProvider errorView={<p>Something went wrong!</p>}>
      <MockComponent />
    </TurbotErrorHandlerProvider>
  </Fragment>
));

storiesOf("TurbotErrorHandler", module).add(
  "with error inside async, with error view",
  () => (
    <Fragment>
      <TurbotErrorHandlerProvider errorView={<p>Something went wrong!</p>}>
        <TurbotErrorHandlerConsumer>
          <MockComponent2 />
        </TurbotErrorHandlerConsumer>
      </TurbotErrorHandlerProvider>
    </Fragment>
  )
);

storiesOf("TurbotErrorHandler", module).add(
  "with error inside async, without error view",
  () => (
    <Fragment>
      <TurbotErrorHandlerProvider>
        <TurbotErrorHandlerConsumer>
          <MockComponent2 />
        </TurbotErrorHandlerConsumer>
      </TurbotErrorHandlerProvider>
    </Fragment>
  )
);

storiesOf("TurbotErrorHandler", module).add(
  "with reloading opportunity",
  () => (
    <Fragment>
      <TurbotErrorHandlerProvider errorView={<MockErrorView />}>
        <TurbotErrorHandlerConsumer>
          <MockComponent2 />
        </TurbotErrorHandlerConsumer>
      </TurbotErrorHandlerProvider>
    </Fragment>
  )
);

storiesOf("TurbotErrorHandler", module).add("with throwing error", () => (
  <Fragment>
    <TurbotErrorHandlerProvider errorView={<MockErrorView />}>
      <TurbotErrorHandlerConsumer>
        <MockComponent3 />
      </TurbotErrorHandlerConsumer>
    </TurbotErrorHandlerProvider>
  </Fragment>
));

storiesOf("TurbotErrorHandler", module).add(
  "using TurbotErrorHandlerMessage component",
  () => (
    <Fragment>
      <TurbotErrorHandlerProvider errorView={<TurbotErrorHandlerMessage />}>
        <TurbotErrorHandlerConsumer>
          <MockComponent3 />
        </TurbotErrorHandlerConsumer>
      </TurbotErrorHandlerProvider>
    </Fragment>
  )
);
