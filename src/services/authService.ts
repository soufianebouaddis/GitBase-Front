import axiosInstance from '../axios/axiosInstance';
import type {
  AuthResponse,
  LoginDTO,
  RegisterDTO,
  GoogleAuthRequest,
  OAuthUrlResponse,
  UserInfo,
  ApiResponse
} from '../types/auth';

// Cookie utility functions
const setCookie = (name: string, value: string, days: number = 7) => {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax; Secure`;
};

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax; Secure`;
};

export const authService = {
  // Login with email and password
  async login(credentials: LoginDTO): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
      const authData = response.data.data;

      // Store tokens in cookies instead of localStorage
      setCookie('accessToken', authData.accessToken, 7);
      setCookie('refreshToken', authData.refreshToken, 30);

      return authData;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Register new user
  async register(userData: RegisterDTO): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.post<ApiResponse<AuthResponse>>('/auth/register', userData);
      const authData = response.data.data;

      // Store tokens in cookies instead of localStorage
      setCookie('accessToken', authData.accessToken, 7);
      setCookie('refreshToken', authData.refreshToken, 30);

      return authData;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Get Google OAuth URL and redirect
  async initiateGoogleLogin(): Promise<void> {
    try {
      const response = await axiosInstance.get<ApiResponse<OAuthUrlResponse>>('/auth/oauth2/google/url');
      const { authorizationUrl } = response.data.data;
      
      // Redirect to Google OAuth URL
      window.location.href = authorizationUrl;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Legacy Google OAuth login (keeping for backward compatibility if needed)
  async googleLogin(idToken: string): Promise<AuthResponse> {
    try {
      const googleAuthRequest: GoogleAuthRequest = { idToken };
      const response = await axiosInstance.post<ApiResponse<AuthResponse>>('/oauth2/authorize/google', googleAuthRequest);
      const authData = response.data.data;

      // Store tokens in cookies instead of localStorage
      setCookie('accessToken', authData.accessToken, 7);
      setCookie('refreshToken', authData.refreshToken, 30);

      return authData;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Get Google OAuth URL (keeping for compatibility)
  async getGoogleOAuthUrl(): Promise<OAuthUrlResponse> {
    try {
      const response = await axiosInstance.get<ApiResponse<OAuthUrlResponse>>('/auth/oauth2/google/url');
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Get current user info
  async getCurrentUser(): Promise<UserInfo> {
    try {
      const response = await axiosInstance.get<ApiResponse<UserInfo>>('/auth/me');
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  },

  // Refresh access token
  async refreshToken(): Promise<AuthResponse> {
    try {
      const response = await axiosInstance.post<ApiResponse<AuthResponse>>('/auth/refresh');
      const authData = response.data.data;

      // Update stored token in cookies
      setCookie('accessToken', authData.accessToken, 7);

      return authData;
    } catch (error) {
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      throw this.handleError(error);
    }
  },

  // Logout
  async logout(): Promise<void> {
    try {
      await axiosInstance.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear cookies regardless of API response
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
    }
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = getCookie('accessToken');
    return !!token;
  },

  // Get stored access token
  getAccessToken(): string | null {
    return getCookie('accessToken');
  },

  // Get stored refresh token
  getRefreshToken(): string | null {
    return getCookie('refreshToken');
  },

  // Clear tokens
  clearTokens(): void {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
  },

  // Error handler
  handleError(error: any): Error {
    if (error.response?.data?.message) {
      return new Error(error.response.data.message);
    } else if (error.message) {
      return new Error(error.message);
    } else {
      return new Error('An unexpected error occurred');
    }
  }
};

export default authService; 