const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser=require('body-parser');

const fs = require('fs');
    //파일의 종류: 일반파일, 폴더-파일로 취급
const { User ,Post, hukuokaPost,answerPost,homePost } = require('../models');
const { isLoggedIn } = require('./middlewares');
const { post } = require('./auth');
const { update } = require('../models/user');
let postuser=null;
const router = express.Router();

try {
  fs.readdirSync('uploads');//동기식 으로 동작한다
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}


const upload2 = multer();



router.post('/hukuoka',
isLoggedIn,
upload2.none(),
async(req,res,next)=>{
  try {
    const post= await hukuokaPost.create({
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,
    });
    res.redirect('/hukuoka')
  } catch (error) {
    console.error(error);
    next(error);
  }
})

router.post('/dong', isLoggedIn,
upload2.none(),
async(req,res,next)=>{
  try {
    const post = await homePost.create({
      content: req.body.content,
      img:req.body.url,
      UserId:req.user.id,
    });
    res.redirect('/dong');
  } catch (error) {
    console.error(error);
    next(error);
  }
})




router.post('/',
 isLoggedIn, 
upload2.none(),//모든정보를 req.body에저장
 async (req, res, next) => {
  try {
      //게시글 모델(POST)에 내용을 생성
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,

    });
    console.log(req.body.content);
    


    
    console.log('contenttttttttt')
    res.redirect('/qa');
  } catch (error) {
    console.error(error);
    next(error);
  }
});


router.post('/answer',isLoggedIn,async(req,res)=>{

  try {
    
    const answerpost= await answerPost.create({
      content: req.body.content,
        img: req.body.url,
        UserId: req.user.id,
        PostId:req.body.id,
    });

    // res.redirect('/qna');

  } catch (error) {
    console.error(error);
    next(error);
  }

 
  



  let iuser=req.user.id;
     let pageuser=false;
  
   if(iuser===1){
   pageuser=true;
   
  
  }
  





const posts= await Post.findAll({
  where:{
    
  id:req.body.id,}
})
const answer= await answerPost.findAll({
 where:{PostId:req.body.id},
})


 
  console.log(posts);
  
  console.log('~~~~~~~~~~');
  res.render('qna',{
    qnatwits:posts,
    
    pageuser,
    answers:answer,
  });

  
})



router.post('/qna',isLoggedIn,async (req,res)=>{
  let iuser=req.user.id;//현재id
  let pageuser=false;
   postuser=req.query.user;

if(iuser===1){
 pageuser=true;
 iuser=req.query.user;
}

const answer= await answerPost.findAll({
  where:{PostId:req.query.id},
 })
  const posts= await Post.findAll({
    where:{UserId:iuser,//관리자로 접속하면 userid가 
      
    id:req.query.id}
  })
  console.log(posts);
  console.log('~~~~~~~~~~');
  res.render('qna',{
    qnatwits:posts,
    pageuser,
    id: req.query.id,
    answers:answer,
  });

});






router.post('/update',isLoggedIn,async (req,res)=>{
  let iuser=req.user.id;//현재id
  
   




  const posts= await Post.findAll({
    where:{UserId:iuser,//관리자로 접속하면 userid가 
      id:req.query.id,
    }
  })
  
  res.render('update',{
    qnatwits:posts,
   
    id: req.query.id,
    
  });

});
/////////////////
router.post('/updates',isLoggedIn,async (req,res,next)=>{
  let iuser=req.user.id;//현재id
  
try {
  const update =await Post.update(
    {
      content:req.body.content,
    },
    {where:{id:req.body.id
      , UserId:iuser},

     

  });

  
} catch (error) {
  console.error(error);
  next(error);
}

  



  const posts= await Post.findAll({
    where:{UserId:iuser,//관리자로 접속하면 userid가 
      id:req.body.id,
    }
  })
  
  res.render('update',{
    qnatwits:posts,
   
    id: req.body.id,
    
  });

});



