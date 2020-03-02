import Todo from "../models/Todo";
import * as admin from "firebase-admin";

export default (idToken: string) => {
  return new Promise(function(
    resolve: (uid: string) => void,
    reject: (errMessage: string) => void
  ) {
    if (!idToken) {
      reject("認証情報が見つかりません");
      return;
    }
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(decodedToken => {
        resolve(decodedToken.uid);
      })
      .catch(err => {
        reject("認証に失敗しました");
      });
  });
};
