# 初探this
&emsp;&emsp;this关键字是JavaScript中最复杂的机制之一，掌握了它就掌握了进入JavaScript的魔法，它值得我们付出大量时间去学习。  
&emsp;&emsp;学习this的第一步时明白this**既不是指向函数自身也不是指向函数的词法作用域**（变量或函数的可访问范围），this实际上实在函数被调用时发生的绑定，它指向什么完全取决于**函数在哪里被调用**。
## 什么是this
&emsp;&emsp;当一个函数被调用时，会创建一个活动记录（执行上下文）。这个记录包含函数在哪里被调用（调用栈）、函数的调用方式、传入的参数等信息，this就是这个记录的一个属性，会在函数执行的过程中用到。  
&emsp;&emsp;本文除了**node和浏览器中的this**这一章外，其他章节的运行环境都是浏览器下。  
&emsp;&emsp;除特殊说明，本文代码都是在严格模式下执行的。
## 一般场景中的this
（1）先来看一个简单的
```javascript
function foo() { 
}       console.log( this.a );

var a = 2; 
foo(); //?
```
&emsp;&emsp;运行结果为**2**，这里的函数foo是在全局作用域中被调用的，相当于是全局对象调用了函数，所以函数中的this指向全局对象，this.a被解析成了window.a，即3。  
（2）再来看看稍微复杂一点的
```javascript
function foo() { 
    console.log( this.a );
}
var a = 2;
var obj = { 
    a: 3,
    foo: foo 
};
obj.foo(); //?
```
&emsp;&emsp;运行结果为**3**，这里的函数foo是被obj对象所调用，所以函数中的this指向obj，this.a被解析成了obj.a，即3。  
（3）将上面代码稍微变化一下
```javascript
function foo() { 
    console.log( this.a );
}
var a = 2;
var obj = { 
    a: 3,
    foo: foo 
};
var obj1=obj.foo; 
obj1() //?
```
&emsp;&emsp;这时运行结果为**2**，为什么呢？这里相当于先进行了赋值操作，将obj.foo赋给obj1，实际的执行在下一步，所以调用位置又到了window中，this.a被解析成window.a，即2。

## 闭包中的this
```javascript
var name = "The Window";
var object = {
    name: "My object",
    getNameFunc: function() {
        return function () {
            return this.name;
        }

    }
}
console.log(object.getNameFunc()())  //?
```
&emsp;&emsp;运行结果为**The Window**，以上代码先创建了一个全局变量name，又创建一个包含name属性的对象，该对象还包含一个方法——getNameFunc()，它返回一个匿名函数，而匿名函数又返回this.name。因此调用object.getNameFunc()()直接返回一个字符串。  
&emsp;&emsp;那为什么匿名函数没有取得其包含作用域的this对象呢？  
&emsp;&emsp;首先，有这样一个结论：**匿名函数的执行环境具有全局性**。每个函数在被调用时都会自动取得两个特殊变量：this和arguments。内部函数在搜索这两个变量时，只会搜索到其活动对象为止，因此永远无法直接访问到外部函数中的这两个变量。  
&emsp;&emsp;我们可以换种方式理解，将最后一步拆分成两步：

```javascript
var obj1= object.getNameFunc();
obj1();
```
&emsp;&emsp;首先将对象中的函数赋给obj1，然后执行obj1()，这里的函数obj1是在全局作用域中被调用的，所以指向window。  
&emsp;&emsp;不过我们可以将外部作用域中的this保存在闭包可以访问到的变量里

```javascript
var name = "The Window";
var object = {
    name: "My object",
    getNameFunc: function() {
        var that = this;   // 将getNameFunc()的this保存在that变量中
        var age = 15;
        return function() {
            return that.name;
        };
    }
}
alert(object.getNameFunc()());   //?
```
&emsp;&emsp;运行结果为**My object**，这时外部作用域object中的this被赋给了that变量，所以即使在函数返回后，that仍然引用着object，所以能够获取到object中的对象name。
## node和浏览器中的this
### 浏览器中的this
#### （1）全局作用域中的this
```javascript
var name = "The Window";
var object = {
    name: "My object",
    getNameFunc: function() {
        return function () {
            return this.name;
        }

    }
}
console.log(object.getNameFunc()())  //?
```
&emsp;&emsp;在浏览器中的运行结果是**The Window**，因为在浏览器中，object 中的getNameFunc方法中返回匿名函数中的this 指向全局对象，这里的全局变量是==window==，即this.name=window.name。
#### （2）let和var
&emsp;&emsp;尝试使用ES6中的==let==：

