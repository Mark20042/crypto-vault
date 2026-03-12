import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { type RootState, type AppDispatch } from "../../store";
import { fetchSession } from "../../store/features/authSlice";

const ProtectedRoute = () => {
    const { user, isLoading } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();

    useEffect(() => {

        if (!user && !isLoading) {
            dispatch(fetchSession());
        }
    }, [user, isLoading, dispatch]);

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
        );
    }

    if (!user) {

        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
