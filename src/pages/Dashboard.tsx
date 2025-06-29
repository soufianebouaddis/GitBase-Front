import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">GitBase Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              {user && (
                <div className="flex items-center space-x-3">
                  {user.profilePictureUrl && (
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.profilePictureUrl}
                      alt={user.name}
                    />
                  )}
                  <span className="text-gray-700">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Welcome to GitBase!
              </h2>
              <p className="text-gray-600 mb-6">
                You have successfully logged in. Your dashboard is ready.
              </p>
              
              {user && (
                <div className="bg-white p-6 rounded-lg shadow max-w-md mx-auto">
                  <h3 className="text-lg font-semibold mb-4">User Information</h3>
                  <div className="space-y-2 text-left">
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>ID:</strong> {user.id}</p>
                    {user.roles && user.roles.length > 0 && (
                      <p><strong>Roles:</strong> {user.roles.map(role => role.roleName).join(', ')}</p>
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