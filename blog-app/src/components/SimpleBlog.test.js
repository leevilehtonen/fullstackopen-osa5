import React from "react";
import { shallow } from "enzyme";
import SimpleBlog from "./SimpleBlog";

const blog = {
  title: "Komponenttitestaus tapahtuu jestillä ja enzymellä",
  author: "Test Tester",
  likes: 10
};

describe.only("<SimpleBlog />", () => {
  it("renders content", () => {
    const blogComponent = shallow(<SimpleBlog blog={blog} />);
    const headerDiv = blogComponent.find(".header");
    const contentDiv = blogComponent.find(".content");

    expect(headerDiv.text()).toContain(blog.title);
    expect(headerDiv.text()).toContain(blog.author);
    expect(contentDiv.text()).toContain(blog.likes);
  });
  it("clicking the button calls event handler", () => {
    const mockHandler = jest.fn();

    const blogComponent = shallow(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    );
    const button = blogComponent.find("button");
    button.simulate("click");
    button.simulate("click");
    expect(mockHandler.mock.calls.length).toBe(2);
  });
});
