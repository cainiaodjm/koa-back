class A{
  constructor(){
    this.nameA='a'
  }
  validateA(){
    console.log('A')
  }
}
class B extends A{
  constructor(){
    super()
    this.nameB='b'
  }
  validateB(){
    console.log('B')
  }
}
class C extends B{
  constructor(){
    super()
    this.nameC='c'
  }
  validateC(){
    console.log('C')
  }
}
var b=new B()
var c =new C()
var c1=new C()
// console.log(B.prototype)
// console.log(b.__proto__.constructor.prototype)
// console.log(A.prototype)
// console.log(c.__proto__ ===b.__proto__)
// console.log(Object.getPrototypeOf(b))
// function findMembers(instacne,attributePrefix,methodPrefix) {
//   //首先获取实例的原型
//   let proto=Object.getPrototypeOf(instacne)
//   console.log(proto)
//   if(proto!=null){
//     findMembers()
//   }
//   // if(!instacne instanceof instacne){
//   //   return []
//   // }else{
//   //   // 
//   // }
// }
testProto(b)

function testProto (instacne) {
  // let ins=Object.getPrototypeOf(instacne)
  if(Object.getPrototypeOf(instacne)!==null){
    let ins2=Object.getPrototypeOf(instacne)
    console.log()
    console.log(ins2,1)
  
    testProto(ins2)
  }else{

  }
  // console.log(instacne.__proto__,0)
  // console.log(Object.getPrototypeOf(instacne),1)
  // let ins=Object.getPrototypeOf(instacne)
  // console.log(Object.getPrototypeOf(ins),2)
  // console.log(Object.getPrototypeOf(ins.__proto__),3)
}


//编写一个函数findMembers 

/**
 * 接受三个参数  子类  属性名的前缀 方法名的前缀
 * 返回 该类上所有的 属性名 和方法名
 *  输出结果应该为 
 * 
 * ['nameA','nameB','nameC','validateC','validateB','validateA']**/
// const members=findMembers(c,'name','validate')

// console.log(members)