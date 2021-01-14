import { User } from "../models/User"

let auth = (req, res, next) => {
 
  //인증처리 하는 곳

  // 클라이언트 쿠키에서 토큰을 가져옴
  let token = req.cookies.x_auth;//index에서 정해줌
  //토큰을 복호화 한 후 유저를 찾는다
  User.findByToken(token, (err,user) => {
      if(err) throw err;
      if(!user) return res.json({ isAuth:false, error:true})

      req.token = token;
      req.user = user;//req에 넣어줌으로써 유저 정보와 토큰을 가질 수 있다.
      next();
  })
  //유저가 있으면 인증 o

  //유저가 없으면 인증 x
}

module.exports = {auth};