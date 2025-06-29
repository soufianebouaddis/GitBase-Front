import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from '../pages/Login.tsx';
import RegisterPage from '../pages/Register.tsx';
import Dashboard from '../pages/Dashboard.tsx';
import AuthSuccess from '../pages/AuthSuccess.tsx';
import Error from '../components/Global/Error';
import OAuthCallback from '../components/auth/OAuthCallback';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import type { RootState } from '../features/store';
import { store } from '../features/store';
import { ToastContainer } from 'react-toastify';
import { queryClient } from '../config/query';
import 'react-toastify/dist/ReactToastify.css';

interface AuthCheckProps {
  requiredRoles?: string[];
  children: React.ReactNode;
}

/*const AuthCheck: React.FC<AuthCheckProps> = ({ requiredRoles, children }) => {
  const { isLoggedIn, user } = useSelector((state: RootState) => state.auth);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (requiredRoles && (!user?.roles || !user.roles.some((role: any) => requiredRoles.includes(role.roleName)))) {
    return <Navigate to="/not-allowed" />;
  }

  return <>{children}</>;
};*/


export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error code={404} message="Page Not Found" />,
    children: [
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/register",
        element: <RegisterPage />
      },
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/auth/success",
        element: <AuthSuccess />
      },
      {
        path: "/auth/callback",
        element: <OAuthCallback />
      },
      {
        path: "/not-allowed",
        element: <Error code={403} message="Not allowed to access this route" />
      }
    ]
  }
]);

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer autoClose={3000} position={"bottom-center"} />
      </QueryClientProvider>
    </Provider>
  );
};

export default App; 