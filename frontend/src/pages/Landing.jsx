import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AcademicCapIcon, BuildingLibraryIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../hooks/useAuth';
import AuthModal from '../components/AuthModal';
import toast from 'react-hot-toast';

const Landing = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  const roles = [
    {
      id: 'student',
      name: 'Student',
      description: 'Find colleges, connect with peers, and get guidance',
      icon: AcademicCapIcon,
      color: 'bg-blue-500',
      path: '/student-dashboard'
    },
    {
      id: 'college',
      name: 'College',
      description: 'Manage applications, connect with students',
      icon: BuildingLibraryIcon,
      color: 'bg-green-500',
      path: '/college-dashboard'
    },
    {
      id: 'broker',
      name: 'Broker',
      description: 'Help students find their perfect college match',
      icon: UserGroupIcon,
      color: 'bg-purple-500',
      path: '/broker-dashboard'
    }
  ];

  const handleRoleSelection = (role) => {
    setSelectedRole(role.id);
    
    if (user) {
      // User is already authenticated, redirect to dashboard
      localStorage.setItem('userRole', role.id);
      navigate(role.path);
    } else {
      // User needs to authenticate
      setIsAuthModalOpen(true);
    }
  };

  const handleQuickGoogleAuth = async (role) => {
    setIsLoading(true);
    
    try {
      await signInWithGoogle();
      localStorage.setItem('userRole', role.id);
      toast.success(`Welcome ${role.name}!`);
      navigate(role.path);
    } catch (error) {
      toast.error('Google authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthModalClose = () => {
    setIsAuthModalOpen(false);
    setSelectedRole('');
  };

  const handleAuthSuccess = () => {
    const role = roles.find(r => r.id === selectedRole);
    if (role) {
      toast.success(`Welcome ${role.name}!`);
      navigate(role.path);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            College Connect
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Bridge your future with the perfect college connection. Whether you're a student, college, or broker, we're here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.id}
                className={`
                  relative p-8 bg-white rounded-xl shadow-lg border-2 border-transparent
                  hover:shadow-xl hover:scale-105 transition-all duration-300
                  ${selectedRole === role.id ? 'ring-2 ring-blue-500' : ''}
                  ${isLoading && selectedRole === role.id ? 'opacity-50' : ''}
                `}
              >
                <div className="text-center">
                  <div className={`${role.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{role.name}</h3>
                  <p className="text-gray-600 mb-6">{role.description}</p>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => handleRoleSelection(role)}
                      disabled={isLoading}
                      className={`
                        w-full py-3 px-6 rounded-lg font-medium transition-all duration-200
                        ${isLoading && selectedRole === role.id
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-500 hover:bg-blue-600 text-white'
                        }
                      `}
                    >
                      {isLoading && selectedRole === role.id 
                        ? 'Loading...' 
                        : user 
                          ? `Go to ${role.name} Dashboard` 
                          : `Sign in as ${role.name}`
                      }
                    </button>
                    
                    {!user && (
                      <button
                        onClick={() => handleQuickGoogleAuth(role)}
                        disabled={isLoading}
                        className="w-full py-2 px-4 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center disabled:opacity-50"
                      >
                        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        Quick Google Sign-in
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-500 mb-4">
            Secure authentication with multiple options
          </p>
          <div className="flex justify-center space-x-4 text-sm text-gray-400">
            <span>• Email & Password</span>
            <span>• Google Sign-in</span>
            <span>• Password Reset</span>
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={handleAuthModalClose}
        userRole={selectedRole}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Landing; 