import { Navigate } from "react-router-dom";

export const OpenRoutes = ({ children }) => {
  const getTokenfromLocalStroage = JSON.parse(localStorage.getItem("user"));
  return getTokenfromLocalStroage?.token === undefined ? (
    children
  ) : (
    <Navigate to="/" replace={true} />
  );
};
