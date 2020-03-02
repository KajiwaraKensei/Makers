var port = process.env.PORT || 3000;
console.log(process.env);
import { Request, Response, NextFunction } from "express";
import * as mongoose from "mongoose";
import Todo from "./models/Todo";
import * as bodyParser from "body-parser";
import * as admin from "firebase-admin";
import account from "./routes/account";
import template from "./routes/template";
import comment from "./routes/comment";
import "heroku-config";
import * as express from "express";
import * as line from "@line/bot-sdk";
import cors from "cors";

const LINE_TOKEN =
  "tJ0gD50beqUdBmjz40sNcIKssWqcZ2Zz9OhhzK6ERi18BfWaa1rfm7ACtS+jK+cBb6nIFWZ0QlxNNGFCq6/8nUsXugrOywRLOLyO1jqwhWfjRTcfLn3fPVr8x7PVh6dDuZUNsHyC6MdQONSYAceVLQdB04t89/1O/w1cDnyilFU=";
const LINE_CEACLET = "a5317881e5a3f3b03531afe56aec483d";
//declare var process: NodeJS.Process;
// export interface ProcessEnv {
//   [key: string]: string | undefined;
// }
const app = express();
const url =
  "mongodb://heroku_pkdqdmpl:og9870460gbsevrjf401f9542v@ds257054.mlab.com:57054/heroku_pkdqdmpl";
//"mongodb://mongodb/myapp";
//const port = process.env.PORT || 3000;

// =======================
// configuration
// =======================
// server setting

let serviceAccount = require("../template-2013-firebase-adminsdk-nfjo5-366a604e70.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://template-2013.firebaseio.com"
});
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// =======================
// routes
// =======================

app.use(cors());
app.use("/account", account);
app.use("/template", template);
app.use("/comment", comment);
app.get("/", (req: Request, res: Response, next: NextFunction) => {
  const { message } = req.query;
  const config1 = {
    channelAccessToken: LINE_TOKEN,
    channelSecret: LINE_CEACLET
  };

  const client1 = new line.Client(config1);

  client1
    .broadcast({
      type: "text",
      text: message
    })
    .then(data => res.status(200).send({ data }))
    .catch(e => res.status(200).send({ e }));
});
app.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const event = req.body.events[0];
  const config = {
    channelAccessToken: LINE_TOKEN,
    channelSecret: LINE_CEACLET
  };
  const client = new line.Client(config);

  const pro = await client.getProfile(event.source.userId);

  client.replyMessage(event.replyToken, {
    type: "text",
    text: `${pro.displayName}さん : 「${event.message.text}」と入力`
  });

  res.status(200).send();
});

app.listen(port, () => {
  console.log(`Listen on port ${port}.`);
});

export default app;
