import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Login from './Login';
import Signup from './Signup';

const AuthModal = ({ isOpen, onClose, userRole }) => {
  const [isSignup, setIsSignup] = useState(false);

  if (!isOpen) return null;

  const toggleMode = () => {
    setIsSignup(!isSignup);
  };

  const handleClose = () => {
    setIsSignup(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-screen overflow-y-auto">
        <div className="sticky top-0 bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">
            {isSignup ? 'Create Account' : 'Sign In'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6">
          {isSignup ? (
            <Signup 
              onToggleMode={toggleMode}
              onClose={handleClose}
              userRole={userRole}
            />
          ) : (
            <Login 
              onToggleMode={toggleMode}
              onClose={handleClose}
              userRole={userRole}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal; 