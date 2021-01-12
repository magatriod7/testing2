import express from 'express';
import { urlencoded, json } from 'body-parser';
import { User } from "./models/User";
import dotenv from "dotenv"
import path from "path"

dotenv.config();

const app = express();
const PORT = 5000;


app.use(urlencoded({extended:true}));//데이터 분석

app.use(json());//데이터 json 타입 분석


import { connect } from "mongoose";

connect(process.env.MONGO_URI,{
    useNewUrlParser : true, useUnifiedTopology : true, useCreateIndex : true, useFindAndModify : false
}).then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req,res) => {
  res.send('Hello World!');
});
app.post('/register', (req, res) => {
  //회원 가입 할 떄 필요한 정보들을 client에서 가져오면 그것들을 database에 넣어준다.
  const user = new User(req.body);//body안에는 json으로 id, password 등이 들어 있다.

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err})
    return res.status(200).json({
      success: true
    })
  })
})

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}!`);
});