import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { AcademicCapIcon, UserGroupIcon, ChatBubbleLeftRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

const StudentDashboard = () => {
  const { user, logout } = useAuth();

  const stats = [
    { name: 'Applied Colleges', value: '8', icon: AcademicCapIcon, color: 'bg-blue-500' },
    { name: 'Group Memberships', value: '12', icon: UserGroupIcon, color: 'bg-green-500' },
    { name: 'Questions Asked', value: '24', icon: QuestionMarkCircleIcon, color: 'bg-yellow-500' },
    { name: 'Broker Chats', value: '3', icon: ChatBubbleLeftRightIcon, color: 'bg-purple-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.displayName || 'Student'}</p>
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
          {/* College Exploration */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">College Exploration</h2>
            <div className="space-y-4">
              <p className="text-gray-600">Discover colleges that match your interests and career goals.</p>
              <button className="btn-primary">Browse Colleges</button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">Q</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-900">Asked question in Engineering group</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">J</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-gray-900">Joined MIT College group</p>
                  <p className="text-xs text-gray-500">1 day ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard; 