import { request_POST } from './modules/modified.js';
import { token_check } from './modules/constant-token-check.js';

// button lists
const home = document.getElementById('btn-home');
const course = document.getElementById('btn-course');
const alumni = document.getElementById('btn-alumni');
const jobs = document.getElementById('btn-jobs');
const events = document.getElementById('btn-events');
const users = document.getElementById('btn-users');

const addCourse = document.getElementById('add-course');
const updateCourse = document.getElementById('update-course');
const prevTbl = document.getElementById('prev_table');
const nextTbl = document.getElementById('next_table');

const jobPost = document.getElementById('btn-job-post');
const jobPrev = document.getElementById('btn-job-preview');
const jobCancel = document.getElementById('btn-job-cancel');

const addJob = document.getElementById('add-job');

// section lists
const home_section = document.getElementById('home-section');
const course_section = document.getElementById('course-section');
const alumni_section = document.getElementById('alumni-section');
const jobs_section = document.getElementById('jobs-section');
const events_section = document.getElementById('events-section');
const users_section = document.getElementById('users-section');

const btnLst = [home, course, alumni, jobs, events, users];
const sctnLst = [home_section, course_section, alumni_section, jobs_section, events_section, users_section];

const server_side_data = {};
let table_page = 0;

console.log(server_side_data);

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

// function displayCourse(id, coursename) {
//     const tabledata_container = document.getElementsByTagName('tbody')[0];
//     const row = document.createElement('tr');
//     const col_id = document.createElement('td');
//     const col_course = document.createElement('td');
//     const col_edits = document.createElement('td');

//     col_edits.innerHTML = '<a href="">Edit</a><a href="">Delete</a>';
//     row.appendChild(col_id);
//     row.appendChild(col_course);
//     row.appendChild(col_edits);

//     tabledata_container.appendChild(row);
// }

// hides the jobForm
function hideJobForm() {
    document.querySelector('.answer-sheet-container').style.display = 'none';
    document.getElementById('inpt-job-company').value = '';
    document.getElementById('inpt-job-address').value = '';
    document.getElementById('inpt-job-header').value = '';
    document.getElementById('inpt-job-content').textContent = '';

    jobCancel.onclick = () => {};
}

// displays the job posting form
function displayJobForm() {
    document.querySelector('.answer-sheet-container').style.display = '';
    jobCancel.onclick = hideJobForm;
}

// callback param: will be executed after the user clicked "ok" button
// by default, it will only hide the popup.
function displayPopup(message, callback=hidePopup) {
    document.getElementById('popup').style.display = "";
    document.getElementById('popup-message').innerText = message;

    document.getElementById('popup-button').onclick = callback;
}

function hidePopup() {
    document.getElementById('popup').style.display = "none";
}

function initializeHomeValues() {
    const courses = (response) => {
        if (response['status'] == 'ok') {
            document.getElementById('course_size').innerText = response['size'];
            server_side_data['courses'] = response['data'];
        }
    }

    const events = (response) => {
        if (response['status'] == 'ok') {
            document.getElementById('events_num').innerText = response['size'];
            server_side_data['events'] = response['data'];
        }
    }

    const alumni = (response) => {
        if (response['status'] == 'ok') {
            document.getElementById('alumni_num').innerText = response['size'];
            server_side_data['alumni'] = response['data'];
        }
    }

    const jobs = (response) => {
        if (response['status'] == 'ok') {
            document.getElementById('jobs_num').innerText = response['size'];
            server_side_data['jobs'] = response['data'];
        }
    }

    request_POST('/admin/api/get_courses.php', {'old_id': window.localStorage.getItem('id'), 'new_id': window.localStorage.getItem('new_id')}, courses, () => {})
    request_POST('/admin/api/get_events.php', {'old_id': window.localStorage.getItem('id'), 'new_id': window.localStorage.getItem('new_id')}, events, () => {})
    request_POST('/admin/api/get_alumni.php', {'old_id': window.localStorage.getItem('id'), 'new_id': window.localStorage.getItem('new_id')}, alumni, () => {})
    request_POST('/admin/api/get_joblist.php', {'old_id': window.localStorage.getItem('id'), 'new_id': window.localStorage.getItem('new_id')}, jobs, () => {})
}

