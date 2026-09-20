/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * Firebase Configuration for VICI Yoga Therapy CRM
 * Provides fallback defaults and environment variable overrides for local, Vercel, and Cloud deployments.
 */

export interface FirebaseConfig {
  projectId: string;
  appId: string;
  apiKey: string;
  authDomain: string;
  firestoreDatabaseId: string;
  storageBucket: string;
  messagingSenderId: string;
  measurementId?: string;
  oAuthClientId?: string;
  recaptchaSiteKey?: string;
}

export const DEFAULT_FIREBASE_CONFIG: FirebaseConfig = {
  projectId: 'banded-fulcrum-fc9s2',
  appId: '1:451250385985:web:484c1456d855b9f90c02c0',
  apiKey: 'AIzaSyD89b2JaT2hwrK4BftB56GJSFA3o5HQzYY',
  authDomain: 'banded-fulcrum-fc9s2.firebaseapp.com',
  firestoreDatabaseId: 'ai-studio-viciyogatherapyt-eb802637-51c9-4a17-8a53-9bef4222b8b1',
  storageBucket: 'banded-fulcrum-fc9s2.firebasestorage.app',
  messagingSenderId: '451250385985',
  measurementId: '',
  oAuthClientId: '451250385985-s9jsis6ek86024ksu014q7mag8h5ju6e.apps.googleusercontent.com',
  recaptchaSiteKey: '',
};

export const activeFirebaseConfig: FirebaseConfig = {
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || DEFAULT_FIREBASE_CONFIG.projectId,
  appId: import.meta.env.VITE_FIREBASE_APP_ID || DEFAULT_FIREBASE_CONFIG.appId,
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || DEFAULT_FIREBASE_CONFIG.apiKey,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || DEFAULT_FIREBASE_CONFIG.authDomain,
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_DATABASE_ID || DEFAULT_FIREBASE_CONFIG.firestoreDatabaseId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || DEFAULT_FIREBASE_CONFIG.storageBucket,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || DEFAULT_FIREBASE_CONFIG.messagingSenderId,
};
