const {sequelize}=require('../../core/db')
const {Sequelize,Model}=require('sequelize')

const classicFields={
  image:Sequelize.STRING,
  content:Sequelize.STRING,
  pubdate:Sequelize.DATEONLY,
  fav_nums:{
    type:Sequelize.INTEGER,
    defaultValue:0
  },
  title:Sequelize.STRING,
  type:Sequelize.TINYINT,
  index:{
    type:Sequelize.INTEGER,
    defaultValue:0  }
}
class Movie extends Model{

}
Movie.init(classicFields,{
  sequelize,
  tableName:'tb_movie'
})
class Sentence extends Model{

}
Sentence.init(classicFields,{
  sequelize,
  tableName:'tb_sentence'
})
class Music extends Model{

}
Music.init(Object.assign(classicFields,{
  url:Sequelize.STRING
}),{
  sequelize,
  tableName:'tb_music'
})
module.exports={
  Movie,
  Sentence,
  Music
}