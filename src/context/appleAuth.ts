import * as AppleAuthentication from 'expo-apple-authentication';
import { OAuthProvider, Auth, AuthCredential } from 'firebase/auth';

export async function signInWithApple(auth: Auth): Promise<AuthCredential> {
  try {
    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    const provider = new OAuthProvider('apple.com');
    const oAuthCredential = provider.credential({
      idToken: credential.identityToken!,
      rawNonce: credential.nonce,
    });

    return oAuthCredential;
  } catch (error) {
    throw error;
  }
} 