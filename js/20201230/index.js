// 1.原型链继承：更改原型链的指向来实现继承
function parent() {
    this.names = ['kevin', 'daisy']
}
parent.prototype.getName = function () {
    console.log(this.names)
}
function child(params) { }
child.prototype = new parent()
const child1 = new child()
const child2 = new child()
console.log(child1.names) // kevin daisy
child2.getName() // kevin daisy
child1.names.push('yayu') 
console.log(child2.names) // kevin daisy yayu
// 缺点：引用类型的属性被所有实例共享，并且创建时不能传参

// 2.借用构造函数继承（经典继承）
function parent(name) {
    this.name = ['kevin', 'daisy']
}
function child(name) {
    parent.call(this, name)
}
const child1 = new child()
const child2 = new child()
console.log(child1.name.push('lala'), child2.name) // kevin daisy lala, kevin daisy
// 可以传参，并且属性不会被共享了, 但是如果要继承一个方法的话，每次new一个对象时，都要创建一个函数，
// 因此可以优化一下，就是组合继承了

// 3.组合继承（也就是原型链继承+构造函数继承一起）
function parent(name) {
    this.name = name
    this.colors = ['blue', 'red']
}
parent.prototype.getName = function () {
    console.log(this.name)
}
function child(name) {
    parent.call(this, name)
}
child.prototype = new parent()
child.prototype.constructor = child
const child1 = new child('daisy')
const child2 = new child('lala')
console.log(child1.name, child2.name)


// 4.原型继承
// Object.create实现
function createObj(obj) {
    function F() { }
    F.prototype = obj
    return new F()
}
var person = {
    name: 'kevin',
    friends: ['daisy', 'kelly']
}
var person1 = createObj(person);
var person2 = createObj(person);
person1.name = 'person1';
console.log(person2.name); // kevin
person1.firends.push('taylor');
console.log(person2.friends); // ["daisy", "kelly", "taylor"]
// 缺点同原型链继承

// 5.寄生继承
function createObj (o) {
    var clone = Object.create(o);
    clone.sayName = function () {
        console.log('hi');
    }
    return clone;
}
// 缺点同构造函数继承，每次都会创建一遍sayName方法，没有实现真正意义上的继承

// 6.寄生组合继承
// 是对组合继承的一种优化
// 分析组成集合的缺点: 
Child.prototype = new Parent(); // 设置子类实例的原型
var child1 = new Child('kevin', '18'); // 创建子类型
// 在(设置子类实例的原型)和(创建子类型)时都会执行一次parent构造函数
// 其中，这步是可以优化的
Child.prototype = new Parent();
// 优化成
const fn = function () { }
fn.prototype = Parent.prototype
Child.prototype = new fn()
// 优化版本：避免了执行两次parent构造函数
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}
Parent.prototype.getName = function () {
    console.log(this.name)
}
function Child (name, age) {
    Parent.call(this, name);
    this.age = age;
}
// 关键的三步
var F = function () {};
F.prototype = Parent.prototype;
Child.prototype = new F();
var child1 = new Child('kevin', '18');