
function isThisType(val){
  for(let key in this){
    if(this[key]==val){
      return true
    }
  }
  return false
}

//模拟枚举
const LoginType={
  USER_MINI_PROGRAM:100,
  USER_EMAIL:101,
  USER_MOBILE:102,
  isThisType
}
const ArtType={
  Movie:100,
  Music:200,
  Sentence:300,
  Book:400,
  isThisType
}
module.exports ={
  LoginType,
  ArtType
}