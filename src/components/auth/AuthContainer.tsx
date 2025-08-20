import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

const AuthContainer: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchToRegister = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="auth-container">
        {isLogin ? (
          <LoginForm onSwitchToRegister={switchToRegister} />
        ) : (
          <RegisterForm onSwitchToLogin={switchToLogin} />
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default AuthContainer; 