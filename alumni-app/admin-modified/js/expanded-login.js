///////////////////////////
//  TOKEN VALIDATE PART  //
///////////////////////////
// Scenario: Do i have to login again even if i have already logged in?
// Solution: Check if the user already has valid token.
function hasValidToken(data) {
    // proceeds to next webpage
    if (data['validated'] == true)
        window.location.href = '/admin-modified/home.html';
}

function hasInvalidToken(data) {
    // nothing
}

request_POST('/admin-modified/admin-apis/verify.php', { 'old_id': window.localStorage.getItem('id'), 'new_id': window.localStorage.getItem('new_id') }, hasValidToken, hasInvalidToken)

//////////////////
//  LOGIN PART  //
//////////////////
const loginButton = document.getElementsByTagName('button')[0];
const userfield = document.getElementById('username');
const passfield = document.getElementById('password');

function accepted(data) {
    if (data['token'] == null)
        return;

        window.localStorage.setItem('id', data['id']);
        window.localStorage.setItem('new_id', data['id']);
        document.cookie = `token=${data['token']};`;
        window.location.href = '/admin-modified/home.html';
}

function declined(error) {
    console.log(error);
    alert('Invalid username/password');
}

loginButton.onclick = () => {
    console.log(userfield.value);
    console.log(passfield.value);

    request_POST('/admin-modified/admin-apis/login.php', {
        'username': userfield.value,
        'password': md5(passfield.value)
    }, accepted, declined);
}