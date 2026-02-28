import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { setUser, logoutRedux } from '../store/authSlice';
import { type RootState } from '../store/store';

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.auth.loading);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Si el user está logueado, le exigimos el token fresco a Firebase
                const token = await user.getIdToken();
                localStorage.setItem("token", token); // Nos aseguramos de que esté en localstorage
                
                dispatch(setUser({ uid: user.uid, email: user.email, token }));
            } else {
                dispatch(logoutRedux()); // Borramos user y token del localstorage
            }
        });

        return unsubscribe;
    }, [dispatch]);

    if (loading) return null; 

    return <>{children}</>;
};