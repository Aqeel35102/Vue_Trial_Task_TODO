// api.js

import axios from 'axios';
import { getLocalStorage, clearLocalStorage, clearSessionStorage } from './store/localStorage'


const urlPrefix = "http://localhost:8000/api";

//Set Authorization token in Request Header
export function setHeader(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

//Logout User
export function LOGOUT() {
    setHeader(null);
    clearLocalStorage();
    clearSessionStorage();
}

//Get API
export async function get(subURL) {
    setHeader(getLocalStorage('accessToken'));
  return axios.get(urlPrefix + subURL)
    .then((response) => {
      if (response.status === 401) {
        // Handle unauthorized access
      }
      return response.data;
    }).catch((error) => {
        LOGOUT();
      console.warn("Error GET", error);
      throw error;
    });
}

//POST API
export async function post(subURL, data) {
    setHeader(getLocalStorage('accessToken'));
  return axios.post(urlPrefix + subURL, data)
    .then((response) => {
      if (response.status === 401) {
        // Handle unauthorized access
      }
      return response.data;
    }).catch((error) => {
        LOGOUT();
      console.warn("Error POST", error);
      throw error;
    });
}

//PUT API
export async function put(subURL, data) {
    setHeader(getLocalStorage('accessToken'));
  return axios.put(urlPrefix + subURL, data)
    .then((response) => {
      if (response.status === 401) {
        // Handle unauthorized access
      }
      return response.data;
    }).catch((error) => {
        LOGOUT();
      console.warn("Error PUT", error);
      throw error;
    });
}

//DELETE API
export async function deleteAPI(subURL) {
    setHeader(getLocalStorage('accessToken'));
  return axios.delete(urlPrefix + subURL)
    .then((response) => {
      if (response.status === 401) {
        // Handle unauthorized access
      }
      return response.data;
    }).catch((error) => {
        LOGOUT();
      console.warn("Error DELETE", error);
      throw error;
    });
}
