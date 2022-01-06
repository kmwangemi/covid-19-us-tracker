import { render, screen } from '@testing-library/react';
import App from './App';

test('renders total confirmed cases', () => {
   render(<App />);
   const textHeading = screen.getByText(/total confirmed cases/i);
   expect(textHeading).toBeInTheDocument();
});


