import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../App.js';

describe('App tests', () => {
    it('should contains the heading 1', () => {
    render(<App />);
        const heading = screen.getByText(/Hello world! I am using React/i);
        expect(heading).toBeInTheDocument()
    });
});
