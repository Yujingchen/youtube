import React from "react";
import { shallow } from "enzyme";
import App from "../App";
import { Provider } from "react-redux";
import { configureStore } from "../store/configureStore";

const store = configureStore();
describe("App", () => {
  test("renders", () => {
    const wrapper = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
