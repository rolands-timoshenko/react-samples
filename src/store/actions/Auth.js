import TurbotApi from "../../api/TurbotApi";
import { ACTIONS as USER_ACTIONS } from "./User";
import { getUserIdStorageKey } from "../../config/storage";

export const ACTIONS = {
  AUTH_PROCESSING_DIRECTORIES: "auth_processing_directories",
  AUTH_ADD_DIRECTORIES: "auth_add_directories",
  AUTH_SET_TOKEN: "auth_set_token",
  AUTH_PROCESSING_LOGIN: "auth_processing_login",
  AUTH_SET_REDIRECT_ROUTE: "auth_redirect_to"
};

export const loadDirectoriesAsync = () => {
  return async dispatch => {
    try {
      dispatch({ type: ACTIONS.AUTH_PROCESSING_DIRECTORIES, processing: true });
      const api = new TurbotApi();
      const directories = await api.loadDirectories();
      dispatch({
        type: ACTIONS.AUTH_ADD_DIRECTORIES,
        directories: directories || []
      });
    } catch (e) {
      console.error(e);
      dispatch({ type: ACTIONS.AUTH_ADD_DIRECTORIES, directories: [] });
    } finally {
      dispatch({
        type: ACTIONS.AUTH_PROCESSING_DIRECTORIES,
        processing: false
      });
    }
  };
};

/**
 *
 * @param {string} username
 * @param {string} password
 * @param {object} directory
 * @param {function} onError
 */
export const processLoginAsync = (username, password, directory, onError) => {
  return async dispatch => {
    try {
      const api = new TurbotApi();
      const data = await api.localDirectoryLoginAsync(
        username,
        password,
        directory.turbot.id
      );

      if (data.profile) {
        dispatch({
          type: USER_ACTIONS.SET_PROFILE,
          payload: data.profile
        });
      }
      // Set login details into local storage
      localStorage.setItem(getUserIdStorageKey(directory.turbot.id), username);
    } catch (error) {
      onError(error);
    }
  };
};

export const refreshTokenAsync = () => {
  return async () => {
    try {
      const api = new TurbotApi();
      await api.refreshTokenAsync();
    } catch (e) {
      // Report error
      console.error(e);
    }
  };
};

export const logoutAsync = cb => {
  return async dispatch => {
    try {
      const api = new TurbotApi();
      await api.logoutAsync();
      dispatch({
        type: USER_ACTIONS.UNSET_PROFILE
      });
      cb && cb();
    } catch (e) {
      // Report error
      console.error(e);
    }
  };
};
