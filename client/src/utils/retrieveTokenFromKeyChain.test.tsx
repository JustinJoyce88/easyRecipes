import retrieveTokenFromKeychain from './retrieveTokenFromKeychain';
import * as SecureStore from 'expo-secure-store';

type userType = {
  username: string;
  admin: boolean;
  userId: string;
};

const user: userType = {
  username: 'testUser',
  admin: false,
  userId: '123',
};

describe('retrieveTokenFromKeychain', () => {
  it('should return true if token exists in keychain', async () => {
    const mockGetItemAsync = jest.spyOn(SecureStore, 'getItemAsync').mockResolvedValue('token');
    const result = await retrieveTokenFromKeychain(user);
    expect(result).toBe(true);
    expect(mockGetItemAsync).toHaveBeenCalledWith(user.username);
    mockGetItemAsync.mockRestore();
  });

  it('should return false if token does not exist in keychain', async () => {
    const mockGetItemAsync = jest.spyOn(SecureStore, 'getItemAsync').mockResolvedValue(null);
    const result = await retrieveTokenFromKeychain(user);
    expect(result).toBe(false);
    expect(mockGetItemAsync).toHaveBeenCalledWith(user.username);
    mockGetItemAsync.mockRestore();
  });
});