function initializeCourseValues() {
    initializeHomeValues();

    const table_body = document.getElementsByTagName('tbody')[0];
    table_body.innerHTML = '';
    table_page = 0;

    nextTbl.classList.add('canceled');
    prevTbl.classList.add('canceled');
    if (server_side_data['courses'].length > 3)
        nextTbl.classList.remove('canceled');

    if (server_side_data['courses'] != null) {
        server_side_data['courses'].forEach((element, index) => {
            if (index > 2)
                return

            // push all the courses on the table
            const tr = document.createElement('tr');
            const td_id = document.createElement('td');
            const td_course = document.createElement('td');
            const td_action = document.createElement('td');
            const edit_a = document.createElement('a');
            const delete_a = document.createElement('a');

            edit_a.onclick = () => {
                editTrigger(index, element[0]);
            };

            delete_a.onclick = () => {
                deleteTrigger(element[0]);
            }

            edit_a.innerText = 'Edit ';
            edit_a.href = 'javascript: return false';
            delete_a.innerText = ' Delete';
            delete_a.href = 'javascript: return false';

            td_id.innerText = index + 1;
            td_course.innerText = element[1];
            td_action.appendChild(edit_a);
            td_action.appendChild(delete_a);
            // td_action.innerHTML = `<a onclick="javascript: editTrigger(${index}, ${element[0]})" href="javascript: return false;">Edit</a> <a onclick="deleteTrigger(${element[0]})" href="javascript: return false;">Delete</a>`;

            tr.appendChild(td_id);
            tr.appendChild(td_course);
            tr.appendChild(td_action);

            table_body.appendChild(tr);
        });
    }
}

function initializeAlumniValues() {
    initializeHomeValues();
    const alumniDataContainer = document.getElementById('alumni-body-container');
    const alumniList = server_side_data['alumni'];

    // append the data to the table
    alumniDataContainer.innerHTML = '';
    alumniList.forEach((element, index) => {
        const body_container = document.createElement('div');
        const index_data = document.createElement('div');
        const name = document.createElement('div');
        const course = document.createElement('div');
        const status = document.createElement('div');

        const course_id = element[4];
        let course_name;
        let account_status;

        // use the course that contains the ff. course_id
        const course_list = server_side_data['courses'];
        for (let i = 0; i < course_list.length; i++) {
            if (course_list[i][0] == course_id) {
                course_name = course_list[i][1];
                break;
            }
        }

        body_container.classList.add('body-content-grid');
        index_data.innerText = (index + 1);
        name.innerText = element[1];
        course.innerText = course_name;

        // sets the user account status
        const status_button = document.createElement('button');
        switch(element[8]) {
            case '1':
                status_button.onclick = () => { holdAccount(element[0], status_button) };
                status_button.classList.add('verified');
                status_button.innerText = 'verified';
                break;
            case '2':
                status_button.onclick = () => { verifyAccount(element[0], status_button) };
                status_button.classList.add('on-hold');
                status_button.innerText = 'on-hold';
                break;
            default:
                status_button.onclick = () => { verifyAccount(element[0], status_button) };
                status_button.classList.add('pending');
                status_button.innerText = 'pending';
                break;
        }

        status.appendChild(status_button);
        body_container.appendChild(index_data);
        body_container.appendChild(name);
        body_container.appendChild(course);
        body_container.appendChild(status);
        alumniDataContainer.appendChild(body_container);
    });
}

function initializeJobsValues() {
    initializeHomeValues();
    const jobsDataContainer = document.getElementById('jobs-body-container');
    const jobList = server_side_data['jobs'];

    jobsDataContainer.innerHTML = '';
    jobList.forEach((element) => {
        const body_container = document.createElement('div');
        const index_data = document.createElement('div');
        const header = document.createElement('div');
        const company = document.createElement('div');
        const address = document.createElement('div');

        index_data.innerText = element[0];
        header.innerText = element[1];
        company.innerText = element[2];
        address.innerText = element[3];

        body_container.classList.add('body-content-grid');

        body_container.appendChild(index_data);
        body_container.appendChild(header);
        body_container.appendChild(company);
        body_container.appendChild(address);
        jobsDataContainer.appendChild(body_container);
    });

}

