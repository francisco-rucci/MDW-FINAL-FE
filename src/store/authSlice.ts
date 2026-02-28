import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

// Definimos qué forma tiene nuestro estado
interface AuthState {
    // Solo guardamos datos simples para que Redux no se enoje
    currentUser: { uid: string; email: string | null } | null; 
    loading: boolean;
}

const initialState: AuthState = {
    currentUser: null,
    loading: true,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Esta función actualiza al usuario en el estado global
        setUser: (state, action: PayloadAction<{ uid: string; email: string | null } | null>) => {
            state.currentUser = action.payload;
            state.loading = false; // Si hay (o no) usuario, ya terminamos de cargar
        }
    }
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;