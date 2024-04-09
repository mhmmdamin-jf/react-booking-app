import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom"
//eslint-disable-next-line
function ProtectedRoute({ children }) {
      const data = useUser();
      const navigate = useNavigate();
      useEffect(function () {
            if (data?.isAuthenicated && window.location.pathname === "/login") {
                  navigate("/");
                  return;
            }
            if (!data?.isAuthenicated && window.location.pathname !== "/sign-up") {
                  navigate("/login");
                  return;
            }
      }, [data?.isAuthenicated, navigate])

      if (data?.user?.isAuthenicated && data?.user?.isLoading) {
            return <Spinner fullPage />
      }

      return (children)
}

export default ProtectedRoute
