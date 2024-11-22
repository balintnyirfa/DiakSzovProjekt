import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignUp from '../screens/SignUpView';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

jest.mock('firebase/auth', () => ({
    ...jest.requireActual('firebase/auth'),
    createUserWithEmailAndPassword: jest.fn(),
}));

describe('Successful Sign Up', () => {
    it('Executes a successful sign up action', async () => {
        const { getByLabelText } = render(<SignUp navigation={{ navigate }} />);
        
        fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
        fireEvent.changeText(getByPlaceholderText('Password'), 'Example1234');

        expect(getByPlaceholderText('Email').props.value).toBeTruthy();
        expect(getByPlaceholderText('Password').props.value).toBeTruthy();
        expect(getByPlaceholderText('Email').props.value).toContain('@');;
        expect(getByPlaceholderText('Password').props.value).toBeGreaterThanOrEqual(6);
        
        fireEvent.press(getByText('REGISZTRÁLOK'));

        await waitFor(() => {
            expect(jest.requireMock('firebase/auth').createUserWithEmailAndPassword).toHaveBeenCalledWith(
                auth,
                'test@example.com',
                'Example1234'
              );
        });
    });
});