import { appleAuth } from "@invertase/react-native-apple-authentication";
import { Auth, OAuthProvider, signInWithCredential } from "firebase/auth";

export async function signInWithAppleIOS(auth: Auth) {
  const appleAuthResponse = await appleAuth.performRequest({
    requestedOperation: appleAuth.Operation.LOGIN,
    requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
  });

  const { identityToken } = appleAuthResponse;
  if (!identityToken) throw new Error("No identity token");

  const provider = new OAuthProvider("apple.com");
  const credential = provider.credential({
    idToken: identityToken,
    rawNonce: "nonce", // You should implement proper nonce handling
  });

  await signInWithCredential(auth, credential);
} 