import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gitbase-dark">
      <nav className="bg-gitbase-secondary border-b border-gitbase-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <svg className="h-8 w-8 text-white" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              <h1 className="text-xl font-semibold text-white">GitBase Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              {user && (
                <div className="flex items-center space-x-3">
                  {user.profilePictureUrl && (
                    <img
                      className="h-8 w-8 rounded-full border border-gitbase-border"
                      src={user.profilePictureUrl}
                      alt={user.name}
                    />
                  )}
                  <span className="text-white">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-transparent hover:bg-gitbase-border text-white px-3 py-1 rounded-md text-sm border border-gitbase-border transition-colors"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border border-gitbase-border rounded-lg bg-gitbase-secondary p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Welcome to GitBase!
              </h2>
              <p className="text-gray-400 mb-6">
                Build and ship software on a single, collaborative platform.
              </p>

              {user && (
                <div className="bg-gitbase-dark border border-gitbase-border p-6 rounded-lg max-w-md mx-auto">
                  <h3 className="text-lg font-semibold mb-4 text-white">Profile Information</h3>
                  <div className="space-y-3 text-left">
                    <div className="flex items-center space-x-2">
                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      <p className="text-gray-300"><span className="text-gray-400">Name:</span> {user.name}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <p className="text-gray-300"><span className="text-gray-400">Email:</span> {user.email}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                      </svg>
                      <p className="text-gray-300"><span className="text-gray-400">ID:</span> {user.id}</p>
                    </div>
                    {user.roles && user.roles.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <p className="text-gray-300">
                          <span className="text-gray-400">Roles:</span>{' '}
                          {user.roles.map(role => (
                            <span key={role.roleName} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gitbase-border text-gray-300 ml-1">
                              {role.roleName}
                            </span>
                          ))}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 