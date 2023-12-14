import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../config";

function provideErrorMessage(e) {
  switch (e.code) {
    case "auth/email-already-in-use":
      return "Account with such email address already exists.";
    case "auth/invalid-credential":
      return "Invalid email or password.";
    case "auth/invalid-login-credentials":
    case "auth/account-exists-with-different-credential":
      return "Account was registered with different provider. Try again in another way.";
    default:
      return "Something went wrong. Contact us!";
  }
}

export async function signUp({ email, password }) {
  try {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    return credential.user;
  } catch (e) {
    throw new Error(provideErrorMessage(e));
  }
}

export async function signIn({ email, password }) {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return credential.user;
  } catch (e) {
    throw new Error(provideErrorMessage(e));
  }
}

export async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);

    const result = await getRedirectResult(auth);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    return credential.user;
  } catch (e) {
    throw new Error(provideErrorMessage(e));
  }
}

export async function recoverPassword({ email }) {
  try {
    sendPasswordResetEmail(auth, email);
  } catch (e) {
    throw new Error(provideErrorMessage(e));
  }
}