function addNewCourse() {
    const courseInp = document.getElementById('course-input');

    function added(response) {
        if (!response['valid_token']) {
            alert('Session Expired');
            return;
        }

        if (response['added']) {
            displayPopup('Course Added!', () => {
                hidePopup();
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            });
            initializeCourseValues();
            courseInp.value = '';
        }
    }

    if (courseInp.value == '')
        return;

    request_POST('/admin/api/add_course.php', {'course': courseInp.value, 'old_id': window.localStorage.getItem('id'), 'new_id': window.localStorage.getItem('new_id')}, added, () => {});
}

function editTrigger(idx, id) {
    const inpt = document.getElementById('course-input');

    updateCourse.classList.remove('canceled');
    addCourse.classList.add('canceled');
    inpt.value = server_side_data['courses'][idx][1];

    function accepted(response) {
        if (response['update_status'] == 'updated') {
            displayPopup('Course Updated!', () => {
                hidePopup();
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            });
            inpt.value = '';
        }
    }

    addCourse.onclick = () => {};
    updateCourse.onclick = () => {
        // send server request for updating this course
        request_POST('/admin/api/update_course.php', {'old_id': window.localStorage.getItem('id'), 'new_id': window.localStorage.getItem('new_id'), 'course_id': id, 'new_course_name': inpt.value}, accepted, () => {});

        // reset
        updateCourse.onclick = () => {};
        updateCourse.classList.add('canceled');
        addCourse.onclick = addNewCourse;
        addCourse.classList.remove('canceled');
    }
}


function deleteTrigger(id) {
    function accepted(response) {
        if (response['delete_status'] == 'deleted') {
            displayPopup('Course Deleted!', () => {
                hidePopup();
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            });
        }
    }

    // send server request for deleting this course
    request_POST('/admin/api/delete_course.php', {'old_id': window.localStorage.getItem('id'), 'new_id': window.localStorage.getItem('new_id'), 'course_id': id}, accepted, () => {});
}

// display the next 3 courses
function nextTable() {
    // limits the button to go to next table page
    const next_table_page = (table_page + 3);
    if (next_table_page > server_side_data['courses'].length)
        return;

    // remove the canceled prevTbl design
    if (prevTbl.classList.contains('canceled'))
        prevTbl.classList.remove('canceled');

    // display on interface is only limited to 3 rows of courses
    const table_body = document.getElementsByTagName('tbody')[0];
    table_body.innerHTML = '';
    if (server_side_data['courses'] != null) {
        server_side_data['courses'].forEach((element, index) => {
            if (index >= next_table_page && index < (next_table_page + 3)) {
                const tr = document.createElement('tr');
                const td_id = document.createElement('td');
                const td_course = document.createElement('td');
                const td_action = document.createElement('td');

                td_id.innerText = index + 1;
                td_course.innerText = element[1];
                td_action.innerHTML = `<a onclick="editTrigger(${index}, ${element[0]})" href="javascript: return false;">Edit</a> <a onclick="deleteTrigger(${element[0]})" href="javascript: return false;">Delete</a>`;

                tr.appendChild(td_id);
                tr.appendChild(td_course);
                tr.appendChild(td_action);

                table_body.appendChild(tr);
            }
        });

        table_page = next_table_page;
        if ((table_page + 3) >= server_side_data['courses'].length) {
            nextTbl.classList.add('canceled');
        }
    }
}

