import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gitbase-dark via-gitbase-secondary to-gitbase-dark">
      <nav className="bg-white/5 backdrop-blur-xl border-b border-gitbase-border-light/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-gitbase-gradient-start to-gitbase-gradient-end rounded-xl shadow-lg shadow-gitbase-primary/20">
                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 12v-2a2 2 0 0 0-2-2h-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-2h2a2 2 0 0 0 2-2zm-6 0H4V6h12v6zm2 0h2v2h-2v-2z" />
                </svg>
              </div>
              <h1 className="text-xl font-semibold text-gitbase-text-primary">GitBase Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              {user && (
                <div className="flex items-center space-x-4">
                  {user.profilePictureUrl && (
                    <div className="relative">
                      <img
                        className="h-8 w-8 rounded-lg border-2 border-gitbase-primary shadow-md"
                        src={user.profilePictureUrl}
                        alt={user.name}
                      />
                      <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-gitbase-success rounded-full border-2 border-gitbase-secondary"></div>
                    </div>
                  )}
                  <span className="text-gitbase-text-primary font-medium">{user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-gitbase-primary/10 hover:bg-gitbase-primary/20 text-gitbase-primary px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white/10 backdrop-blur-xl p-8 border border-gitbase-border-light/10 shadow-xl">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-gitbase-gradient-start via-gitbase-gradient-mid to-gitbase-gradient-end text-transparent bg-clip-text mb-4">
                  Welcome to GitBase!
                </h2>
                <p className="text-gitbase-text-secondary/90 mb-6">
                  Build and ship software on a single, collaborative platform.
                </p>

                {user && (
                  <div className="bg-gradient-to-br from-gitbase-dark/50 to-gitbase-secondary/50 backdrop-blur-xl border border-gitbase-border-light/10 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold mb-6 bg-gradient-to-r from-gitbase-gradient-start to-gitbase-gradient-end text-transparent bg-clip-text flex items-center">
                      <svg className="w-5 h-5 mr-2 text-gitbase-primary-light" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      Profile Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 group">
                        <div className="p-2 bg-gitbase-primary/10 rounded-lg text-gitbase-primary group-hover:bg-gitbase-primary/20 transition-colors">
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-gitbase-text-secondary text-sm">Name</p>
                          <p className="text-gitbase-text-primary font-medium">{user.name}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 group">
                        <div className="p-2 bg-gitbase-accent/10 rounded-lg text-gitbase-accent group-hover:bg-gitbase-accent/20 transition-colors">
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-gitbase-text-secondary text-sm">Email</p>
                          <p className="text-gitbase-text-primary font-medium">{user.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 group">
                        <div className="p-2 bg-gitbase-success/10 rounded-lg text-gitbase-success group-hover:bg-gitbase-success/20 transition-colors">
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-gitbase-text-secondary text-sm">ID</p>
                          <p className="text-gitbase-text-primary font-medium">{user.id}</p>
                        </div>
                      </div>

                      {user.roles && user.roles.length > 0 && (
                        <div className="flex items-center space-x-3 group">
                          <div className="p-2 bg-gitbase-warning/10 rounded-lg text-gitbase-warning group-hover:bg-gitbase-warning/20 transition-colors">
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-gitbase-text-secondary text-sm">Roles</p>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {user.roles.map(role => (
                                <span key={role.roleName} className="inline-flex items-center px-2.5 py-0.5 rounded-lg text-xs font-medium bg-gitbase-primary/10 text-gitbase-primary">
                                  {role.roleName}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl bg-white/10 backdrop-blur-xl p-8 border border-gitbase-border-light/10 shadow-xl">
                <h3 className="text-lg font-semibold mb-6 bg-gradient-to-r from-gitbase-gradient-start via-gitbase-gradient-mid to-gitbase-gradient-end text-transparent bg-clip-text flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gitbase-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center space-x-3 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-gitbase-border-light/10 transition-all duration-200 group backdrop-blur-xl shadow-lg hover:shadow-xl">
                    <div className="p-2 bg-gradient-to-br from-gitbase-gradient-start to-gitbase-gradient-end rounded-lg text-white shadow-lg shadow-gitbase-primary/10">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <span className="text-gitbase-text-primary font-medium">New Repository</span>
                  </button>
                  <button className="flex items-center space-x-3 p-4 rounded-lg bg-gitbase-dark hover:bg-gitbase-secondary border border-gitbase-border transition-all duration-200 group">
                    <div className="p-2 bg-gitbase-accent/10 rounded-lg text-gitbase-accent group-hover:bg-gitbase-accent/20">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-gitbase-text-primary font-medium">Clone Repo</span>
                  </button>
                  <button className="flex items-center space-x-3 p-4 rounded-lg bg-gitbase-dark hover:bg-gitbase-secondary border border-gitbase-border transition-all duration-200 group">
                    <div className="p-2 bg-gitbase-success/10 rounded-lg text-gitbase-success group-hover:bg-gitbase-success/20">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <span className="text-gitbase-text-primary font-medium">Projects</span>
                  </button>
                  <button className="flex items-center space-x-3 p-4 rounded-lg bg-gitbase-dark hover:bg-gitbase-secondary border border-gitbase-border transition-all duration-200 group">
                    <div className="p-2 bg-gitbase-warning/10 rounded-lg text-gitbase-warning group-hover:bg-gitbase-warning/20">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <span className="text-gitbase-text-primary font-medium">Teams</span>
                  </button>
                </div>
              </div>

              <div className="rounded-2xl bg-white/10 backdrop-blur-xl p-8 border border-gitbase-border-light/10 shadow-xl">
                <h3 className="text-lg font-semibold mb-6 bg-gradient-to-r from-gitbase-gradient-start via-gitbase-gradient-mid to-gitbase-gradient-end text-transparent bg-clip-text flex items-center">
                  <svg className="w-5 h-5 mr-2 text-gitbase-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  Activity
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gitbase-border group">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gitbase-primary/10 rounded-lg text-gitbase-primary group-hover:bg-gitbase-primary/20">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gitbase-text-primary font-medium">New repository created</p>
                        <p className="text-gitbase-text-secondary text-sm">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gitbase-border group">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gitbase-success/10 rounded-lg text-gitbase-success group-hover:bg-gitbase-success/20">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-gitbase-text-primary font-medium">Pull request merged</p>
                        <p className="text-gitbase-text-secondary text-sm">5 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;