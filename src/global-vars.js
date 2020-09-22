import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8008';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';

export { axios }