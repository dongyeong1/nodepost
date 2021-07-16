const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn}= require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/join',isNotLoggedIn,async(req,res,next)=>{
    const {email, nick, password} = req.body;
    try {
        const exUser= await User.findOne({where:{email}});
        if(exUser){
            return res.redirect('/join?error=exist');
        }
        const hash= await bcrypt.hash(password,12);
        await User.create({
            email,
            nick,
            password:hash,
        });
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

router.post('/login', isNotLoggedIn, (req, res, next) => { //post /auth/login요청
    //login되있는데 할려고 하면 뭐라하니깐 isnotloggenin으로 조사한다
  passport.authenticate('local', (authError, user, info) => {//passport.authenticiate
   //로그인 성공하든 실패하든지 콜백이 실행됨
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    //req.login하면 passport.serializeUser가 실행되면서 세션에 id가 저장됩니다
    return req.login(user, (loginError) => {//로그인시 실행과정 4번째 req.login 호출
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect('/home');
    });
  })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
});

router.get('/logout',isLoggedIn,(req,res)=>{
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

module.exports=router;
