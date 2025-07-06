import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AcademicCapIcon, BuildingLibraryIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../hooks/useAuth';
import toast from 'react-hot-toast';

const Landing = () => {
  const [selectedRole, setSelectedRole] = useState('');
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

  const handleRoleSelection = async (role) => {
    setSelectedRole(role.id);
    setIsLoading(true);
    
    try {
      if (!user) {
        await signInWithGoogle();
      }
      
      // Store user role
      localStorage.setItem('userRole', role.id);
      
      toast.success(`Welcome ${role.name}!`);
      navigate(role.path);
    } catch (error) {
      toast.error('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
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
                onClick={() => handleRoleSelection(role)}
                className={`
                  relative p-8 bg-white rounded-xl shadow-lg cursor-pointer transition-all duration-300 
                  hover:shadow-xl hover:scale-105 border-2 border-transparent
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
                  <button
                    disabled={isLoading}
                    className={`
                      w-full py-3 px-6 rounded-lg font-medium transition-all duration-200
                      ${isLoading && selectedRole === role.id
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                      }
                    `}
                  >
                    {isLoading && selectedRole === role.id ? 'Connecting...' : `Continue as ${role.name}`}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-500">
            Secure authentication powered by Google
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing; 