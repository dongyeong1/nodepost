const express=require('express');
const { route } = require('./auth');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const {  hukuokaPost,Post,User, homePost }=require('../models');
const answerPost = require('../models/answerpost');

const router =express.Router();



router.use((req,res,next)=>{
    res.locals.user=req.user;
    res.locals.followerCount=0;
    res.locals.followingCount=0;
    res.locals.followerIdList=[];
    next();

});

router.get('/layout',(req,res,next)=>{
    res.render('layout',{
        
    });
});
//findall은 전부다 저장 (조건을 주면 그조건만 들어감)
//post.findall은 post에 있는 행
//..models require해서 findall 메서드불러옴







router.get('/hukuoka',async (req,res)=>{
  let pageNum = req.query.page; // 요청 페이지 넘버
let offset = 0;

if(pageNum > 1){
  offset = 5 * (pageNum - 1);
}

const postss = await hukuokaPost.findAll({
  include:{
    model:User,
    attributes: ['id','nick'],
  },
  order: [['createdAt','DESC']],
 
});
let counts=[];

  const user= await User.findAll({});
  const posts = await hukuokaPost.findAll({
    include:{
      model:User,
      attributes: ['id','nick'],
    },
    order: [['createdAt','DESC']],
    offset:offset,
    limit:5,
    // counts:[],
  });

  for(let i=0; i<=postss.length/5; i++){
    counts[i]=i+1;
  }

    
  console.log(postss.length);
  res.render('hukuoka',{
    // users:user,
    twits: posts,
    counts,
  });
})


router.get('/qna',isLoggedIn,async(req,res)=>{
  
  const userid=req.user.id;
let pageuser=false;
console.log(userid);
if(userid===1){
 pageuser=true;
}

  const posts= await Post.findAll({
    where:{UserId:iuser, 
    id:req.query.id}
  })
  res.render('qna',{
    qnatwits:posts,
    pageuser,
  });
  
})
//////////////////////////////////////////////////////////////


router.get('/qa',isLoggedIn,async (req,res)=>{

  const userid=req.user.id;
  let pageuser=false;
  console.log(userid);
  if(userid===1){
   pageuser=true;

  }
  let pageNum = req.query.page; // 요청 페이지 넘버
let offset = 0;

if(pageNum > 1){
  offset = 5 * (pageNum - 1);
}

const postss = await Post.findAll({
  include:{
    model:User,
    attributes: ['id','nick'],
  },
  order: [['createdAt','DESC']],
 
});
let counts=[];

  
  const posts = await Post.findAll({
    include:{
      model:User,
      attributes: ['id','nick'],
    },
    order: [['createdAt','DESC']],
    offset:offset,
    limit:5,
    // counts:[],
  });

  for(let i=0; i<=postss.length/5; i++){
    counts[i]=i+1;
  }

    
  console.log(postss.length);
  res.render('qa',{
    pageuser,
    
    twits: posts,
    counts,
  });
});





///////////////////////////////////////////////



router.get('/join',(req,res)=>{
    res.render('join',{

    });
});
router.get('/home',(req,res)=>{
res.render('home');
})

router.get('/dong',async (req,res)=>{
  let pageNum = req.query.page; // 요청 페이지 넘버
let offset = 0;

if(pageNum > 1){
  offset = 5 * (pageNum - 1);
}

const postss = await homePost.findAll({
  include:{
    model:User,
    attributes: ['id','nick'],
  },
  order: [['createdAt','DESC']],
 
});
let counts=[];

  const user= await User.findAll({});
  const posts = await homePost.findAll({
    include:{
      model:User,
      attributes: ['id','nick'],
    },
    order: [['createdAt','DESC']],
    offset:offset,
    limit:5,
    // counts:[],
  });

  for(let i=0; i<=postss.length/5; i++){
    counts[i]=i+1;
  }

    
  console.log(postss.length);
  res.render('dong',{
    // users:user,
    twits: posts,
    counts,
  });
})



router.get('/',(req,res)=>{
    console.log('login');
  res.render('login',{
      title:'dong page',
      
  });

});




module.exports=router;