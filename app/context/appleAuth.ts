import { Platform } from 'react-native';
import * as AppleAuthentication from 'expo-apple-authentication';
import { OAuthProvider, Auth, AuthCredential } from 'firebase/auth';
import { sha256 } from 'js-sha256';

export async function signInWithApple(auth: Auth): Promise<AuthCredential> {
  if (Platform.OS !== 'ios') {
    throw new Error('Apple authentication is only available on iOS');
  }

  try {
    const nonce = Math.random().toString(36).substring(2);
    const hashedNonce = sha256(nonce);

    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
      nonce: hashedNonce,
    });

    if (!credential.identityToken) {
      throw new Error('No identity token received from Apple');
    }

    const provider = new OAuthProvider('apple.com');
    const oAuthCredential = provider.credential({
      idToken: credential.identityToken,
      rawNonce: nonce,
    });

    return oAuthCredential;
  } catch (error) {
    console.error('Apple Sign In Error:', error);
    throw error;
  }
} 