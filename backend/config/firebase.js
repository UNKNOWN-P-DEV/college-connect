import admin from 'firebase-admin';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Firebase Admin SDK
export const initializeFirebase = () => {
  try {
    // Check if Firebase Admin is already initialized
    if (admin.apps.length > 0) {
      console.log('✅ Firebase Admin SDK already initialized');
      return admin;
    }

    // Check if we have valid credentials
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

    if (!projectId || !privateKey || !clientEmail || 
        privateKey.includes('your-private-key') || 
        clientEmail.includes('xxxxx')) {
      console.log('⚠️  Firebase credentials not configured properly');
      console.log('⚠️  Authentication will work in frontend-only mode');
      console.log('⚠️  To enable full backend authentication, please configure Firebase Admin SDK credentials');
      return null;
    }

    // Try to initialize with service account credentials
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: projectId
      });
    } else {
      // Use individual environment variables
      const serviceAccount = {
        type: "service_account",
        project_id: projectId,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: privateKey.replace(/\\n/g, '\n'),
        client_email: clientEmail,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: process.env.FIREBASE_CLIENT_CERT_URL
      };

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: projectId
      });
    }
    
    console.log('✅ Firebase Admin SDK initialized successfully');
    return admin;
  } catch (error) {
    console.error('🔥 Firebase Admin SDK initialization error:', error.message);
    console.log('⚠️  Continuing without Firebase Admin SDK...');
    console.log('⚠️  Frontend authentication will still work, but backend token verification will be disabled');
    return null;
  }
};

// Helper function to verify Firebase tokens
export const verifyIdToken = async (idToken) => {
  try {
    if (!admin.apps.length) {
      throw new Error('Firebase Admin SDK not initialized');
    }
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    console.error('Error verifying ID token:', error);
    throw error;
  }
};

// Helper function to get user by UID
export const getUserByUid = async (uid) => {
  try {
    if (!admin.apps.length) {
      throw new Error('Firebase Admin SDK not initialized');
    }
    const userRecord = await admin.auth().getUser(uid);
    return userRecord;
  } catch (error) {
    console.error('Error getting user by UID:', error);
    throw error;
  }
};

// Helper function to create custom tokens
export const createCustomToken = async (uid, additionalClaims = {}) => {
  try {
    if (!admin.apps.length) {
      throw new Error('Firebase Admin SDK not initialized');
    }
    const customToken = await admin.auth().createCustomToken(uid, additionalClaims);
    return customToken;
  } catch (error) {
    console.error('Error creating custom token:', error);
    throw error;
  }
};

// Helper function to get Firestore instance
export const getFirestore = () => {
  try {
    if (!admin.apps.length) {
      throw new Error('Firebase Admin SDK not initialized');
    }
    return admin.firestore();
  } catch (error) {
    console.error('Error getting Firestore instance:', error);
    throw error;
  }
};

export default admin; 