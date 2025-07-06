import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { DocumentTextIcon, UserGroupIcon, ChartBarIcon, EyeIcon } from '@heroicons/react/24/outline';

const CollegeDashboard = () => {
  const { user, logout } = useAuth();

  const stats = [
    { name: 'Total Applications', value: '2,847', icon: DocumentTextIcon, color: 'bg-blue-500' },
    { name: 'Profile Views', value: '12,450', icon: EyeIcon, color: 'bg-green-500' },
    { name: 'Student Groups', value: '8', icon: UserGroupIcon, color: 'bg-yellow-500' },
    { name: 'Engagement Rate', value: '89%', icon: ChartBarIcon, color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">College Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.displayName || 'College Admin'}</p>
            </div>
            <button
              onClick={logout}
              className="btn-secondary"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.name} className="card card-hover">
                <div className="flex items-center">
                  <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Application Management */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Application Management</h2>
            <div className="space-y-4">
              <p className="text-gray-600">Review and manage student applications efficiently.</p>
              <button className="btn-primary">Review Applications</button>
            </div>
          </div>

          {/* Student Engagement */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Student Engagement</h2>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">Q</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-900">New question in Engineering group</p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-900">New application submitted</p>
                  <p className="text-xs text-gray-500">3 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeDashboard; 