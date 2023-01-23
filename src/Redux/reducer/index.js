import {
  GET_TEMPERAMENTS,
  GET_BREEDS_BY_NAME,
  GET_BREEDS,
  FILTER_BY_TEMPERAMENT,
  GET_DETAILS,
  CLEAR_DETAIL,
  ORDER_BY_BREED,
  ORDER_BY_WEIGHT,
  POST_BREED,
  GET_COUNTRIES,
  GET_GROUPS,
  FILTER_BY_GROUPS,
} from "../action-types/index";

const initialState = {
  breeds: [],
  allBreeds: [],
  temperaments: [],
  allTemperaments: [],
  detail: [],
  countries: [],
  groups: [],
  imgLink: "",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_BREEDS:
      let breeds = action.payload;
      breeds.map((d) => (d.temperaments = d.temperaments.map((t) => t.name)));
      breeds.map((d) => (d.groups = d.groups.map((g) => g.name)));
      return {
        ...state,
        breeds: breeds,
        allBreeds: breeds,
      };

    case GET_BREEDS_BY_NAME:
      let breed = action.payload;
      breed.map((d) => (d.temperaments = d.temperaments.map((t) => t.name)));
      return {
        ...state,
        breeds: action.payload,
      };

    case GET_TEMPERAMENTS:
      let temps = action.payload.map((t) => (t = t.name));
      return {
        ...state,
        temperaments: temps,
        allTemperaments: temps,
      };

    case GET_COUNTRIES:
      let c = action.payload.map((t) => (t = t.name));
      return {
        ...state,
        countries: c,
      };

    case GET_GROUPS:
      let g = action.payload.map((t) => (t = t.name));
      return {
        ...state,
        groups: g,
      };

    case GET_DETAILS:
      return {
        ...state,
        detail: action.payload,
      };

    case CLEAR_DETAIL:
      return {
        ...state,
        detail: [],
      };

    case FILTER_BY_TEMPERAMENT:
      let tempFiltered;
      if (action.payload === "all") {
        tempFiltered = state.allBreeds;
      } else {
        tempFiltered = state.allBreeds.filter((el) => {
          return el.temperaments?.includes(action.payload);
        });
      }
      return {
        ...state,
        breeds: tempFiltered,
      };

    case FILTER_BY_GROUPS:
      let groupsFiltered;
      if (action.payload === "all") {
        groupsFiltered = state.allBreeds;
      } else {
        groupsFiltered = state.allBreeds.filter((el) => {
          return el.groups?.includes(action.payload);
        });
      }
      return {
        ...state,
        breeds: groupsFiltered,
      };

    case POST_BREED:
      return {
        ...state,
      };

    case ORDER_BY_BREED:
      let byName = [...state.breeds];

      let sortName =
        action.payload === "asc"
          ? byName.sort(function (a, b) {
              return a.name.localeCompare(b.name);
            })
          : byName.sort(function (a, b) {
              return b.name.localeCompare(a.name);
            });

      return {
        ...state,
        breeds: sortName,
      };

    case ORDER_BY_WEIGHT:
      let arr = [...state.breeds];

      let sortWeight =
        action.payload === "minToMax"
          ? arr.sort(function (a, b) {
              return a.weight.split(/ - /)[0] - b.weight.split(/ - /)[0];
            })
          : arr.sort(function (a, b) {
              return b.weight.split(/ - /)[1] - a.weight.split(/ - /)[1];
            });

      return {
        ...state,
        breeds: sortWeight,
      };

    case "GET_CLOUDINARY_IMG":
      return {
        ...state,
        imgLink: action.payload,
      };

    default:
      return state;
  }
}
