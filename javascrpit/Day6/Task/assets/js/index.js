let number="";
for (i=1;i<=20;i++){
    number=number+i+" ";
}
console.log(number);

// even number 1 to 50

let num=" ";
for(i=1;i<=50;i++){
    if (i%2===0) {
        num=num+i+" ";

    }
}
console.log(num);

// Odd Numbers 1to 50

let no=" ";
for(i=0;i<=50;i++){
    if(i%2===1){
        no=no+i+" ";

    }
}
console.log(no);

// Sum
let Sum=0;
for(i=0;i<=20;i++){
    Sum+=i
}
console.log(Sum);

//Even sum for 1 to 50 numbers

let a=0;
for(i=0;i<=50;i++){
    if(i%2===0)
    a+=i
}
console.log(a);

//count
let count = 0;

for (let i = 1; i <= 100; i++) {
    if (i % 2 === 0) {
        count++;
    }
}

console.log("Even Count:", count);
