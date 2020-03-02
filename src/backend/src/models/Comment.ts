import * as mongoose from "mongoose";
export interface IUserDocument extends mongoose.Document {
  replay: any[];
  template: any;
  value: string;
  user: any;
  updatedAt: any;
}
const schema = new mongoose.Schema(
  {
    replay: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    value: {
      type: String,
      required: true
    },
    template: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Template",
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Comment = mongoose.model<IUserDocument>("Comment", schema);

export default Comment;
