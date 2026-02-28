import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { setUser } from '../store/authSlice';
import type { RootState } from '../store/store';

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.auth.loading);

    useEffect(() => {
        // Escuchamos a Firebase
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Si hay usuario, mandamos algunos datos a Redux
                dispatch(setUser({ uid: user.uid, email: user.email }));
            } else {
                // Si cierra sesión, limpiamos Redux
                dispatch(setUser(null));
            }
        });

        return unsubscribe;
    }, [dispatch]);
    if (loading) return null; 

    return <>{children}</>;
};