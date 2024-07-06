import {
  END_LOADING,
  FETCH_ALL_SMMRIES,
  START_LOADING,
} from "@/constants/actions";
import * as api from "../api";
import toast from "react-hot-toast";

export const saveSmmry = (newSmmry) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    await api.saveSmmry(newSmmry);
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
  }
};

export const getAllSmmries =
  ({ uid }) =>
  async (dispatch) => {
    try {
      dispatch({ type: START_LOADING });
      const { data } = await api.fetchAllSmmries(uid);
      dispatch({ type: FETCH_ALL_SMMRIES, payload: data }); //sends to reducer
      dispatch({ type: END_LOADING });
    } catch (err) {
      toast.error("Failed to fetch history");
      console.log(err);
    }
  };
