import { Auth, OAuthProvider, signInWithPopup } from "firebase/auth";

export async function signInWithAppleWeb(auth: Auth) {
  const provider = new OAuthProvider("apple.com");
  await signInWithPopup(auth, provider);
} 