// display the last 3 courses
function prevTable() {
    // limits the button to go to next table page
    const next_table_page = (table_page - 3);
    if (table_page <= 0) {
        prevTbl.classList.add('canceled');
        return;
    }

    // remove the canceled nextTbl design
    if (nextTbl.classList.contains('canceled'))
        nextTbl.classList.remove('canceled');

    // display on interface is only limited to 3 rows of courses
    const table_body = document.getElementsByTagName('tbody')[0];
    table_body.innerHTML = '';
    if (server_side_data['courses'] != null) {
        server_side_data['courses'].forEach((element, index) => {
            if (index >= next_table_page && index < (next_table_page + 3)) {
                const tr = document.createElement('tr');
                const td_id = document.createElement('td');
                const td_course = document.createElement('td');
                const td_action = document.createElement('td');

                td_id.innerText = index + 1;
                td_course.innerText = element[1];
                td_action.innerHTML = `<a onclick="editTrigger(${index}, ${element[0]})" href="javascript: return false;">Edit</a> <a onclick="deleteTrigger(${element[0]})" href="javascript: return false;">Delete</a>`;

                tr.appendChild(td_id);
                tr.appendChild(td_course);
                tr.appendChild(td_action);

                table_body.appendChild(tr);
            }
        });

        table_page = next_table_page;
    }
}

function verifyAccount(id, self_element) {
    function accepted(response) {
        if (response['activated']) {
            self_element.classList.remove('on-hold');
            self_element.classList.remove('pending');
            self_element.classList.add('verified');
            self_element.innerText = 'verified';
            self_element.onclick = () => {
                holdAccount(id, self_element);
            }
        } else {
            displayPopup('Account Not Activated');
        }
    }

    request_POST('/admin/api/activate_alumni.php', {'old_id': window.localStorage.getItem('id'), 'new_id': window.localStorage.getItem('new_id'), 'id': id}, accepted, () => {});
}

function holdAccount(id, self_element) {
    function accepted(response) {
        if (response['hold']) {
            self_element.classList.remove('verified');
            self_element.classList.add('on-hold');
            self_element.innerText = 'on-hold';
            self_element.innerText = 'on-hold';
            self_element.onclick = () => {
                verifyAccount(id, self_element);
            }
        } else {
            displayPopup('Cannot Hold Account');
        }
    }

    request_POST('/admin/api/hold_alumni.php', {'old_id': window.localStorage.getItem('id'), 'new_id': window.localStorage.getItem('new_id'), 'id': id}, accepted, () => {});
    self_element.onclick = () => {
        verifyAccount(id, self_element);
    }
}

// initial design of ui
removeSelectedExcept(home);
hideSectionExcept(home_section);
initializeHomeValues();
hidePopup();

// button event listeners
home.onclick = () => {
    removeSelectedExcept(home);
    hideSectionExcept(home_section);
    initializeHomeValues();
}

course.onclick = () => {
    removeSelectedExcept(course);
    hideSectionExcept(course_section);
    initializeCourseValues();
}

alumni.onclick = () => {
    removeSelectedExcept(alumni);
    hideSectionExcept(alumni_section);
    initializeAlumniValues();
}

jobs.onclick = () => {
    removeSelectedExcept(jobs);
    hideSectionExcept(jobs_section);
    initializeJobsValues();
}

events.onclick = () => {
    removeSelectedExcept(events);
    hideSectionExcept(events_section);
}

users.onclick = () => {
    removeSelectedExcept(users);
    hideSectionExcept(users_section);
}

addCourse.onclick = () => {
    addNewCourse();
}

nextTbl.onclick = () => {
    nextTable();
}

prevTbl.onclick = () => {
    prevTable();
}

jobPost.onclick = () => {
    function accepted(response) {
        if (response['added']) {
            displayPopup('Job Added!', () => {
                hidePopup();
                hideJobForm();
                window.location.reload();
            });
        } else {
            displayPopup('Error occured in adding course', () => {
                hidePopup();
                hideJobForm();
                window.location.reload();
            });
        }
    }

    const company = document.getElementById('inpt-job-company').value;
    const address = document.getElementById('inpt-job-address').value;
    const header = document.getElementById('inpt-job-header').value;
    const content = document.getElementById('inpt-job-content').value;
    console.log(content);

    if (company == '' || address == '' || header == '' || content == '') {
        displayPopup('Input Not Complete!');
        return;
    }

    const data = {
        'old_id': window.localStorage.getItem('id'),
        'new_id': window.localStorage.getItem('new_id'),
        'company': company, 'address': address,
        'header': header, 'md_content': content};

    request_POST('/admin/api/add_job.php', data, accepted, () => {});
}

addJob.onclick = () => {
    displayJobForm();
}

token_check('#', '/admin/index.html');