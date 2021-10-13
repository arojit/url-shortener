import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import UrlBox from '../Input/url-box';

afterEach(() => {
    cleanup();
});

test('should render input url box component', () => {
    render(<UrlBox></UrlBox>);

    const inputElement = screen.getByTestId('url-input');
    expect(inputElement).toBeInTheDocument();

    const buttonElement = screen.getByTestId('make-short-url-button');
    expect(buttonElement).toBeInTheDocument();
    
});