```javascript
let name = "The Window";
```
&emsp;&emsp;在浏览器中的运行结果为**undefined**，为什么呢？ES6规定，var 命令和 function 命令声明的全局变量，依旧是顶层对象的属性，但 ==let==命令、==const==命令、==class==命令声明的全局变量，不属于顶层对象的属性。所以**let和const在全局作用域中声明的变量不加入window**中，==window==中找不到变量name，输出undefined。
### node中的this
&emsp;&emsp;同样的代码在node环境中的运行结果为**undefined**，这又是为什么的？看下面的代码

```javascript
name = 'The Global';
var object = {
  name : 'My Object',
  getNameFunc: function() {
    return function() {
      return this.name;
    };
  }
};
console.log(object.getName()());  // ?
```
&emsp;&emsp;运行结果为**The Global**，这段代码跟之前的区别在于上面的代码第一行有==var==，其实有这样一个结论：**初始化未经声明的变量，总是会创建一个全局变量**，所以node 环境下未添加var 声明的变量挂载在全局对象（global）上，object 中的getNameFunc方法中返回匿名函数中的this 指向全局对象，这里的全局变量是global，即this.name=global.name。  
&emsp;&emsp;那node中全局作用域下的this是什么呢？尝试运行如下代码

```javascript
console.log(this)
```
&emsp;&emsp;运行结果为{}，由此可以看出**node下全局作用域下的this指向一个空对象**。  
&emsp;&emsp;我们进一步分析，node其实是commonjs模块化规范的，执行的代码是被一个函数所包裹，==var==在函数作用域顶部，并不在全局作用域上，所以未绑定到==global==，而如果你是进入node指令窗口写这段代码，那就在==global==上。而不使用==var==，则会发生**作用域提升**，从而绑定到==global==上，

```javascript
(function(exports, require, module, filename, dirname)){
   //你执行的代码
}
```

### 结论
（1）浏览器环境中全局作用域下的this指向==window==，==var==声明的变量加入==window==中，而==let==声明的变量不加入window中  
（2）node环境中未使用==var== 声明的变量挂载在全局对象（global）上，而全局作用域下的this为空对象。

## 构造函数中的this

```javascript
something=new MyClass(...)
```
&emsp;&emsp;使用new来调用函数，或者说发送构造函数调用时，会自动执行以下操作：

 1. 创建一个全新对象。
 2. 这个新对象会被执行[[Prototype]]。
 3. 这个新对象会绑定到函数调用的this。
 4. 如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。

### （1）构造函数没有返回对象
&emsp;&emsp;思考如下代码：

```javascript
function foo(a) {
    this.a = a;
}

var bar = new foo(2);
console.log(bar.a)  //?
```
&emsp;&emsp;运行结果为**2**，使用new来调用foo(...)时，我们会构造一个新对象并把它绑定到foo(...)调用的this上，所以新对象bar上的this指向foo上的this。
### （2）构造函数有返回对象
&emsp;&emsp;改造一下上面代码：
```javascript
function foo(a) {
    this.a = a;
    return {};
}

var bar = new foo(2);
console.log(bar.a)  //?
```
&emsp;&emsp;运行结果为**undefined**，这里刚上面代码不同的地方在于foo中返回了一个空对象。我们来看new构造函数的第四步：如果函数没有返回其他对象，那么new表达式中的函数调用会自动返回这个新对象。那如果有返回对象呢？  
&emsp;&emsp;总结下来有如下结论：  
&emsp;&emsp;构造函数中返回：undefined, null（null属于对象）, boolean, number等基础类型，构造函数中的this指向新对象。  
&emsp;&emsp;构造函数中返回：Object, Array, RegExp, Date, Function等复杂类型，构造函数中的this指向返回的对象。

## 其他情况下的this
### call,apply和bind中的this

```javascript
function foo(){
    console.log(this.a)
}
var obj={
    a:2
}
foo.call(obj);  //?
```
&emsp;&emsp;运行结果为**2**，通过foo.call(...)，我们可以在调用foo时强制将它的this绑定到obj上。  
&emsp;&emsp;再看以下代码：

