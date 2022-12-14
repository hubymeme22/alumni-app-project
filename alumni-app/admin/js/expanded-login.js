///////////////////////////
//  TOKEN VALIDATE PART  //
///////////////////////////
import { request_POST } from "./modules/modified.js";
import { md5 } from "./modules/md5.js";

// Scenario: Do i have to login again even if i have already logged in?
// Solution: Check if the user already has valid token.
function hasValidToken(data) {
    // proceeds to next webpage
    if (data['validated'] == true)
        window.location.href = '/admin/home.html';
}

function hasInvalidToken(data) {
    // nothing
}

request_POST('/admin/api/verify.php', { 'old_id': window.localStorage.getItem('id'), 'new_id': window.localStorage.getItem('new_id') }, hasValidToken, hasInvalidToken)

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
        document.cookie = `token=${data['token']}; path=/`;
        window.location.href = '/admin/home.html';
}

function declined(error) {
    console.log(error);
    alert('Invalid username/password');
}

loginButton.onclick = () => {
    request_POST('/admin/api/login.php', {
        'username': userfield.value,
        'password': md5(passfield.value)
    }, accepted, declined);
}