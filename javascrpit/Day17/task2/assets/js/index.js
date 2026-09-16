let employees = [];

let form = document.getElementById("employeeForm");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("name").value;
    let department = document.getElementById("department").value;
    let salary = document.getElementById("salary").value;

    let employee = {
        name: name,
        department: department,
        salary: salary
    };

    employees.push(employee);

    let table = document.getElementById("employeeTable");

    table.innerHTML = "";

    employees.forEach(function(employee) {

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${employee.name}</td>
            <td>${employee.department}</td>
            <td>${employee.salary}</td>
        `;

        table.appendChild(row);

    });

    form.reset();

});