router.post('/hukuokaupdate',isLoggedIn,async (req,res)=>{
  let iuser=req.user.id;//현재id
  
   




  const posts= await hukuokaPost.findAll({
    where:{UserId:iuser,//관리자로 접속하면 userid가 
      id:req.query.id,
    }
  })
  
  res.render('hukuokaupdate',{
    qnatwits:posts,
   
    id: req.query.id,
    
  });

});

/////////////////////////

router.post('/hukuokaupdates',isLoggedIn,async (req,res,next)=>{
  let iuser=req.user.id;//현재id
  
try {
  const update =await hukuokaPost.update(
    {
      content:req.body.content,
    },
    {where:{id:req.body.id
      , UserId:iuser},

     

  });

  
} catch (error) {
  console.error(error);
  next(error);
}

  



  const posts= await hukuokaPost.findAll({
    where:{UserId:iuser,//관리자로 접속하면 userid가 
      id:req.body.id,
    }
  })
  
  res.render('hukuokaupdate',{
    qnatwits:posts,
   
    id: req.body.id,
    
  });

});


/////////////////////////////



router.post('/dongupdate',isLoggedIn,async (req,res)=>{
  let iuser=req.user.id;//현재id
  
   




  const posts= await homePost.findAll({
    where:{UserId:iuser,//관리자로 접속하면 userid가 
      id:req.query.id,
    }
  })
  
  res.render('dongupdate',{
    qnatwits:posts,
   
    id: req.query.id,
    
  });

});


//////////////////////


router.post('/dongupdates',isLoggedIn,async (req,res,next)=>{
  let iuser=req.user.id;//현재id
  
try {
  const update =await homePost.update(
    {
      content:req.body.content,
    },
    {where:{id:req.body.id
      , UserId:iuser},

     

  });

  
} catch (error) {
  console.error(error);
  next(error);
}

  



  const posts= await homePost.findAll({
    where:{UserId:iuser,//관리자로 접속하면 userid가 
      id:req.body.id,
    }
  })
  
  res.render('dongupdate',{
    qnatwits:posts,
   
    id: req.body.id,
    
  });

});












router.post('/del',isLoggedIn, async (req,res,next)=>{
  try {
    const userId= req.user.id;
    if(userId==1){
      const deletepos = await Post.destroy({
      
        where:{id:req.query.id
        , }
      });
      
    }else{
      const deletepos = await Post.destroy({
      
        where:{id:req.query.id
        , UserId:userId}
      });

    }
    
    res.redirect('/qa');
  } catch (error) {
    next(error);
  }
})

router.post('/hukuokadel',isLoggedIn,async(req,res,next)=>{
  try {
   
   const id = req.query.id;
   
   const userId = req.user.id;
   
  
   console.log(req.user);
   if(userId==1){
    const deletepos = await hukuokaPost.destroy({
    
      where:{id:req.query.id
      , }
    });
    
  }else{
    const deletepos = await hukuokaPost.destroy({
    
      where:{id:req.query.id
      , UserId:userId}
    });

  }
    res.redirect('/hukuoka');
  } catch (error) {
    next(error);
  }
})


router.post('/dongdel',isLoggedIn,async(req,res,next)=>{
  try {
   
   const id = req.query.id;
   
   const userId = req.user.id;
   
  
   console.log(req.user);
   if(userId==1){
    const deletepos = await homePost.destroy({
    
      where:{id:req.query.id
      , }
    });
    
  }else{
    const deletepos = await homePost.destroy({
    
      where:{id:req.query.id
      , UserId:userId}
    });

  }
    res.redirect('/dong');
  } catch (error) {
    next(error);
  }
})



// router.post('/update', isLoggedIn,async(req,res,next)=>{
//   const userId= req.user.id;
//   const update =await Post.update({
//     where:{id:req.query.id
//       , UserId:us},
//       content:req.body.content,

//   });
// })


module.exports = router;