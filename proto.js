/**
 * 每个构造函数(constructor)都有一个原型对象(prototype),
 * 原型对象都包含一个指向构造函数的指针,
 * 而实例(instance)都包含一个指向原型对象的内部指针.
 * 
 * 构造函数对应的原型属性是prototype
 * 实例对象的原型属性是__proto__


 */
var A=function() {
}
A.prototype.n=1;
var b=new A()
A.prototype={
  n:2,
  m:3
}
var c= new A()
console.log(b.n) //1
console.log(b.m)//undefine
console.log(c.n)//2
console.log(c.m)//3
var F =function(){

}
Object.prototype.a=function(){
  console.log('a')
}
Object.prototype.b=function(){
  console.log('b')
}
var f=new F()
f.a()//a
f.b()//b
F.a()//a
F.b()//b
function Person(name){
  this.name=name
}
let p=new Person('Tom')
// console.log(p.__proto__)
// console.log(Person.__proto__)

function Father(){
  this.property=true
}
Father.prototype.getFatherValue=function(){
  return this.property
}
function Son(){
  this.sonProperty=false
}

//Son 继承 Father
Son.prototype=new Father()

class Point{
  constructor(x,y){
    this.x=x;
    this.y=y;
  }
}

console.log(typeof Point)
//类的原型构造属性指向类
console.log(Point.prototype.constructor ===  Point)