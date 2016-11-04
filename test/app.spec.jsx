import React from "react";

import sinon from "sinon";
import { mount } from "enzyme";

import App from "../src/components/app";
import { expect } from "chai";

describe("<App />", () => {
  it("should render App component", () => {
    const app = mount(<App />);
    expect(app.find("button").length).to.equal(2);
    expect(app.find("input").length).to.equal(2);
  });
});
