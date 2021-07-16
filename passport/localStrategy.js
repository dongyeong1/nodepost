
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
  
  passport.use(new LocalStrategy({
  
      //사용자로부터 입력받는 정보 설정
    usernameField: 'text',//layout.html의 input태그의 name속성참고
    passwordField: 'password',
  },
   async (email, password, done) => {
     console.log('3333333333333333333333333');
    try {
      const exUser = await User.findOne({ where: { email } });
      //findone 7.5절
      if (exUser) {
        //사용자 데이터베이스에서 일치하는 이메일이 있는지 확인
        const result = await bcrypt.compare(password, exUser.password);
        //비밀번호 비교
        if (result) {
          done(null, exUser);
          //두번쨰 인수로 사용자 정보를 넣어서 보냄
        } else {
          done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
          //두번쨰 인수를 사용하지 않는것은 로그인에 실패한경우
          
        }
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.' });
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }));
};