```javascript
function foo(){
    console.log(this.a)
}
var obj={
    a:2
}
var bar=function(){
    foo.call(obj)
}
bar();  //2
setTimeout(bar,100);  //2
bar.call(window)  //2
```
&emsp;&emsp;我们来看一下具体的工作过程。我们创建了函数bar()，并在它的内部手动调用了foo.call(obj)，因此强制将foo的this绑定到obj上，无论之后如何调用函数bar，它总会手动在obj上调用foo。由此我们可以得出一个结论：**函数一旦绑定到对象，无论之后如何调用函数，都不会改变它的绑定**。

### 箭头函数中的this
&emsp;&emsp;箭头函数并不是使用function关键字来定义的，而是使用被称为“胖箭头”的操作符=>定义的，箭头函数是根据外层（函数或者全局）作用域来决定this。

```javascript
var a=1;
function foo(){ 
    return ()=>{
        console.log(this.a); 
    }
}
var obj={
    a:2
}
var bar=foo()
bar.call(obj)  //?
```

&emsp;&emsp;运行结果为**1**，按正常理解函数bar绑定到obj上，this应该指向obj。这就是箭头函数的特殊之处，**箭头函数的this是在定义函数时绑定的，不是在执行过程中绑定的。简单的说，函数在定义时，this就继承了定义函数的对象**。所以箭头函数中this一直指向的函数foo，这里的foo运行在全局作用域中，指向的是window，所以箭头函数中的this也指向window。  
&emsp;&emsp;**箭头函数的绑定无法修改**。
### 回调函数中的this
```javascript
var a=1;
function foo(){ 
    console.log(this.a); 
}
function doFoo(){ 
    fn();
}
var obj={
    a:2,
    foo:foo
}
doFoo(obj.foo);  //?
```
&emsp;&emsp;运行结果为**1**，参数传递其实是一种隐性赋值，因此我们传入的函数也会被隐性赋值，foo实际的调用位置在doFoo中，而dooFoo又是在全局作用域下的，所以foo中的this指向window。
如果函数传入语言内置的函数中，会发生什么呢？
```javascript
var a=1;
function foo(){ 
    console.log(this.a); 
}
var obj={
    a:2,
    foo:foo
}
setTimeout(obj.foo,100);  //?
```
&emsp;&emsp;运行结果为**1**，这里的内置函数的运行环境也是为全局作用域。
### 严格模式下的this
&emsp;&emsp;之前的代码都是运行在兼容模式下的，现在来看看运行在严格模式下的代码：

```javascript
function foo() {
    'use strict';
    console.log(this.a);
}

var a = 2;
foo()  //TypeError:this is undefined
```
&emsp;&emsp;严格模式下，函数中的this不能绑定到全局变量。
## 解决this指向问题的常用方法
&emsp;&emsp;为了解决this指向不确定导致的问题，常有一下三种解决方法
### （1）self = this
```javascript
var name = "The Window";
var object = {
    name: "My object",
    getNameFunc: function() {
        var self= this;   // 将getNameFunc()的this保存在self变量中
        var age = 15;
        return function() {
            return self.name;
        };
    }
}
console.log(object.getNameFunc()());   //My Object
```
### （2）使用箭头函数
```javascript
var name = "The Window";
var object = {
    name: "My object",
    getNameFunc: function() {
        var age = 15;
        return ()=> {
            return this.name;   //函数定义时this就已绑定
        };
    }
}
console.log(object.getNameFunc()());   //My Object
```
### （3）使用bind()
```javascript
var name = "The Window";
var object = {
    name: "My object",
    getNameFunc: function() {
        var age = 15;
        return function() {
            return this.name;
        }.bind(object);   //将this强制绑定到object上
    }
}
console.log(object.getNameFunc()());   //My Object
```

&emsp;&emsp;这些方法从本质上是想替代this机制，但掌握this对于我们更好地理解JavaScript非常重要，所以我们还是要掌握this
## 总结
&emsp;&emsp;总结下来this最重要的就是要理解**它的指向完全取决于它在哪里被调用**，也就是要寻找调用位置：调用位置就是函数在代码中被调用的位置（而不是声明位置，但这里有一个箭头函数是在声明地方确定this指向）。

参考文档

 1. [关于js构造函数中this的指向问题](https://blog.csdn.net/mym940725/article/details/79101030)
 2. [浏览器与Node中的this](https://blog.csdn.net/qq_33594380/article/details/82254834)
 3. 《你不知道的JavaScript上卷》
 4. 《JavaScript高级程序设计》
