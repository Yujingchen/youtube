import React from "react";
import { shallow } from "enzyme";
import SideBarItem from "../SideBarItem";
describe("SideBarItem", () => {
  test("renders empty SideBarItem", () => {
    const wrapper = shallow(<SideBarItem />);
    expect(wrapper).toMatchSnapshot();
  });
  test("renders highlighted SideBarItem that navigate to /feed/trending", () => {
    const wrapper = shallow(
      <SideBarItem highlighted icon="fire" label="Trending" />
    );
    expect(wrapper).toMatchSnapshot();
  });
  test("renders non-highlighted SideBarItem that navigate to /feed/trending", () => {
    const wrapper = shallow(<SideBarItem icon="fire" label="Trending" />);
    expect(wrapper).toMatchSnapshot();
  });
});
