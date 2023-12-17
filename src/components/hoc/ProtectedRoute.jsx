import React, { useContext, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { Outlet, useNavigate } from "react-router-dom";

export default function ProtectedRoute() {
  const { isAuthenticated } = useContext(AuthContext);
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
