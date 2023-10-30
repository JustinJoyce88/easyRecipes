import * as SecureStore from 'expo-secure-store';

type userType = {
  username: string;
  admin: boolean;
  userId: string;
};

export default async function retrieveTokenFromKeychain(user: userType) {
  let result = await SecureStore.getItemAsync(user.username);
  if (result) return true;
  else return false;
}
