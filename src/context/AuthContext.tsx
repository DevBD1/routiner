import React, { createContext, useContext, useState, useEffect } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithCredential,
  GoogleAuthProvider,
  signInAnonymously as firebaseSignInAnonymously,
  onAuthStateChanged,
  User,
  signInWithPopup,
  signOut as firebaseSignOut,
  linkWithCredential,
  OAuthProvider,
} from "firebase/auth";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { signInWithApple } from "./appleAuth";

// Firebase configuration
const firebaseConfig = {
  apiKey: Platform.OS === 'web' 
    ? process.env.EXPO_PUBLIC_FIREBASE_API_KEY 
    : Constants.expoConfig?.extra?.firebaseApiKey,
  authDomain: Platform.OS === 'web'
    ? process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN
    : Constants.expoConfig?.extra?.firebaseAuthDomain,
  projectId: Platform.OS === 'web'
    ? process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID
    : Constants.expoConfig?.extra?.firebaseProjectId,
  storageBucket: Platform.OS === 'web'
    ? process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET
    : Constants.expoConfig?.extra?.firebaseStorageBucket,
  messagingSenderId: Platform.OS === 'web'
    ? process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
    : Constants.expoConfig?.extra?.firebaseMessagingSenderId,
  appId: Platform.OS === 'web'
    ? process.env.EXPO_PUBLIC_FIREBASE_APP_ID
    : Constants.expoConfig?.extra?.firebaseAppId,
  measurementId: Platform.OS === 'web'
    ? process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
    : Constants.expoConfig?.extra?.firebaseMeasurementId,
};

// Debug Firebase configuration
console.log('Firebase Config:', {
  ...firebaseConfig,
  apiKey: firebaseConfig.apiKey ? '***' : undefined
});

if (!firebaseConfig.apiKey) {
  throw new Error('Firebase API Key is missing. Please check your environment variables.');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Initialize Google Sign In
GoogleSignin.configure({
  webClientId: Constants.expoConfig?.extra?.googleWebClientId,
});

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithApple: () => Promise<void>;
  signInAnonymously: () => Promise<void>;
  signOut: () => Promise<void>;
  linkWithGoogle: () => Promise<void>;
  linkWithApple: () => Promise<void>;
  isAppleSignInAvailable: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      if (Platform.OS === 'web') {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
      } else {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        const tokens = await GoogleSignin.getTokens();
        const credential = GoogleAuthProvider.credential(tokens.idToken);
        await signInWithCredential(auth, credential);
      }
    } catch (error) {
      console.error("Google Sign In Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    if (!isAppleSignInAvailable) {
      throw new Error("Apple Sign In is not available on this platform");
    }

    try {
      setLoading(true);
      await signInWithApple(auth);
    } catch (error) {
      console.error("Apple Sign In Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signInAnonymously = async () => {
    try {
      setLoading(true);
      await firebaseSignInAnonymously(auth);
    } catch (error) {
      console.error("Anonymous Sign In Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      console.log('SignOut: Starting sign out process');
      
      if (Platform.OS === 'web') {
        console.log('SignOut: Web platform detected');
        await firebaseSignOut(auth);
        console.log('SignOut: Firebase sign out completed');
      } else {
        // Handle different sign-in providers
        const providerId = user?.providerData[0]?.providerId;
        console.log('SignOut: Provider ID:', providerId);
        
        if (providerId === 'google.com') {
          await GoogleSignin.signOut();
        } else if (providerId === 'apple.com') {
          // Apple sign-out is handled automatically by Firebase
        }
        await firebaseSignOut(auth);
      }
    } catch (error) {
      console.error("Sign Out Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const linkWithGoogle = async () => {
    try {
      setLoading(true);
      if (!user) throw new Error('No user logged in');

      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const tokens = await GoogleSignin.getTokens();
      const credential = GoogleAuthProvider.credential(tokens.idToken);
      
      await linkWithCredential(user, credential);
      console.log('Successfully linked Google account');
    } catch (error) {
      console.error('Error linking Google account:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const linkWithApple = async () => {
    try {
      setLoading(true);
      if (!user) throw new Error('No user logged in');
      if (!isAppleSignInAvailable) throw new Error('Apple Sign In is not available');

      const credential = await signInWithApple(auth);
      await linkWithCredential(user, credential);
      console.log('Successfully linked Apple account');
    } catch (error) {
      console.error('Error linking Apple account:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const isAppleSignInAvailable = Platform.OS === 'ios' || Platform.OS === 'web';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signInWithApple: handleAppleSignIn,
        signInAnonymously,
        signOut,
        linkWithGoogle,
        linkWithApple,
        isAppleSignInAvailable,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 