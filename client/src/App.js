import React from "react";
import { Provider } from "react-redux";
import { store } from "./component/utils/store";
import AllRoutes from "./AllRoutes";


function App() {
  return (
    <Provider store={store}>
      <AllRoutes />
    </Provider>
  );
}

export default App;
