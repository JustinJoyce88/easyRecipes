import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CategoryItem from './CategoryItem';


describe('CategoryItem', () => {
  const category = {
    name: 'Category Name',
    image: 'https://example.com/image.jpg',
  };

  test('renders category name correctly', () => {
    const { getByText } = render(<CategoryItem item={category} />);
    expect(getByText(category.name)).toBeTruthy();
  });
});