import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import SessionContext from "../context/SessionContext";
import LoadingSpinner from "../components/LoadingSpinner";

export default function ProtectedRoute({ children }) {
    const { session, isLoading } = useContext(SessionContext);
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingSpinner size="large" />
            </div>
        );
    }

    if (!session) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}