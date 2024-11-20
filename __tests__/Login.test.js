import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Login from '../screens/LoginView';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

jest.mock('firebase/auth');

describe('Login successfully', () => {
    it('navigates to Login on successful sign up', async () => {
        const { getByText, getByPlaceholderText } = render(<Login navigation={{ navigate }} />);

        fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
        fireEvent.changeText(getByPlaceholderText('Password'), 'Example1234');
        fireEvent.press(getByText('Sign Up'));

        fireEvent.press(getByText('BEJELENTKEZEK'));

        await waitFor(() => {
            expect(jest.requireMock('firebase/auth').signInWithEmailAndPassword).toHaveBeenCalledWith(
                auth,
                'test@example.com',
                'Example1234'
            );
        });
    });
});