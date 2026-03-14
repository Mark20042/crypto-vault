import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { type RootState, type AppDispatch } from "../../store";
import { fetchSession } from "../../store/features/authSlice";

const ProtectedRoute = () => {
    const { user, isLoading } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        if (!user) {
            dispatch(fetchSession()).finally(() => {
                setIsInitializing(false);
            });
        } else {
            setIsInitializing(false);
        }
    }, [dispatch, user]);

    if (isLoading || isInitializing) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-background">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-emerald-500 border-emerald-200"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
