import React from "react";
import AppLayout from "./components/AppLayout/AppLayout";
import Home from "./containers/Home/Home";
import Watch from "./containers/Watch/Watch";
import { Route, Switch } from "react-router-dom";
import "./App.scss";

function App() {
  return (
    <AppLayout>
      <Switch>
        <Route path="/watch" component={Watch} />
        <Route path="/" component={Home} />
        {/* if use path instead of exact path, order of route matters, if switch line 13, 14, it will always end up in home component */}
      </Switch>
    </AppLayout>
  );
}

export default App;
