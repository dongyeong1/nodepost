const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');

// const express = require('express');



dotenv.config();//.env의 내용을 읽어서 노드환경변수값 설정
const pageRouter=require('./routes/page');
const authRouter=require('./routes/auth');
const postRouter=require('./routes/post');

const {sequelize} = require("./models");
const passportConfig = require('./passport');

const app = express();
passportConfig();

app.set('port',process.env.PORT||8001);
app.set('view engine','html');
nunjucks.configure('views',{
    express: app,
    watch:true,
});

sequelize.sync({force:false})//true하면 서버실행시 테이블 재생성
.then(()=>{
    console.log('db연결 성공!');
})
.catch((err)=>{
    console.log(err);
});
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname,'public')));

//__dirname:현재실행중인폴더경로
app.use('/img',express.static(path.join(__dirname, 'uploads')));


app.use(express.json());
app.use(express.urlencoded({extended:false}));
//false면 노드의 querystring모듈사용
//true면 qs모듈사용
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
    session({
        resave: false,
        saveUninitialized:false,
        secret: process.env.COOKIE_SECRET,
        cookie:{
            httpOnly:true,
            secure:false,
        },
    })
);

app.use(passport.initialize());//요청에 passport설정심기
app.use(passport.session());//passport 정보 저장->req.session에 저장함
// app.get('/',(req,res)=>{
//     if(req.cookies.remember){
//     res.sendfile(path.join(__dirname,'clear.html'));
//     }else{
//        res.sendfile(path.join(__dirname,'form.html'));
        
//     }
// })

// app.get('/forget',(req,res)=>{
//     res.clearCookie('remember');
//     res.redirect('/');
// })

// app.post('/',(req,res)=>{
//     res.cookie('remember',1,{
//         expires:new Date(Date.now()+900000),
//         httpOnly:true,
//         secure:true,
//     });
//     res.redirect('/');
// })


app.use('/',pageRouter);
app.use('/auth',authRouter);
app.use('/post',postRouter);

app.use((req, res, next) => {//404처리 미들웨어
    const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
  });

app.use((err,req,res,next)=>{
    res.locals.message=err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status||500);
    res.render('error');
});

app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 대기중');
});

