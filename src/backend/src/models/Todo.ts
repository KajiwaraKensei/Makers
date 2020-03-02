import * as mongoose from "mongoose";
export interface IUserDocument extends mongoose.Document {
  title: String;
  done: boolean;
}
const schema = new mongoose.Schema({
  title: {
    type: String,
    default: ""
  },
  done: {
    type: Boolean,
    default: false
  }
});

const Todo = mongoose.model<IUserDocument>("Todo", schema);

export default Todo;
