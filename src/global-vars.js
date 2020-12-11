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
const processAjaxLoginError = function (error) {
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

const processAjaxAuthError = function (error, router) {
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

const processValidationErrors = function (error) {
  let retVal = [];
  if (error.response) {
    if (error.response.status == 400) {
      retVal = error.response.data.errors;
    }
  }

  return retVal;
}

const getValidationError = function (fieldName, validationErrors) {
  let returnValue;

  let foundElement = validationErrors.find(function (element) {
    return element.param === fieldName;
  });

  if (foundElement !== undefined) {
    returnValue = foundElement.msg;
  }

  return returnValue;
}

const getOrderStatusStr = function (status) {
  let statusStr = "Unknown";

  switch (status) {
    case 1:
      statusStr = "Pending";
      break;
    case 2:
      statusStr = "Processing";
      break;
    case 3:
      statusStr = "Rejected";
      break;
    case 4:
      statusStr = "Completed";
  }

  return statusStr;
}


export {
  axios,
  processAjaxLoginError,
  processAjaxAuthError,
  processValidationErrors,
  getValidationError,
  getOrderStatusStr,
  stateList
}
