import * as mongoose from "mongoose";
export interface ITemplateDocument extends mongoose.Document {
  title: string;
  author: any;
  questions: object[];
  memo: string;
  comments: any[];
  tags: string[];
  fav: any[];
  executionCount: number;
  template: string;
  updatedAt: any;
}
const schema = new mongoose.Schema(
  {
    title: {
      type: String
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    questions: [
      {
        type: Object
      }
    ],
    memo: {
      type: String
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
      }
    ],
    tags: [
      {
        type: String
      }
    ],
    template: {
      type: String
    },
    executionCount: {
      type: Number
    },
    fav: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
      }
    ]
  },
  {
    timestamps: true
  }
);

const Todo = mongoose.model<ITemplateDocument>("Template", schema);

export default Todo;
