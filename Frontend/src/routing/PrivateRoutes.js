import { Navigate } from "react-router-dom";

export const PrivateRoutes = ({ children }) => {
  const getTokenfromLocalStroage = JSON.parse(localStorage.getItem("user"));
  return getTokenfromLocalStroage?.token !== undefined ? (
    children
  ) : (
    <Navigate to="/login" replace={true} />
  );
};
