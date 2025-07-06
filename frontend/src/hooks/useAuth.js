import { useState, useEffect } from 'react';
import { auth } from '../config/firebase';
import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendPasswordResetEmail,
  getIdToken
} from 'firebase/auth';
import { authAPI } from '../services/api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          // Get the Firebase ID token
          const idToken = await getIdToken(user);
          
          // Verify with backend (optional, will work in frontend-only mode too)
          try {
            const backendResponse = await authAPI.verifyToken(idToken);
            console.log('Backend verification successful:', backendResponse);
          } catch (backendError) {
            console.log('Backend verification failed, continuing with frontend-only auth:', backendError.message);
          }
          
          // Set user with role from localStorage
          const userRole = localStorage.getItem('userRole') || 'student';
          setUser({
            ...user,
            role: userRole,
            idToken
          });
        } catch (error) {
          console.error('Error getting ID token:', error);
          setUser(user);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await getIdToken(result.user);
      
      // Try to notify backend about the login (optional)
      try {
        const userRole = localStorage.getItem('userRole') || 'student';
        await authAPI.login(idToken, userRole);
      } catch (backendError) {
        console.log('Backend login notification failed, continuing with frontend-only auth:', backendError.message);
      }
      
      return result.user;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const signUpWithEmail = async (email, password, name) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's display name
      await updateProfile(result.user, {
        displayName: name
      });
      
      // Get ID token and register with backend (optional)
      try {
        const idToken = await getIdToken(result.user);
        const userRole = localStorage.getItem('userRole') || 'student';
        await authAPI.register(idToken, userRole, { name });
      } catch (backendError) {
        console.log('Backend registration failed, continuing with frontend-only auth:', backendError.message);
      }
      
      return result.user;
    } catch (error) {
      console.error('Error signing up with email:', error);
      throw error;
    }
  };

  const signInWithEmail = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      
      // Try to notify backend about the login (optional)
      try {
        const idToken = await getIdToken(result.user);
        const userRole = localStorage.getItem('userRole') || 'student';
        await authAPI.login(idToken, userRole);
      } catch (backendError) {
        console.log('Backend login notification failed, continuing with frontend-only auth:', backendError.message);
      }
      
      return result.user;
    } catch (error) {
      console.error('Error signing in with email:', error);
      throw error;
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Try to notify backend about logout (optional)
      if (user && user.idToken) {
        try {
          await authAPI.logout(user.idToken);
        } catch (backendError) {
          console.log('Backend logout notification failed:', backendError.message);
        }
      }
      
      await signOut(auth);
      localStorage.removeItem('userRole');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return {
    user,
    loading,
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
    resetPassword,
    logout
  };
}; 