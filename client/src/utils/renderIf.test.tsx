import renderif from './renderIf';

describe('renderIf', () => {
  it('should return content if condition is true', () => {
    const condition = true;
    const content = 'content';
    const result = renderif(condition, content);
    expect(result).toBe(content);
  });  
})

describe('renderIf', () => {
  it('should return null if condition is false', () => {
    const condition = false;
    const content = 'content';
    const result = renderif(condition, content);
    expect(result).toBe(null);
  });
});