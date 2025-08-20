import axios from 'axios';

// Logout callback function
let logoutCallback: (() => void) | null = null;
let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: any) => void; reject: (error: any) => void }> = [];
export const setLogoutCallback = (callback: (() => void) | null) => {
  logoutCallback = callback;
};
const processQueue = (error: any, token: any = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

const clearAuthData = () => {
    localStorage.removeItem('authState');
    document.cookie.split(";").forEach((c) => {
        const eqPos = c.indexOf("=");
        const name = eqPos > -1 ? c.substr(0, eqPos) : c;
        document.cookie = name + "=;expires=Thu, 27 Juin 20250 GMT;path=/";
    });
};
// Cookie utility functions


// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8880/api/v1',
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            if (originalRequest.url?.includes('/auth/refreshToken')) {
                clearAuthData();
                if (logoutCallback) {
                    logoutCallback();
                }
                return Promise.reject(error);
            }

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then(token => {
                    return axiosInstance(originalRequest);
                }).catch(err => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                await axiosInstance.post('/auth/refreshToken', {});
                processQueue(null, 'token');
                isRefreshing = false;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                isRefreshing = false;
                clearAuthData();
                if (logoutCallback) {
                    logoutCallback();
                }
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance; 