import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { type RootState } from "../store/store";

export const ProtectedRoute = () => {
    const { currentUser } = useSelector((state: RootState) => state.auth);

    if (!currentUser) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};