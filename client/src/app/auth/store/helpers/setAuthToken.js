import axios from "axios";

const setAuthToken = token => {
  console.log('AUTH');
  if (token) {
    // Apply authorization token to every request if logged in
    axios.defaults.headers.common["Authorization"] = token;
    console.log(axios.defaults.headers.common);
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};
export default setAuthToken;
