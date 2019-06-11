import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import { configureStore } from "../../../../store/configureStore";
import HomeContent from "../HomeContent";
const store = configureStore();

describe("HomeContent", () => {
  test("renders", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <HomeContent />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
