import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignUp from '../SignUpView';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

jest.mock('firebase/auth', () => ({
    ...jest.requireActual('firebase/auth'),
    createUserWithEmailAndPassword: jest.fn(),
}));

describe('Successful Sign Up', () => {
    it('navigates to Login on successful sign up', async () => {
        const { getByLabelText } = render(<SignUp navigation={{ navigate }} />);
        
        fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
        fireEvent.changeText(getByPlaceholderText('Password'), 'Example1234');
        
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