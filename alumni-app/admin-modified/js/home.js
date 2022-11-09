// button lists
const home = document.getElementById('btn-home');
const course = document.getElementById('btn-course');
const alumni = document.getElementById('btn-alumni');
const jobs = document.getElementById('btn-jobs');
const events = document.getElementById('btn-events');
const users = document.getElementById('btn-users');

// section lists
const home_section = document.getElementById('home-section');
const course_section = document.getElementById('course-section');
const alumni_section = document.getElementById('alumni-section');
const jobs_section = document.getElementById('jobs-section');
const events_section = document.getElementById('events-section');
const users_section = document.getElementById('users-section');

const btnLst = [home, course, alumni, jobs, events, users];
const sctnLst = [home_section, course_section, alumni_section, jobs_section, events_section, users_section];

// Functions for displays
function removeSelectedExcept(target) {
    btnLst.forEach(element => {
        if (element == target)
            element.classList.add('selected');
        else
            element.classList.remove('selected');
    });
}

function hideSectionExcept(target) {
    sctnLst.forEach(element => {
        if (element == target)
            element.style.display = '';
        else
            element.style.display = 'none';
    });
}

function displayCourse(id, coursename) {
    const tabledata_container = document.getElementsByTagName('tbody')[0];
    const row = document.createElement('tr');
    const col_id = document.createElement('td');
    const col_course = document.createElement('td');
    const col_edits = document.createElement('td');

    col_edits.innerHTML = '<a href="">Edit</a><a href="">Delete</a>';
    row.appendChild(col_id);
    row.appendChild(col_course);
    row.appendChild(col_edits);

    tabledata_container.appendChild(row);
}

// initial design of ui
removeSelectedExcept(home);
hideSectionExcept(home_section);

// button event listeners
home.onclick = () => {
    removeSelectedExcept(home);
    hideSectionExcept(home_section);
}

course.onclick = () => {
    removeSelectedExcept(course);
    hideSectionExcept(course_section);
}

alumni.onclick = () => {
    removeSelectedExcept(alumni);
    hideSectionExcept(alumni_section);
}

jobs.onclick = () => {
    removeSelectedExcept(jobs);
    hideSectionExcept(jobs_section);
}

events.onclick = () => {
    removeSelectedExcept(events);
    hideSectionExcept(events_section);
}

users.onclick = () => {
    removeSelectedExcept(users);
    hideSectionExcept(users_section);
}

// retrieving data from database
function acceptedCallback(response) {
}

request_POST('/admin-modified/admin-apis/add_courses.php', {})