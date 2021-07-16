//게시글모델은 게시글 내용과 이미지 경로를 저장한다

const Sequelize = require('sequelize');


module.exports = class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      content: {
        type: Sequelize.STRING(140),//트위터처럼 . 140자 나타내기
        allowNull: false,
      },
      img: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: true,//createdAt, updatedAt, deleteAt 컬럼도생성
      underscored: false,//created_at이 아니라 , createdAt
      modelName: 'Post',
      tableName: 'posts',
      paranoid: false,//deletedAt 필드 안생김
      charset: 'utf8mb4',//이미지
      collate: 'utf8mb4_general_ci',
    });
  }

  static associate(db) { //관계
    db.Post.belongsTo(db.User);//다:1 n:1 post.getuser(),post.adduser()사용가능
    db.Post.hasMany(db.answerPost);
    // db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
    //게시글:해시태그 = n:m관계 328페이지 그림 7-59참조
    //postid, hashtagid 가 외래키
    //post.gethashtags(),post.addhashtags(),hashtag.getPosts()등 사용가능
  }
};