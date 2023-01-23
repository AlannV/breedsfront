import axios from "axios";

import {
  GET_TEMPERAMENTS,
  GET_BREEDS_BY_NAME,
  GET_BREEDS,
  FILTER_BY_TEMPERAMENT,
  GET_DETAILS,
  CLEAR_DETAIL,
  ORDER_BY_BREED,
  ORDER_BY_WEIGHT,
  GET_COUNTRIES,
  GET_GROUPS,
  FILTER_BY_GROUPS,
} from "../action-types/index";

const {
  REACT_APP_BREEDS_LOCAL_URL,
  REACT_APP_BREEDS_BY_NAME_LOCAL_URL,
  REACT_APP_COUNTRIES_LOCAL_URL,
  REACT_APP_GROUPS_LOCAL_URL,
  REACT_APP_TEMPERAMENTS_LOCAL_URL,
} = process.env;

export function getBreeds() {
  return async function (dispatch) {
    var json = await axios.get(`${REACT_APP_BREEDS_LOCAL_URL}`);
    return dispatch({
      type: GET_BREEDS,
      payload: json.data,
    });
  };
}

export function getBreedsByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        `${REACT_APP_BREEDS_BY_NAME_LOCAL_URL}?name=` + name
      );
      return dispatch({
        type: GET_BREEDS_BY_NAME,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    console.log(`${REACT_APP_BREEDS_LOCAL_URL}` + id);
    try {
      var json = await axios.get(`${REACT_APP_BREEDS_LOCAL_URL}` + id);
      return dispatch({
        type: GET_DETAILS,
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    var json = await axios.get(`${REACT_APP_TEMPERAMENTS_LOCAL_URL}`);
    return dispatch({
      type: GET_TEMPERAMENTS,
      payload: json.data,
    });
  };
}

export function getCountries() {
  return async function (dispatch) {
    var json = await axios.get(`${REACT_APP_COUNTRIES_LOCAL_URL}`);
    return dispatch({
      type: GET_COUNTRIES,
      payload: json.data,
    });
  };
}

export function getGroups() {
  return async function (dispatch) {
    var json = await axios.get(`${REACT_APP_GROUPS_LOCAL_URL}`);
    return dispatch({
      type: GET_GROUPS,
      payload: json.data,
    });
  };
}

export function filterBreedsByTemperament(payload) {
  return {
    type: FILTER_BY_TEMPERAMENT,
    payload,
  };
}

export function filterByGroup(payload) {
  return {
    type: FILTER_BY_GROUPS,
    payload,
  };
}

export function postBreed(payload) {
  return async function (dispatch) {
    const json = await axios
      .post(`${REACT_APP_BREEDS_LOCAL_URL}`, payload)
      .then((res) => res.status === 200 && alert("Breed created successfully"));
    return json;
  };
}

export function orderByBreed(payload) {
  return {
    type: ORDER_BY_BREED,
    payload,
  };
}
export function orderByWeight(payload) {
  return {
    type: ORDER_BY_WEIGHT,
    payload,
  };
}

export function clearDetail() {
  return { type: CLEAR_DETAIL };
}

export function startUploadingFiles(payload) {
  return async (dispatch) => {
    let prueba = await fileUpload(payload[0]).then((s) => {
      dispatch({
        type: "GET_CLOUDINARY_IMG",
        payload: s,
      });
    });
    return prueba;
  };
}

async function fileUpload(file) {
  if (!file) throw new Error("No tenemos archivo para subir");
  const cloudUrl = "https://api.cloudinary.com/v1_1/cinematime/upload";
  const formData = new FormData();
  formData.append("upload_preset", "cinema");
  formData.append("file", file);
  try {
    const resp = await fetch(cloudUrl, {
      method: "POST",
      body: formData,
    });
    if (!resp.ok) throw new Error("No se pudo subir imagen");
    const cloudResp = await resp.json();
    return cloudResp.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}
