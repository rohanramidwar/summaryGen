import axios from "axios"; //used to make api calls

axios.defaults.withCredentials = true;
const API = axios.create({
  baseURL: "http://localhost:5000",
}); //points to backend routes

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const saveSmmry = (newSmmry) => API.post("/smmries", newSmmry); //sends data
export const fetchAllSmmries = (uid) => API.get(`/smmries/${uid}`);
