import * as mongoose from "mongoose";
export interface IUserDocument extends mongoose.Document {
  name: string;
  uid: string;
  fav: any[];
  template: any[];
}
const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    uid: {
      type: String,
      required: true
    },
    fav: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Template"
      }
    ],
    template: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Template",
        required: true
      }
    ]
  },
  {
    timestamps: true
  }
);

const Template = mongoose.model<IUserDocument>("User", schema);

export default Template;
