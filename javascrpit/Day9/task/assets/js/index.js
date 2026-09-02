function add(a,b){
    return a+b;
}
let result=add(10,20);
console.log(result);

//even numbers//
function printeven(n){
    for(let i=1;i<=n;i++){
        if(i%2===0){
            console.log(i);
            
        }
    }
}
printeven(10);
const factorial = (n) => {
    let fact = 1;

    for (let i = 1; i <= n; i++) {
        fact = fact * i;
    }

    return fact;
};

console.log(factorial(5));
// Global Scope
var a = 10;

console.log(a);


// Function Scope
function test() {
    var b = 20;
    console.log(b);
}

test();


// Block Scope
{
    let c = 30;
    const d = 40;

    console.log(c);
    console.log(d);
}
