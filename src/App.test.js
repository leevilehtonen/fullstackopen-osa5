import React from "react";
import { mount } from "enzyme";
import App from "./App";

const blog = {
  title: "Komponenttitestaus tapahtuu jestillä ja enzymellä",
  author: "Test Tester",
  likes: 10
};

describe("not logged in, no blogs shown", () => {
  let app;
  beforeAll(() => {
    app = mount(<App />);
  });
  it("renders login", () => {
    app.update();
    const title = app.find("h2");
    expect(title.text()).toEqual("Log in");
    expect(app.html()).not.toContain("Blog");
    expect(app.html()).not.toContain("blog");
  });
});
