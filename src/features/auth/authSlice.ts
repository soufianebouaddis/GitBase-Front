import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';
import type { LoginDTO, UserInfo } from '../../types/auth';

interface AuthState {
  user: UserInfo | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

// Async thunk for login
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginDTO, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Login failed');
    }
  }
);

// Async thunk for Google login  
export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (idToken: string, { rejectWithValue }) => {
    try {
      const response = await authService.googleLogin(idToken);
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Google login failed');
    }
  }
);

// Async thunk for logout
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authService.logout();
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Logout failed');
    }
  }
);

// Async thunk for getting current user
export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const user = await authService.getCurrentUser();
      return user;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to get user');
    }
  }
);

// Async thunk to check auth state on app start
export const checkAuthState = createAsyncThunk(
  'auth/checkAuthState',
  async (_, { rejectWithValue }) => {
    try {
      const token = authService.getAccessToken();
      if (!token) {
        throw new Error('No token found');
      }

      const user = await authService.getCurrentUser();
      return user;
    } catch (error) {
      authService.clearTokens();
      return rejectWithValue(error instanceof Error ? error.message : 'Auth check failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<UserInfo>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.error = action.payload as string;
      })
      // Google Login
      .addCase(googleLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(googleLogin.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.error = action.payload as string;
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        // Still logout on client side even if server request fails
        state.user = null;
        state.isLoggedIn = false;
      })
      // Get Current User
      .addCase(getCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.error = action.payload as string;
      })
      // Check Auth State
      .addCase(checkAuthState.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthState.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(checkAuthState.rejected, (state) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.user = null;
        state.error = null; // Don't show error for failed auth check
      });
  },
});

export const { clearError, setUser, clearUser } = authSlice.actions;
export default authSlice.reducer; 