import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "./component/utils/store";
import AllRoutes from "./AllRoutes";
import { useNavigate } from "react-router-dom";
import { addUser } from "./component/utils/userSlice";

function App() {
  return (
    <Provider store={store}>
      <AllRoutes />
    </Provider>
  );
}

export default App;
