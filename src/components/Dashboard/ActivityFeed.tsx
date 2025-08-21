import React from 'react';

export const ActivityFeed: React.FC = () => {
    return (
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
    );
};
