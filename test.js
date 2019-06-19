

// function func1(){
//   func2()
// }
// function func2(){
//   func3()
// }
// function func3(){
  
// }
// var one ={x:1}
// var two =new Object()
// one.__proto__ ===Object.prototype
/**
 * 
 */
// function Person(){
//   this.name="mark"
// }
// var p1= new Person()
// p1.name="jack"
/**
 * 声明了Person后 内存中会创建一个对象B
 * Person会有个默认函数 prototype
 * 对象B就是Person的原型对象 简称原型
 * 原型中会有一个constructor属性指向Person
 * 原型对象默认只有属性:constructor  其他都是从Object继承而来的
 */
// console.log(p1.name)
// function Person2(){
// }
/**  本来Person2的原型对象是可以通过
 *   Person2.prototype.constructor获得
 * 
*/
//现在直接 让Person2的原型对象指向新对象
// Person2.prototype={
//   name:'kkk'
// }
// //
// var p2=new Person2()
// console.log(p2.name)
// var name='aaa'
// var age=18
// function test(){
//   console.log(this)
//   console.log(this.name)
// }
// test()

async function fun1(){
 try {
   await fun2()
 } catch (error) {
   console.error(error);
   
 }
}
async function  fun2(){
  try {
    await fun3()
  } catch (error) {
    console.log(error)
  }
 
}
function fun3(){
  return new Promise((resolve,reject)=>{
    setTimeout(() => {
      const r= Math.random()
      if(r<0.5){
        reject('error')
      }
    }, 1000); 
  })
}
//全局异常处理

fun1()