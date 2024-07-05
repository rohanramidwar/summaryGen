import {
  END_LOADING,
  FETCH_ALL_SMMRIES,
  SAVE_SMMRY,
  START_LOADING,
} from "@/constants/actions";
import * as api from "../api";
import toast from "react-hot-toast";

export const saveSmmry = (newSmmry) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.saveSmmry(newSmmry);
    dispatch({ type: SAVE_SMMRY, payload: data });
    dispatch({ type: END_LOADING });
    toast.success("Successfully summarised!");
  } catch (err) {
    console.log(err);
  }
};

export const getAllSmmries = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchAllSmmries();
    dispatch({ type: FETCH_ALL_SMMRIES, payload: data }); //sends to reducer
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
  }
};
