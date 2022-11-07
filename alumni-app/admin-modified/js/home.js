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

// initial design of ui
removeSelectedExcept(home);
hideSectionExcept(home_section);

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