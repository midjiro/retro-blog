import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../config";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config";

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

export async function signUp({ username, email, password }) {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const authorDoc = doc(db, "users", user.uid);
    await setDoc(authorDoc, { username, email });

    return user;
  } catch (e) {
    throw new Error(provideErrorMessage(e));
  }
}

export async function signIn({ email, password }) {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (e) {
    throw new Error(provideErrorMessage(e));
  }
}

export async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);

    const result = await getRedirectResult(auth);
    const { user } = GoogleAuthProvider.credentialFromResult(result);
    return user;
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
