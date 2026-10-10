// Student data
let students = [];


// Load students from localStorage
try {
    students = JSON.parse(localStorage.getItem("students")) || [];
} catch (error) {
    students = [];
    localStorage.removeItem("students");
}


// Set today's date
document.getElementById("attendanceDate").value =
    new Date().toISOString().split("T")[0];


// Display students when page loads
displayStudents();
updateDashboard();


// Add Student
function addStudent() {

    let name = document.getElementById("studentName").value.trim();
    let roll = document.getElementById("rollNumber").value.trim();

    if (name === "" || roll === "") {
        alert("Please enter student name and roll number");
        return;
    }

    let student = {
        name: name,
        roll: roll,
        present: 0,
        absent: 0,
        status: ""
    };

    students.push(student);

    saveData();

    document.getElementById("studentName").value = "";
    document.getElementById("rollNumber").value = "";

    displayStudents();
    updateDashboard();
}


// Display Students
function displayStudents() {

    let table = document.getElementById("studentTable");

    table.innerHTML = "";

    students.forEach(function(student, index) {

        let total = student.present + student.absent;

        let percentage = 0;

        if (total > 0) {
            percentage = ((student.present / total) * 100).toFixed(1);
        }

        table.innerHTML += `
            <tr>

                <td>${student.roll}</td>

                <td>${student.name}</td>

                <td>

                    <button onclick="markPresent(${index})">
                        Present
                    </button>

                    <button onclick="markAbsent(${index})">
                        Absent
                    </button>

                    <span>${student.status}</span>

                </td>

                <td>
                    ${percentage}%
                </td>

                <td>

                    <button onclick="deleteStudent(${index})">
                        Delete
                    </button>

                </td>

            </tr>
        `;
    });
}


// Mark Present
function markPresent(index) {

    students[index].status = "Present";

    displayStudents();
    updateDashboard();
}


// Mark Absent
function markAbsent(index) {

    students[index].status = "Absent";

    displayStudents();
    updateDashboard();
}


// Save Attendance
function saveAttendance() {

    students.forEach(function(student) {

        if (student.status === "Present") {

            student.present++;

        } else if (student.status === "Absent") {

            student.absent++;
        }

        student.status = "";
    });

    saveData();

    displayStudents();
    updateDashboard();

    alert("Attendance saved successfully!");
}


// Delete Student
function deleteStudent(index) {

    if (confirm("Do you want to delete this student?")) {

        students.splice(index, 1);

        saveData();

        displayStudents();
        updateDashboard();
    }
}


// Clear All Students
function clearAllStudents() {

    if (confirm("Are you sure you want to delete all students?")) {

        students = [];

        saveData();

        displayStudents();
        updateDashboard();
    }
}


// Search Student
function filterStudents() {

    let searchText =
        document.getElementById("searchStudent").value.toLowerCase();

    let rows =
        document.querySelectorAll("#studentTable tr");

    rows.forEach(function(row) {

        let text = row.innerText.toLowerCase();

        if (text.includes(searchText)) {

            row.style.display = "";

        } else {

            row.style.display = "none";
        }
    });
}


// Update Dashboard
function updateDashboard() {

    document.getElementById("totalStudents").innerText =
        students.length;

    let present = 0;
    let absent = 0;

    students.forEach(function(student) {

        if (student.status === "Present") {
            present++;
        }

        if (student.status === "Absent") {
            absent++;
        }
    });

    document.getElementById("presentCount").innerText =
        present;

    document.getElementById("absentCount").innerText =
        absent;
}


// Save data to localStorage
function saveData() {

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );
}