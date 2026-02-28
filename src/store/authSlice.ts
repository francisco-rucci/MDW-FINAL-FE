import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

// Actualizamos la interfaz para incluir el token y los errores
interface AuthState {
    currentUser: { uid: string; email: string | null; token: string } | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    currentUser: null,
    loading: true,
    error: null,
};

// Tu método adaptado a Redux Toolkit puro
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async ({ email, password }: any, { rejectWithValue }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            
            // Obtenemos el token de Firebase
            const token = await user.getIdToken();

            // Lo guardamos en el localStorage (SIN stringify para evitar comillas extras)
            localStorage.setItem("token", token);

            return {
                uid: user.uid,
                email: user.email,
                token: token,
            };
        } catch (error: any) {
            let message = "Ocurrió un error al iniciar sesión";
            if (error.code === "auth/invalid-credential") message = "Email o contraseña incorrectos";
            if (error.code === "auth/user-not-found") message = "El usuario no existe";
            if (error.code === "auth/wrong-password") message = "Contraseña incorrecta";
            
            return rejectWithValue(message);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Mantenemos esto para cuando recargamos la página (AuthWrapper)
        setUser: (state, action: PayloadAction<{ uid: string; email: string | null; token: string } | null>) => {
            state.currentUser = action.payload;
            state.loading = false;
        },
        // Una acción simple para borrar todo al hacer logout
        logoutRedux: (state) => {
            state.currentUser = null;
            localStorage.removeItem("token");
        }
    },
    extraReducers: (builder) => {
        builder
            // Cuando arranca el thunk (cargando...)
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            // Cuando Firebase da el OK
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
                state.error = null;
            })
            // Cuando la contraseña está mal o falla algo
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export const { setUser, logoutRedux } = authSlice.actions;
export default authSlice.reducer;