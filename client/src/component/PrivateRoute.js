import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Component }) => {
  const user = useSelector((state) => state.user);

  return user.isAuthenticated ? <Component /> : <Navigate to="/" />;
};

export default PrivateRoute;
