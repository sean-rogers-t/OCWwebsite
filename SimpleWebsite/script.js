// Check if there are saved courses in localStorage
let courses = JSON.parse(localStorage.getItem('courses')) || [];

// Function to add a course
function addCourse() {
  const courseName = prompt("Enter the name of the course:");
  if (courseName) {
    const newCourse = {
      name: courseName,
      status: "Not Started"
    };
    courses.push(newCourse);
    updateCourseList();
    saveCourses();
  }
}

// Function to update the course list
function updateCourseList() {
  const courseListDiv = document.getElementById("course-list");
  courseListDiv.innerHTML = "";
  
  courses.forEach((course, index) => {
    const courseItem = document.createElement("div");
    courseItem.className = "course-item";

    const courseText = document.createTextNode(`${course.name} - ${course.status}`);
    courseItem.appendChild(courseText);

    const changeStatusButton = document.createElement("button");
    changeStatusButton.textContent = "Change Status";
    changeStatusButton.onclick = function() {
      changeStatus(index);
    };
    courseItem.appendChild(changeStatusButton);

    courseListDiv.appendChild(courseItem);
  });
}

// function updateCourseList1() {
//   const courseListDiv = document.getElementById("course-list");
//   courseListDiv.innerHTML = "";
//   c
//   for(let i=0;i<courses.length;i++){
//     const courseItem = document.createElement("div");
//     courseItem.className = "course-item";
//     const courseText = document.createTextNode(`${courses[i].name} - ${courses[i].status}`);
//     courseItem.appendChild(courseText);
//     const changeStatusButton = document.createElement("button");
//     changeStatusButton.textContent = "Change Status";
//     changeStatusButton.onclick = function() {
//       changeStatus(i);
//     };
//     courseItem.appendChild(changeStatusButton);
//     courseListDiv.appendChild(courseItem);
//   }
// }

// Function to change the status of a course
function changeStatus(index) {
  const statuses = ["Not Started", "In Progress", "Completed"];
  const currentStatusIndex = statuses.indexOf(courses[index].status);
  const newStatusIndex = (currentStatusIndex + 1) % statuses.length;

  courses[index].status = statuses[newStatusIndex];
  updateCourseList();
  saveCourses();
}

// Function to save courses to localStorage
function saveCourses() {
  localStorage.setItem('courses', JSON.stringify(courses));
}

// Initialize the course list
updateCourseList();
