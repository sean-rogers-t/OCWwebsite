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
    checkAndAddDeleteAllButton();

  }
}


// Function to update the course list
function updateCourseList() {
  const courseListDiv = document.getElementById("course-list");
  
  courses.forEach((course, index) => {
    let courseItem = document.getElementById(`course-item-${index}`);
    
    // Create new course-item if it doesn't exist
    if (!courseItem) {
      courseItem = document.createElement("div");
      courseItem.className = "course-item";
      courseItem.id = `course-item-${index}`;
      const courseText = document.createTextNode(`${course.name} - ${course.status}`);
      courseItem.appendChild(courseText);
      const changeStatusButton = document.createElement("button");
      changeStatusButton.textContent = "Change Status";
      changeStatusButton.style.marginRight = "10px";
      changeStatusButton.style.marginLeft = "10px";
      changeStatusButton.onclick = function() {
        changeStatus(index);
      };
      courseItem.appendChild(changeStatusButton);
      const deleteCourseButton = document.createElement("button");
      deleteCourseButton.textContent = "Delete Course";
      deleteCourseButton.onclick = function() {
        deleteCourse(index);
      };
      
      courseItem.appendChild(deleteCourseButton);
      courseListDiv.appendChild(courseItem);
    }
    
    // Update the courseItem's text
    courseItem.firstChild ? courseItem.firstChild.nodeValue = `${course.name} - ${course.status}` : 
                            courseItem.appendChild(document.createTextNode(`${course.name} - ${course.status}`));
  });
}

// Function to check if delete all button should be added
function checkAndAddDeleteAllButton(){
  const deleteAllButtonContainer = document.getElementById("delete-all-button-container");
  if(courses.length>0 && !document.getElementById("delete-all-button"))
  {
    const deleteAllButton = document.createElement("button");
    deleteAllButton.textContent = "Delete All Courses";
    deleteAllButton.id = "delete-all-button";
    deleteAllButton.onclick = function() {
      deleteAllCourses();
    };
    deleteAllButtonContainer.appendChild(deleteAllButton);
  }
  
}
// Function to change the status of a course
function changeStatus(index) {
  const statuses = ["Not Started", "In Progress", "Completed"];
  const currentStatusIndex = statuses.indexOf(courses[index].status);
  const newStatusIndex = (currentStatusIndex + 1) % statuses.length;

  courses[index].status = statuses[newStatusIndex];
  updateCourseList();
  saveCourses();
}

function deleteCourse(index){
  const userConfirmed = confirm("Are you sure you want to delete this course?");
  if(userConfirmed){
    const courseItem = document.getElementById(`course-item-${index}`);
    if(courseItem){
      courseItem.remove();
    }
    courses.splice(index,1);
    updateCourseList();
    saveCourses();
  }
  
}

function deleteAllCourses(){
  const userConfirmed = confirm("Are you sure you want to delete all courses?");
  if(userConfirmed){
    courses = [];
    const courseListDiv = document.getElementById("course-list");
    courseListDiv.innerHTML = "";
    updateCourseList();
    saveCourses();
    const deleteButton = document.getElementById("delete-all-button");
    const buttonContainer = document.getElementById("delete-all-button-container");
    if (deleteButton && buttonContainer) {
      buttonContainer.removeChild(deleteButton)
    }
  }
}
// Function to save courses to localStorage
function saveCourses() {
  localStorage.setItem('courses', JSON.stringify(courses));
}

// Initialize the course list
updateCourseList();
