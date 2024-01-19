import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoginSelector } from "recoil/TokenAtom";

const UnprotectedRoute = () => {
  const isLoggedIn = useRecoilValue(isLoginSelector);

  return isLoggedIn ? <Navigate to={"/login"} replace /> : <Outlet />;
};

export default UnprotectedRoute;
