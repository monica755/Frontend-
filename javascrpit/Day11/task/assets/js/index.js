function processNumber(number, callback) {
    let result = number * 2;
    callback(result);
}
function display(result) {
    console.log(result);
}
processNumber(10, display);

///Simple Closure Counter

function createCounter() {
    let count = 0;

    return function () {
        count++;
        console.log(count);
    };
}
const counter = createCounter();
counter();
counter();
counter();

////Push and Pop
let numbers = [10, 20, 30, 40, 50];
numbers.push(60);
numbers.push(70);
numbers.pop();
console.log(numbers);

///shift & unshift

let fruits = ["Apple", "Banana", "Mango"];
fruits.unshift("Orange");
fruits.shift();
console.log(fruits);

/// Array Methods Until concat()
const fruitsname = ["Apple", "Mango", "Orange"];
const vegetables = ["Carrot", "Potato"];
fruitsname.push("Banana");
fruitsname.pop();
fruitsname.unshift("Grapes");
fruitsname.shift();
console.log("Length:", fruitsname.length);
const result = fruits.concat(vegetables);
console.log(result);