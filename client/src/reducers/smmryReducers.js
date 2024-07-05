//reducers -> controllers
//function that accepts the state and the action
//then based on the action type do some logic
//state cannot be empty -> therefore, empty arr

import {
  END_LOADING,
  FETCH_ALL_SMMRIES,
  SAVE_SMMRY,
  START_LOADING,
} from "@/constants/actions";

const initialState = {
  smmries: [],
  isLoading: false,
};

const smmry = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case START_LOADING:
      return { ...state, isLoading: true };

    case END_LOADING:
      return { ...state, isLoading: false };

    case SAVE_SMMRY:
      return { ...state, smmries: [payload, ...state.smmries] };

    case FETCH_ALL_SMMRIES:
      return {
        ...state,
        smmries: payload,
      };

    default:
      return state;
  }
};

export default smmry;
