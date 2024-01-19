import { Navigate, Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoginSelector } from "recoil/TokenAtom";

const ProtectedRoute = () => {
  const isLoggedIn = useRecoilValue(isLoginSelector);

  return isLoggedIn ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default ProtectedRoute;
