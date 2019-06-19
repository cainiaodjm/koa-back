const jwt=require('jsonwebtoken')
const findMembers=function (instance,{
  prefix,
  specifiedType,
  filter
}) {
  //递归函数
  function _find(instance) {
    //基线条件(跳出递归)
    if(instance.__proto__ === null)
      return []
    //静态方法 Reflect.ownKeys() 返回一个由目标对象自身的属性键组成的数组。
    let names=Reflect.ownKeys(instance)
    //filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。 
    names=names.filter((name)=>{
      //过滤掉不满足条件的属性或方法名
      return _shouldKeep(name)
    })
    return [...names,..._find(instance.__proto__)]
  }
  function _shouldKeep(value){
    //如果有filter
    if(filter){
      if(filter(value)){
        return true
      }
    }
  }

}