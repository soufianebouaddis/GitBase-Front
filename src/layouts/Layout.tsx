import React, { useEffect } from "react";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Global/Navbar";
import Sidebar from "../components/Global/Sidebar";
import { setLogoutCallback } from "../axios/axiosInstance";
import { useAppDispatch } from "../features/store";
import { logout } from "../features/auth/authSlice";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleTokenExpired = async () => {
      try {
        await dispatch(logout());
      } catch (error) {
        console.log('Logout action failed:', error);
      } finally {
        navigate('/login', { replace: true });
      }
    };

    setLogoutCallback(handleTokenExpired);

    return () => {
      setLogoutCallback(null);
    };
  }, [navigate, dispatch]);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          <div className="p-6 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout; 