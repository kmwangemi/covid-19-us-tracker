import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import SearchMap from './SearchMap';

test('input should be initially empty', () => {
   render(<SearchMap />);
   const searchInputElement = screen.getByRole("searchbox");
   expect(searchInputElement.value).toBe("");
});