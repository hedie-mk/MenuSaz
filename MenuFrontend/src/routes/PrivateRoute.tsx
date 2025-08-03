import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../app/app";
import type { ReactNode } from "react";
 import { useAppDispatch } from "../app/hooks";
 import { isTokenExpired } from "../utils/auth/TokenExpire";
 import { logout } from "../features/auth/authSlice";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useAppDispatch();
   if (!token || isTokenExpired(token)) {
    dispatch(logout()); // پاک کردن توکن
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;