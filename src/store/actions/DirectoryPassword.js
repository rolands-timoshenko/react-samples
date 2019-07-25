import DirectoryPasswordApi from "../../api/DirectoryPasswordApi";
import { ACTIONS as PROCESSING_ACTIONS } from "../shared/reducers/processing";

export const ACTIONS = {
  ADD_ITEM: `add_item_directory_password`,
  SET_PROCESSING_LIST: `${PROCESSING_ACTIONS.SET_PROCESSING}_directory_password`
};

const api = new DirectoryPasswordApi();

export const addDirectoryPasswordAsync = (pId, dId, uId) => {
  return async dispatch => {
    try {
      dispatch({ type: ACTIONS.SET_PROCESSING_LIST, payload: true });
      const data = await api.addDirectoryPasswordAsync(pId, dId, uId);
      dispatch({ type: ACTIONS.ADD_ITEM, payload: data });
      return data;
    } catch (e) {
      console.error(e);
    } finally {
      dispatch({ type: ACTIONS.SET_PROCESSING_LIST, payload: false });
    }
  };
};
