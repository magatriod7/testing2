import express from 'express';
import { urlencoded, json } from 'body-parser';
import { User } from "./models/User";
import dotenv from "dotenv"
import path from "path"
import cookieParser from "cookie-parser"

dotenv.config();

const app = express();
const PORT = 5000;


app.use(urlencoded({extended:true}));//데이터 분석

app.use(json());//데이터 json 타입 분석
app.use(cookieParser());

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
    console.log(err)
    if (err) { console.log('userinfo err'); return res.json({ success: false, err})}
    return res.status(200).json({
      success: true
    })
  })
})

app.post('/login', (req,res) => {
//이메일 찾기 
  User.findOne({ email: req.body.email }, (err, user) => {
    if(!user) {
      return res.json({
        loginSuccess:false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
//비밀번호 확인

    user.comparePassword(req.body.password, (err, isMatch) => {
      if(!isMatch)
        return res.json({ loginSuccess:false, message: "비밀번호가 틀렸습니다."})
      user.generateToken((err,user) => {
        if(err) return res,status(400).send(err);

        //토큰을 저장한다. 쿠키? 로컬스토리지? 
          res.cookie("x_auth", user.token)
          .status(200)
          .json({loginSuccess:true, userId: user._id})            

      })
    })

  })
})

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}!`);
});