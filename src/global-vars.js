import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8008';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';

const stateList = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
    "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
    "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
    "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
    "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
]

// Process AJAX error during login attempt
const processAjaxLoginError = function(error) {
    let errorMsg = "";
    if (error.response) {
        if (error.response.status == 401) {
            errorMsg = error.response.data.message;
        }
        else {
            console.error("Response contains error code " + error.response.status);
        }
    }
    else if (error.request) {
        console.error("No response received so logging request");
        console.error(error.request);
    }
    else {
        console.error("Problem with request: " + error.message);
    }

    return errorMsg;
}

const processAjaxAuthError = function(error, router) {
    if (error.response) {
        if (error.response.status == 401) {
            //console.log("401 error so redirect to login");
            router.push("/login");
        }
        else {
            console.error("Response contains error code " + error.response.status);
        }
    }
    else if (error.request) {
        console.error("No response received so logging request");
        console.error(error.request);
    }
    else {
        console.error("Problem with request: " + error.message);
    }
}

export {
    axios,
    processAjaxLoginError,
    processAjaxAuthError,
    stateList
}
