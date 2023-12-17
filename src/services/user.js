import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { auth, storage } from "../config";
import { getDownloadURL, ref } from "firebase/storage";

function provideErrorMessage(e) {
  switch (e.code) {
    case "auth/email-already-in-use":
      return "Account with such email address already exists.";
    case "auth/invalid-credential":
      return "Invalid email or password.";
    case "auth/account-exists-with-different-credential":
      return "Account was registered with different provider. Try again in another way.";
    case "auth/invalid-login-credentials":
      return "Invalid email or password. Check them and try again.";
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

    const defaultAvatarRef = ref(
      storage,
      "gs://retro-blog-3d46c.appspot.com/Default Avatar.png"
    );
    const defaultAvatarURL = await getDownloadURL(defaultAvatarRef);

    await updateProfile(user, {
      displayName: username,
      photoURL: defaultAvatarURL,
    });

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
    debugger;
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
