import { useNavigate } from "react-router";

import { useEffect } from "react";
import Spinner from "./Spinner";
import { useUser } from "../components/authentication/useUser";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate],
  );

  // 3. While loading, show a spinner
  if (isLoading)
    return (
      <div className="bg-grey-50 flex h-screen items-center justify-center">
        <Spinner />
      </div>
    );

  // 4. If there IS a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
