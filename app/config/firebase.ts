import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, OAuthProvider, signInAnonymously } from 'firebase/auth';
import { Platform } from 'react-native';

// Your web app's Firebase configuration
const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize providers
export const googleProvider = new GoogleAuthProvider();
export const appleProvider = new OAuthProvider('apple.com');

// Configure Google Sign-in
googleProvider.addScope('email');
googleProvider.addScope('profile');

// Configure Apple Sign-in (iOS only)
if (Platform.OS === 'ios') {
  appleProvider.addScope('email');
  appleProvider.addScope('name');
}

// Export anonymous sign-in function
export const signInAnon = () => signInAnonymously(auth); 