import firebase from "./config";
import axios from "axios";

export const signIn = async (
  email: string,
  name: string,
  password: string
): Promise<{
  success: boolean;
  errorMessage?: string;
  userName?: string;
}> => {
  return await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(async res => {
      await res.user.updateProfile({ displayName: name });
      return { success: true, userName: name };
    })
    .catch(error => {
      console.log(error.message);
      return { success: false, errorMessage: error.message };
    });
};

export const login = async (
  email: string,
  password: string
): Promise<{
  success: boolean;
  errorMessage?: string;
  userName?: string;
}> => {
  try {
    return await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(reason => {
        return { success: true, userName: reason.user.displayName };
      })
      .catch(err => {
        return { success: false, errorMessage: err };
      });
  } catch (error) {
    return { success: false };
  }
};

export const logout = async () => {
  try {
    await firebase.auth().signOut();
    return true;
  } catch (error) {
    return false;
  }
};

export const getIdToken = async () => {
  return await firebase
    .auth()
    .currentUser.getIdToken(/* forceRefresh */ true)
    .then(idToken => idToken)
    .catch(error => false);
};

export const checkLogin = (callback: (user: firebase.User) => void) => {
  firebase.auth().onAuthStateChanged(callback);
};
