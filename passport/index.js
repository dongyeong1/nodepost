const passport= require('passport');
const local = require('./localStrategy');
const User= require('../models/user');

module.exports=()=>{
    //passport의 메서드 serializeUser
    //serializeUser은 로그인시 실행,req.session에 어떤 데이터 저장할지 정하기
    passport.serializeUser((user,done)=>{
        console.log('동영11');
        done(null,user.id);
    });
    //deserializeUser은 매요청시 실행
    passport.deserializeUser((id,done)=>{
        console.log('동영00');
        User.findOne({ where: { id } })
        .then(user => done(null, user))
        .catch(err => done(err));
    });

    local();
};