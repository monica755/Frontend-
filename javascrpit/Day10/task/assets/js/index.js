// 1.SCOPE
{
    var d = 10;
    let b = 20;
    const c = 30;

    console.log(d);
    console.log(b);
    console.log(c); 
}

console.log(d);

// 2. REDECLARATION
var x = 10;
var x = 20;     
console.log(x); 
let y = 10;
const z = 10;

//3.REASSIGN
var num1 = 10;
num1 = 20;
console.log(num1);
let num2 = 30;
num2 = 40;
console.log(num2); 
const num3 = 50;

//4. HOISTING

console.log(p); 
var p = 100;

//5. TDZ
let q = 200;

// BOTH EXPLICIT AND IMPLICIT

const add1 = (a, b) => {
    return a + b;
};
const square = (n) => {
    return n * n;
};
console.log(add1(10, 20)); 
console.log(square(5));    


// Implicit return

const addNumberss = (a, b) => a + b;
const findSquare = (n) => n * n;
console.log(addNumberss(10, 20));
console.log(findSquare(5));    

// ARRAY DESTRUCTING
const num = [10, 20, 30];
const [a, b, c] = num;
console.log(a); 
console.log(b); 
console.log(c); 

// OBJECT DESTRUCTING
const student = {
    name: "Ravi",
    age: 25,
    course: "JavaScript"
};
const { name, age, course } = student;
console.log(name); 
console.log(age); 
console.log(course); 


// REST PARAMETER
function add(...numbers) {
    console.log(numbers);
}
add(10, 20, 30, 40);
// SPREAD SYNTAX
const numbers = [10, 20, 30];
const newNumbers = [...numbers, 40, 50];
console.log(newNumbers);

function stud(name, course, city = "Chennai") {
    console.log(`My name is ${name}. I am studying ${course} in ${city}.`);
}

stud("Ravi", "JavaScript");


//Create two student objects and display their details

class data {

    constructor(name, age, mark) {
        this.name = name;
        this.age = age;
        this.mark = mark;
    }

    displayDetails() {
        console.log(`Name: ${this.name}`);
        console.log(`Age: ${this.age}`);
        console.log(`Mark: ${this.mark}`);
    }
}
const person1 = new data("Ravi", 20, 85);
const person2 = new data("Priya", 21, 90);
person1.displayDetails();
person2.displayDetails();