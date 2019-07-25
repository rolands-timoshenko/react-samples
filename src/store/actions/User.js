import TurbotApi from "../../api/TurbotApi";

export const ACTIONS = {
  SET_PROFILE: "set_profile",
  UNSET_PROFILE: "unset_profile",
  LOAD_PROFILE: "load_profile",
  LOAD_PROFILE_PROCESSING: "load_profile_processing"
};

/**
 * Load logged in user profile async
 */
export const loadProfileAsync = () => {
  return async dispatch => {
    try {
      dispatch(setProcessing(true));
      const api = new TurbotApi();
      const profile = await api.loadUserProfile();
      dispatch(setProfile(profile));
    } catch (e) {
      console.error(e);
    } finally {
      dispatch(setProcessing(false));
    }
  };
};

/**
 * @param {boolean} inProgress
 */
const setProcessing = inProgress => {
  return { type: ACTIONS.LOAD_PROFILE_PROCESSING, payload: inProgress };
};

/**
 * @param {Object} profile
 */
const setProfile = profile => {
  return { type: ACTIONS.SET_PROFILE, payload: profile };
};
