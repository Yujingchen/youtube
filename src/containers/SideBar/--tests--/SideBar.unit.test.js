import React from "react";
import { shallow } from "enzyme";
import SideBar from "../SideBar";
describe("SideBar", () => {
  test("renders SideBar", () => {
    const wrapper = shallow(<SideBar />);
    expect(wrapper).toMatchSnapshot();
  });

  // test("renders SideBarHeader with props.title=''", () => {
  //   const wrapper = shallow(<SideBarHeader title="" />);
  //   expect(wrapper).toMatchSnapshot();
  // });

  // test("renders SideBarHeader with sample title", () => {
  //   const wrapper = shallow(<SideBarHeader title="Sample Title" />);
  //   expect(wrapper).toMatchSnapshot();
  // });
});
