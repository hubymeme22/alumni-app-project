// this function checks if the token of the user is valid
// if not valid, it will redirect the page to the inputed route
function responseCallback(redirect_link_true, redirect_link_false) {
    return (response) => {
        if (response['validated'] == true) {
            window.location.href = redirect_link_true;
        } else {
            window.location.href = redirect_link_false;
        }
    }
}

function errorResponseCallback(redirect_link_false) {
    return (error) => {
        // alert('Session Expired');
        window.location.href = redirect_link_false;
    }
}

function token_check(redirect_link_true='#', redirect_link_false='#') {
    request_POST('/api/verify.php', {'old_id': window.localStorage.getItem('id'), 'new_id': window.localStorage.getItem('new_id')}, responseCallback(redirect_link_true, redirect_link_false), errorResponseCallback(redirect_link_false));
}