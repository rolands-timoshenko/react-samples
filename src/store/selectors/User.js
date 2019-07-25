import { createSelector } from "reselect";

/**
 * Select user full name
 */
export const selectDisplayName = createSelector(
  state => state.user.profile,
  profile => profile && profile.displayName
);

export const selectProfileAvatar = createSelector(
  state => state.user.profile,
  profile => profile && profile.picture
);

export const selectUserProfileProcessing = createSelector(
  state => state.user,
  user => user.processing
);

/**
 * Select if user is logged in
 */
export const selectLoggedIn = createSelector(
  state => state.user.profile,
  profile => !!profile
);

/**
 * Selects logged in user profile
 */
export const selectLoggedInProfile = createSelector(
  state => state.user.profile,
  profile => profile
);
