import express from 'express';
import admin from '../config/firebase.js';

const router = express.Router();

// Check if Firebase Admin SDK is available
const isFirebaseAvailable = () => {
  return admin && admin.apps && admin.apps.length > 0;
};

// Middleware to verify Firebase token (optional when Firebase Admin is not available)
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    if (!isFirebaseAvailable()) {
      // If Firebase Admin is not available, skip token verification
      console.log('⚠️  Firebase Admin SDK not available, skipping token verification');
      req.user = { uid: 'demo-user', email: 'demo@example.com' };
      return next();
    }

    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// POST /api/auth/login - Handle login requests
router.post('/login', async (req, res) => {
  try {
    const { idToken, role } = req.body;

    if (!idToken) {
      return res.status(400).json({ error: 'ID token is required' });
    }

    if (!isFirebaseAvailable()) {
      // Frontend-only mode: just return success
      console.log('⚠️  Firebase Admin SDK not available, using frontend-only authentication');
      return res.json({
        message: 'Login successful (frontend-only mode)',
        user: {
          uid: 'demo-user',
          email: 'demo@example.com',
          displayName: 'Demo User',
          role: role || 'student'
        },
        token: idToken
      });
    }

    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    // Get user details from Firebase
    const userRecord = await admin.auth().getUser(decodedToken.uid);
    
    const userData = {
      uid: decodedToken.uid,
      email: decodedToken.email || userRecord.email,
      displayName: decodedToken.name || userRecord.displayName,
      photoURL: decodedToken.picture || userRecord.photoURL,
      emailVerified: decodedToken.email_verified || userRecord.emailVerified,
      role: role || 'student',
      createdAt: new Date(userRecord.metadata.creationTime),
      lastSignInAt: new Date(userRecord.metadata.lastSignInTime)
    };

    res.json({
      message: 'Login successful',
      user: userData,
      token: idToken
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ error: 'Authentication failed' });
  }
});

// POST /api/auth/register - Handle user registration
router.post('/register', async (req, res) => {
  try {
    const { idToken, role, additionalData } = req.body;

    if (!idToken) {
      return res.status(400).json({ error: 'ID token is required' });
    }

    if (!isFirebaseAvailable()) {
      // Frontend-only mode: just return success
      console.log('⚠️  Firebase Admin SDK not available, using frontend-only authentication');
      return res.json({
        message: 'Registration successful (frontend-only mode)',
        user: {
          uid: 'demo-user',
          email: 'demo@example.com',
          displayName: 'Demo User',
          role: role || 'student',
          ...additionalData
        },
        token: idToken
      });
    }

    // Verify the Firebase ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    // Get user details from Firebase
    const userRecord = await admin.auth().getUser(decodedToken.uid);
    
    const userData = {
      uid: decodedToken.uid,
      email: decodedToken.email || userRecord.email,
      displayName: decodedToken.name || userRecord.displayName,
      photoURL: decodedToken.picture || userRecord.photoURL,
      emailVerified: decodedToken.email_verified || userRecord.emailVerified,
      role: role || 'student',
      ...additionalData,
      createdAt: new Date(userRecord.metadata.creationTime),
      lastSignInAt: new Date(userRecord.metadata.lastSignInTime)
    };

    // TODO: Save user data to database
    // await saveUserToDatabase(userData);

    res.json({
      message: 'Registration successful',
      user: userData,
      token: idToken
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ error: 'Registration failed' });
  }
});

// GET /api/auth/profile - Get current user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    if (!isFirebaseAvailable()) {
      return res.json({
        message: 'Profile retrieved successfully (frontend-only mode)',
        user: req.user
      });
    }

    const userRecord = await admin.auth().getUser(req.user.uid);
    
    const userData = {
      uid: req.user.uid,
      email: req.user.email || userRecord.email,
      displayName: req.user.name || userRecord.displayName,
      photoURL: req.user.picture || userRecord.photoURL,
      emailVerified: req.user.email_verified || userRecord.emailVerified,
      createdAt: new Date(userRecord.metadata.creationTime),
      lastSignInAt: new Date(userRecord.metadata.lastSignInTime)
    };

    res.json({
      message: 'Profile retrieved successfully',
      user: userData
    });
  } catch (error) {
    console.error('Profile retrieval error:', error);
    res.status(500).json({ error: 'Failed to retrieve profile' });
  }
});

// POST /api/auth/refresh - Refresh user token
router.post('/refresh', authenticateToken, async (req, res) => {
  try {
    if (!isFirebaseAvailable()) {
      return res.json({
        message: 'Token refresh not available (frontend-only mode)',
        customToken: null
      });
    }

    const { additionalClaims } = req.body;
    
    // Create a custom token with additional claims
    const customToken = await admin.auth().createCustomToken(req.user.uid, additionalClaims);
    
    res.json({
      message: 'Token refreshed successfully',
      customToken
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({ error: 'Failed to refresh token' });
  }
});

// POST /api/auth/logout - Logout user (client-side mainly)
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    // Note: Firebase doesn't have server-side logout for ID tokens
    // The client should clear the token from their storage
    res.json({
      message: 'Logout successful'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Logout failed' });
  }
});

// GET /api/auth/verify - Verify token validity
router.get('/verify', authenticateToken, async (req, res) => {
  try {
    res.json({
      message: 'Token is valid',
      user: {
        uid: req.user.uid,
        email: req.user.email,
        displayName: req.user.name || req.user.displayName,
        emailVerified: req.user.email_verified
      }
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({ error: 'Token verification failed' });
  }
});

// GET /api/auth/status - Check authentication system status
router.get('/status', (req, res) => {
  res.json({
    message: 'Authentication system status',
    firebaseAdminAvailable: isFirebaseAvailable(),
    mode: isFirebaseAvailable() ? 'full-backend' : 'frontend-only'
  });
});

export default router; 