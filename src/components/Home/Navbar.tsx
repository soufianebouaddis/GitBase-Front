import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-white border-b border-gitbase-border-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-3">
                            <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-r from-gitbase-gradient-start via-gitbase-gradient-mid to-gitbase-gradient-end rounded-xl shadow-lg">
                                <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 12v-2a2 2 0 0 0-2-2h-2V6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-2h2a2 2 0 0 0 2-2zm-6 0H4V6h12v6zm2 0h2v2h-2v-2z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-gitbase-gradient-start via-gitbase-gradient-mid to-gitbase-gradient-end text-transparent bg-clip-text">
                                GitBase
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link
                            to="/login"
                            className="px-4 py-2 text-gitbase-text-dark hover:text-gitbase-primary transition-colors duration-200"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/register"
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-gitbase-gradient-start to-gitbase-gradient-end text-white hover:opacity-90 transition-opacity duration-200 shadow-lg shadow-gitbase-primary/20"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
