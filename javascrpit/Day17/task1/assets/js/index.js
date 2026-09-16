let students = [];

let button = document.getElementById("addStudent");

button.addEventListener("click", function () {

    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let city = document.getElementById("city").value;

    let student = {
        name: name,
        age: age,
        city: city
    };

    students.push(student);

    let studentList = document.getElementById("studentList");

    studentList.innerHTML = "";

    students.forEach(function(student) {

        let div = document.createElement("div");

        div.innerHTML = `
            <p>Name: ${student.name}</p>
            <p>Age: ${student.age}</p>
            <p>City: ${student.city}</p>
            <hr>
        `;

        studentList.appendChild(div);
    });
});