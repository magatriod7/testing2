import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
const saltRounds = 10;


 const userSchema = mongoose.Schema({
        name: {
            type: String,
            maxlength: 50
        },
        email: {
        type: String,
        trim: true,
        unique : 1
        },
        
        password: {
            type: String,
            minlength:5
        },
        lastname: {
            type: String,
            maxlength: 50
        },
        role: {
            type: Number,
            default: 0
        },
        image: String,
        token: {
            type: String
        },
        tokenExp:{
            type:Number
        }
 });

 userSchema.pre('save', function( next ){
    
    var user = this;

    if(user.isModified('password')){
        //비밀번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds, function(err, salt) {            
            if(err) { console.log("gensalt err"); return next(err);}

            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) { console.log("hash err"); return next(err);}
                user.password = hash //암호화된 번호로 바꿔줌
                next()
            })
        })
    } else {
        next();
    }
 
 })// 유저모델을 저장하기 전에 무언가를 함


  userSchema.methods.comparePassword = function(plainPassword, cb) {
      //plainPassword 
      bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
          if(err) return cb(err);
          cb(null, isMatch)
      })
  }

  userSchema.methods.generateToken = function(cb) {
      var user = this
      //jsonwebtoken을 이용해서 token 생성하기
      var token = jwt.sign(user._id.toHexString(),'secretToken')

        user.token = token
        user.save(function(err, user) {
            if(err) return cb(err)
            cb(null, user)
        })
    }

 const User = mongoose.model('User', userSchema)

module.exports = { User }

