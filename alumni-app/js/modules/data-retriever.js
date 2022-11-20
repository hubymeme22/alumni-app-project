// This module is for packing up all the request that can be made
// for retrieving data on the backend side of the API. The purpose
// of this module is to simplify data retrieving on the front-end side

import { request_POST } from './modified.js';

function getJobs(accepted=(data) => {}, rejected=(error) => {}) {
    const data = {
        'old_id': window.localStorage.getItem('id'),
        'new_id': window.localStorage.getItem('new_id')};
    request_POST('/api/jobs.php', data, accepted, rejected);
}

function getAlumni(accepted=(data) => {}, rejected=(error) => {}) {
    const data = {
        'old_id': window.localStorage.getItem('id'),
        'new_id': window.localStorage.getItem('new_id')};
    request_POST('/api/alumni.php', data, accepted, rejected);
}

export { getJobs, getAlumni };