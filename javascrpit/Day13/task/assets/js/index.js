let heading = document.getElementById("heading");

heading.textContent = "Welcome to JavaScript";

let paragraphs = document.querySelectorAll(".para");

paragraphs.forEach(function(p) {
    p.textContent = "This paragraph has been changed!";
});