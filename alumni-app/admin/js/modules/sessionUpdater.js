import { request_POST } from './modified.js';

///////////////////////////////////
//  Updates the token everytime  //
///////////////////////////////////
// updates the token every min_time_secs seconds
// if successful update was done
function successfulUpdate(response) {
    // updates cookies and increment new id
    if (response['update_status'] == 'updated') {
        document.cookie = `token=${response['new_token']}; path=/`;

        const new_id = window.localStorage.getItem('new_id');
        window.localStorage.setItem('new_id', parseInt(new_id) + 1);
    }
}

function errorOccured(error) { }
setInterval(() => {
    request_POST('/admin/api/update_session.php', { 'old_id' : window.localStorage.getItem('id'), 'new_id' : window.localStorage.getItem('new_id') }, successfulUpdate, errorOccured);
}, 100 * 1000);