
let box = document.getElementById("box");
let button = document.getElementById("btn");

button.addEventListener("click", function() {
    box.classList.add("active");
});

let box1=document.getElementById("box1")
let btn1=document.getElementById("btn1")

btn1.addEventListener("click", ()=>{
    
    text.classList.toggle("show");

    box1.classList.remove("active");
})
