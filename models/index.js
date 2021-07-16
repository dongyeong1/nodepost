const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');
const Post = require('./post');
const hukuokaPost= require('./hukuokapost');
const answerPost =require('./answerpost');
const homePost= require('./homepost');
// const Hashtag = require('./hashtag');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.User = User;
db.Post = Post;
db.hukuokaPost=hukuokaPost;
db.answerPost=answerPost;
db.homePost=homePost;
// db.Hashtag = Hashtag;

User.init(sequelize);
Post.init(sequelize);
hukuokaPost.init(sequelize);
answerPost.init(sequelize);
homePost.init(sequelize);
// Hashtag.init(sequelize);

User.associate(db);
Post.associate(db);
hukuokaPost.associate(db);
answerPost.associate(db);
homePost.associate(db);
// Hashtag.associate(db);

module.exports = db;