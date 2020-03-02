import * as Express from "express";
import authDocument from "../documents/authDocument";
import User from "../models/User";
import Comment from "../models/Comment";
import Template from "../models/Template";
import * as status from "http-status-codes";
import resSendFail from "../documents/resSendFail";
import resSendSuccess from "../documents/resSendSuccess";

// コメントの追加
export const addComment = (req: Express.Request, res: Express.Response) => {
  try {
    authDocument(req.body.idToken as string)
      .then(async uid => {
        const { value, template_id, comment_id } = req.body;
        const targetUser = await User.findOne({ uid });
        let targetTemplate = await Template.findById(template_id);
        const newComment = new Comment({
          replay: [],
          template: targetTemplate._id,
          user: targetUser._id,
          value
        });
        const result = await newComment.save();

        if (comment_id) {
          let targetComment = await Comment.findById(comment_id);
          targetComment.replay.push(result._id);
          await targetComment.save();
        }
        targetTemplate.comments.push(result._id);
        targetTemplate.save();
        const sendCommentData = {
          value: result.value,
          date: result.updatedAt,
          contributor: {
            name: "あなた",
            uid
          }
        };
        resSendSuccess(res, { success: true, comment: sendCommentData });
      })

      .catch(error => {
        resSendFail(res, status.PRECONDITION_FAILED, error);
      });
  } catch {}
};

// コメントの取得
export const getComment = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    const query = req.query;
    await Comment.find({
      template: query.template_id
    })
      .sort({ updatedAt: -1 })
      .populate({ path: "user", select: ["name", "uid"] })
      .then(reasons => {
        const sendData = [];
        reasons.forEach(reason => {
          sendData.push({
            value: reason.value,
            date: reason.updatedAt,
            contributor: {
              name: reason.user ? reason.user.name : "不明",
              uid: reason.user ? reason.user.uid : "124"
            }
          });
        });
        console.log(sendData);

        resSendSuccess(res, {
          success: true,
          result: sendData,
          commentCount: sendData.length
        });
      })
      .catch(error => {
        console.log(error);

        resSendFail(res, status.PRECONDITION_FAILED, error);
      });
  } catch {
    error => {
      console.log(error);
      resSendFail(res, status.INTERNAL_SERVER_ERROR, "サーバーエラー");
    };
  }
};
