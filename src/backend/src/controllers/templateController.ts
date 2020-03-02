import * as Express from "express";
import authDocument from "../documents/authDocument";
import * as status from "http-status-codes";
import User from "../models/User";
import Template, { ITemplateDocument } from "../models/Template";
import resSendFail from "../documents/resSendFail";
import resSendSuccess from "../documents/resSendSuccess";

// ______________________________________________________
// addTemplate
// テンプレートの追加

export const addTemplate = (req: Express.Request, res: Express.Response) => {
  try {
    //トークン ( req.body.idToken ) が正しいかの検証。　正しければユーザーIDが帰ってくる
    authDocument(req.body.idToken as string)
      .then(async uid => {
        let targetUser = await User.findOne({ uid });
        console.log(targetUser);

        console.log("_id: " + targetUser._id);

        // テンプレートの作成
        const { title, questions, memo, tags, template } = req.body;
        const newTemplate = new Template({
          title,
          author: targetUser._id,
          questions,
          memo,
          comments: [],
          tags,
          template,
          executionCount: 0
        });

        // テンプレートの保存
        const result = await newTemplate.save();

        // ユーザー情報の変更
        targetUser.template = [...targetUser.template, result._id];

        // ユーザーの保存
        await targetUser.save();

        console.log("Success! _id: " + result._id);
        resSendSuccess(res, {
          success: true,
          id: result._id
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
// ______________________________________________________
// updateTemplate

export const updateTemplate = (req: Express.Request, res: Express.Response) => {
  try {
    console.log("try template update");

    authDocument(req.body.idToken as string)
      .then(async uid => {
        console.log("uid: " + uid);
        console.log("id: " + req.body.id);
        console.log("data: ");
        console.log(req.body.data);
        const targetUser = await User.findOne({ uid });
        console.log("targetUser: ");
        console.log(targetUser);

        // デンプレートの更新
        Template.updateOne(
          { _id: req.body.id, author: targetUser._id },
          { $set: req.body.data },
          (error, raw) => {
            if (error) {
              console.log("error: ");

              console.log(error);
              resSendFail(res, status.EXPECTATION_FAILED, error);
            } else {
              console.log(raw);
              resSendSuccess(res);
            }
          }
        );
      })
      .catch(error => {
        resSendFail(res, status.PRECONDITION_FAILED, error);
      });
  } catch {
    error => {
      console.log(error);
      resSendFail(res, status.INTERNAL_SERVER_ERROR, "サーバーエラー");
    };
  }
};

// ______________________________________________________
// countUpTemplate

export const countUpTemplate = async (
  req: Express.Request,
  res: Express.Response
) => {
  try {
    let targetTemplate = await Template.findById(req.body.id);
    console.log(targetTemplate);
    if (!!!targetTemplate) {
      resSendFail(res, status.NOT_FOUND, "テンプレートが見つかりませんでした");
      return;
    }
    targetTemplate.executionCount++;
    targetTemplate.save();
    resSendSuccess(res);
  } catch {
    error => {
      console.log(error);
      resSendFail(res, status.INTERNAL_SERVER_ERROR, "サーバーエラー");
    };
  }
};
// ______________________________________________________
//
export const doTemplateFav = (req: Express.Request, res) => {
  try {
    //トークン ( req.body.idToken ) が正しいかの検証。　正しければユーザーIDが帰ってくる
    authDocument(req.body.idToken as string)
      .then(async uid => {
        let targetTemplate = await Template.findOne({ _id: req.body.id });
        let targetUser = await User.findOne({ uid });
        targetUser.fav.push(targetTemplate._id);
        targetUser.fav = targetUser.fav.filter(
          (x, i, self) => self.indexOf(x) === i
        );
        targetTemplate.fav.push(targetTemplate._id);
        targetTemplate.fav = targetTemplate.fav.filter(
          (x, i, self) => self.indexOf(x) === i
        );

        targetTemplate.save();
        targetUser.save();
        resSendSuccess(res);
      })
      .catch(error => {
        resSendFail(res, status.PRECONDITION_FAILED, error);
      });
  } catch {
    error => {
      console.log(error);
      resSendFail(res, status.INTERNAL_SERVER_ERROR, "サーバーエラー");
    };
  }
};
// ______________________________________________________
//

export const doDeleteTemplateFav = (req: Express.Request, res) => {
  try {
    //トークン ( req.body.idToken ) が正しいかの検証。　正しければユーザーIDが帰ってくる
    authDocument(req.body.idToken as string)
      .then(async uid => {
        let targetTemplate = await Template.findOne({ _id: req.body.id });
        let targetUser = await User.findOne({ uid });

        targetUser.fav = targetUser.fav.filter(v => v !== targetTemplate._id);
        targetTemplate.fav = targetTemplate.fav.filter(
          v => v !== targetUser._id
        );
        targetTemplate.save();
        targetUser.save();
        resSendSuccess(res);
      })
      .catch(error => {
        resSendFail(res, status.PRECONDITION_FAILED, error);
      });
  } catch {
    error => {
      console.log(error);
      resSendFail(res, status.INTERNAL_SERVER_ERROR, "サーバーエラー");
    };
  }
};
// ______________________________________________________
// countUpTemplate

export const getTemplate = async (req: Express.Request, res) => {
  try {
    const templateId = req.body.templateId;
    console.log(templateId);

    await Template.findById(
      templateId,
      (err: any, targetTemplate: ITemplateDocument) => {
        if (err) {
          console.log("見つからない");
          resSendFail(res, status.PRECONDITION_FAILED, "見つかりませんでした");
          return;
        }
        console.log("success");
        console.log(targetTemplate);

        resSendSuccess(res, {
          success: true,
          author: targetTemplate.author,
          title: targetTemplate.title,
          questions: targetTemplate.questions,
          memo: targetTemplate.memo,
          tags: targetTemplate.tags,
          template: targetTemplate.template,
          fav: targetTemplate.fav.length
        });
      }
    );
  } catch {
    error => {
      console.log(error);
      resSendFail(res, status.INTERNAL_SERVER_ERROR, "サーバーエラー");
    };
  }
};

export const showTemplates = (req: Express.Request, res: Express.Response) => {
  try {
    console.log("show");

    const query = req.query;
    let QueryData = {
      range: 10,
      page: 1,
      sort: 0,
      order: -1,
      tags: [],
      keywords: []
    };
    if (query.range) {
      const range = query.range - 0;
      if (range <= 100 && 0 < range) {
        QueryData["range"] = range;
      }
    }
    if (query.page) {
      if (query.page - 0 > 0) QueryData["page"] = query.page - 0;
    }
    if (query.sort) {
      const sort = query.sort - 0;
      if (0 <= sort && sort < 3) {
        QueryData["sort"] = sort;
      }
    }
    if (query.order) {
      const order = query.order - 0;
      if (order === 1) QueryData["order"] = 1;
    }
    if (query.tags) {
      //const tags = query.tags.split("||");
      //let _tags = [];
      //tags.forEach(tag => _tags.push(new RegExp(tag)));
      QueryData["tags"] = (query.tags as string).split("||");
    }

    if (query.keywords) {
      const keywords = (query.keywords as string).split("||");
      let _keywords = [];
      keywords.forEach(keyword => _keywords.push(new RegExp(keyword)));
      QueryData["keywords"] = _keywords;
    }
    let ob = {};
    if (QueryData.keywords.length && QueryData.tags.length) {
      ob = {
        $and: [
          {
            $or: [
              { title: { $in: QueryData.keywords } },
              { template: { $in: QueryData.keywords } },
              { memo: { $in: QueryData.keywords } }
            ]
          },
          { tags: { $in: QueryData.tags } }
        ]
      };
    } else if (QueryData.keywords.length) {
      ob = {
        $or: [
          { title: { $in: QueryData.keywords } },
          { template: { $in: QueryData.keywords } },
          { memo: { $in: QueryData.keywords } }
        ]
      };
    } else if (QueryData.tags.length) {
      ob = { tags: { $in: QueryData.tags } };
    }
    Template.find(ob)
      .sort(getSortKey(QueryData.sort, QueryData.order))
      .skip(QueryData.range * (QueryData.page - 1))
      .limit(QueryData.range)
      .populate([{ path: "author", select: "name" }])
      .exec(async (error, result) => {
        if (error) {
          console.log(error);

          resSendFail(res, status.NOT_FOUND, "見つかりませんでした");
          return;
        }
        let sendData = [];
        result.forEach(one => {
          console.log(one.updatedAt);
          const {
            questions,
            comments,
            tags,
            fav,
            _id,
            title,
            author,
            memo,
            template,
            executionCount,
            updatedAt
          } = one;
          sendData = [
            ...sendData,
            {
              id: _id,
              questions,
              comments: comments.length,
              tags,
              fav: fav.length,
              title,
              author: author ? author : { _id: "", name: "不明" },
              memo,
              template,
              executionCount,
              date: updatedAt
            }
          ];
        });
        const hit = await Template.find(ob).count();
        console.log(sendData);

        resSendSuccess(res, {
          success: true,
          result: sendData,
          recordsCount: sendData.length,
          page: QueryData.page,
          range: QueryData.range,
          hit
        });
      })
      .catch(err => {
        console.log(err);
        resSendFail(res, status.PRECONDITION_FAILED, "エラー");
      });
  } catch {
    error => {
      console.log(error);
      resSendFail(res, status.INTERNAL_SERVER_ERROR, "サーバーエラー");
    };
  }
};

const getSortKey = (sort, order) => {
  const sortType = ["updatedAt", "fav", "executionCount"];
  const ob = {};
  ob[sortType[sort]] = order;
  console.log(ob);
  return ob;
};
