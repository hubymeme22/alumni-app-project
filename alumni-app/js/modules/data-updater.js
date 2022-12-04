import { request_POST } from './modified.js';

const defaultAcceptCallback = (response) => {};
const defaultRejectCallback = (response) => {};

function updateProfileData(params, accepted=defaultAcceptCallback, rejected=defaultRejectCallback) {
    params['old_id'] = window.localStorage.getItem('id');
    params['new_id'] = window.localStorage.getItem('new_id');
    request_POST('/api/profileUpdate.php', params, accepted, rejected);
}

export {
    updateProfileData
}