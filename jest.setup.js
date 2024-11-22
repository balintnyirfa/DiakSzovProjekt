import '@testing-library/jest-dom';
import '@testing-library/react';
import '@testing-library/react-native';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import { Alert } from 'react-native';

jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('@react-navigation/native-stack', () => ({
    createNativeStackNavigator: jest.fn().mockReturnValue({
        Navigator: jest.fn(),
        Screen: jest.fn(),
    }),
}));

// Mock Firebase App
jest.mock('firebase/app', () => ({
    initializeApp: jest.fn()
}));

// Mock Firebase Auth
jest.mock('firebase/auth', () => ({
    getAuth: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    getReactNativePersistence: jest.fn(), // Mock getReactNativePersistence
    initializeAuth: jest.fn(),
}));

// Mock Firebase Firestore
jest.mock('firebase/firestore', () => ({
    initializeFirestore: jest.fn(),
    getFirestore: jest.fn(),
    collection: jest.fn(),
    doc: jest.fn(),
    getDoc: jest.fn(),
    setDoc: jest.fn(),
    updateDoc: jest.fn(),
    deleteDoc: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    getDocs: jest.fn(),
}));

// Mock Firebase Storage
jest.mock('firebase/storage', () => ({
    getStorage: jest.fn(),
    ref: jest.fn(),
    getDownloadURL: jest.fn(),
    uploadBytes: jest.fn(),
}));

// Mock Alert
jest.spyOn(Alert, 'alert');