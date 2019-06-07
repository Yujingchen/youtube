import React from "react";
import { shallow } from "enzyme";
import Watch from "../Watch";

describe("Watch", () => {
  test("renders", () => {
    const wrapper = shallow(<Watch />);
    expect(wrapper).toMatchSnapshot();
  });
});

//test1 failed
// expect(received).toMatchSnapshot();

// Snapshot name: `Watch renders 1`

// - Snapshot
// + Received

//fixed by entering  Interactive Snapshot Mode and choose to update that snapshot or skip to the next:
