import { checkIfValidUrl } from './checkIfValidUrl';

describe('checkIfValidUrl', () => {
  it('should return true for a valid URL', () => {
    const validURLs = ['https://www.example.com', 'http://example.com', 'ftp://example.com'];

    validURLs.forEach((url) => {
      expect(checkIfValidUrl(url)).toBe(true);
    });
  });

  it('should return false for an invalid URL', () => {
    const invalidURLs = [
      'example.com',
      'www.example.com',
      'https:/example.com',
      'http//example.com',
    ];

    invalidURLs.forEach((url) => {
      expect(checkIfValidUrl(url)).toBe(false);
    });
  });
});
