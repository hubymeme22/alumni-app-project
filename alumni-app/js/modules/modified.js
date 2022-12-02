const API_URL = window.location.origin + '/';

// modified function for sending POST request
function request_POST(url_path, json_data, accepted_callback, denied_callback) {
    // checks the format of url entered
    if (url_path.charAt(0) == '/')
        url_path = url_path.slice(1);

    let data_format = '';

    // converts the json data into acceptable format
    const keys = Object.keys(json_data);
    keys.forEach((value, index) => {
        data_format += `${keys[index]}=${json_data[value]}&`;
    });

    // sends the request to the server
    fetch(API_URL + url_path, {
        method: 'POST',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: data_format
    })

    .then(resp => { return resp.json() })
    .then(resp => {
        accepted_callback(resp);
    })

    .catch(err => {
        denied_callback(err);
    });
}

// modified function for sending GET request
function request_GET(url_path='', accepted_callback=(data) => {}, rejected_callback=(error) => {}) {
    // checks the format of url entered
    if (url_path.charAt(0) == '/')
        url_path = url_path.slice(1);

    // sends the request to the server
    fetch(API_URL + url_path, {credentials: 'same-origin'})
    .then((data) => { return data.json() })
    .then(accepted_callback)
    .catch(rejected_callback);
}

export { request_POST, request_GET };