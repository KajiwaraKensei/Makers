import * as Express from "express";
import authDocument from "../documents/authDocument";
import User from "../models/User";
import * as status from "http-status-codes";
import resSendSuccess from "../documents/resSendSuccess";
import resSendFail from "../documents/resSendFail";

// addUser
// ユーザーの追加
export const addUser = (req: Express.Request, res: Express.Response) => {
  //トークン( req.body.idToken )が正しいかの認証。　正しかったらユーザーIDが帰ってくる
  authDocument(req.body.idToken as string)
    .then(uid => {
      // ユーザーの作成
      const newUser = new User({
        name: req.body.name,
        uid,
        fav: [],
        template: []
      });

      // ユーザーの保存
      return newUser.save();
    })
    .then(result => {
      console.log("Success! _id: " + result._id);
      res
        .status(status.OK)
        .json({ success: true, name: result.name })
        .end();
    })
    .catch(err => {
      res
        .status(status.PRECONDITION_FAILED)
        .json({ success: false, errorMessage: err })
        .end();
    });
};
// changeUserName
// ユーザー名の変更
export const changeUserName = (req: Express.Request, res: Express.Response) => {
  authDocument(req.body.idToken as string)
    .then(async uid => {
      // 対象のユーザーの検索
      let targetUser = await User.findOne({ uid });

      // 変更
      targetUser.name = req.body.name;

      // 保存
      return targetUser.save();
    })
    .then(result => {
      console.log("Success change name! _id: " + result._id);
      res
        .status(status.OK)
        .json({ success: true })
        .end();
    })
    .catch(err => {
      res
        .status(status.PRECONDITION_FAILED)
        .json({ success: false, errorMessage: err })
        .end();
    });
};
export const getUserInfo = (req: Express.Request, res: Express.Response) => {
  authDocument(req.body.idToken as string)
    .then(async uid => {
      // 対象のユーザーの検索
      let targetUser = await User.findOne({ uid }).populate({
        path: "template",
        select: [
          "executionCount",
          "title",
          "fav",
          "tags",
          "memo",
          "comments",
          "updatedAt",
          "template",
          "questions"
        ]
      });
      if (!targetUser) {
        resSendFail(res, status.NOT_FOUND, "見つかりません");
        return;
      }
      let template = [];
      targetUser.template.forEach(one => {
        template = [
          ...template,
          {
            id: one._id,
            title: one.title,
            executionCount: one.executionCount,
            tags: one.tags,
            memo: one.memo,
            fav: one.fav.length,
            comments: one.comments.length,
            date: one.updatedAt,
            questions: one.questions,
            template: one.template
          }
        ];
      });
      console.log(template);

      resSendSuccess(res, { success: true, uid: targetUser.uid, template });
    })
    .catch(err => {
      res
        .status(status.PRECONDITION_FAILED)
        .json({ success: false, errorMessage: err })
        .end();
    });
};
