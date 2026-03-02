import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { type RootState } from "../store/store";

export const ProtectedRoute = () => {
    const { currentUser, loading } = useSelector((state: RootState) => state.auth);

    if (loading) return null;

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};