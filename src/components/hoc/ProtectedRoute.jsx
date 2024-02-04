import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { selectIsAuthenticated } from "../../store/userReducer";

export default function ProtectedRoute() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/sign-in", { replace: true });
  }, []);

  return (
    <>
      <Outlet />
    </>
  );
}
