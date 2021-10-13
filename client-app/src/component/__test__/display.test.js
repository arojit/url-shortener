import { render, screen, cleanup } from '@testing-library/react';
import ShortURLs from '../Display/short-urls';

afterEach(() => {
    cleanup();
});

test('should render display short urls component', () => {
    let data = [{
        "created_datetime": "Wed, 13 Oct 2021 17:48:02 GMT",
        "hit_counter": 0,
        "short_url": "BCF83A2698"
    }];
    render(<ShortURLs urls={data}></ShortURLs>);

    const anchorElement = screen.getByTestId('url-0');
    expect(anchorElement).toBeInTheDocument();
    expect(anchorElement).toHaveAttribute('href', 'http://localhost:5000/BCF83A2698');
});