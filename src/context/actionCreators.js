import appActions from "./actions";

export const authFunction = (payload) => ({
  type: appActions.auth,
  payload,
});

export const favoritesFunction = (payload) => ({
  type: appActions.favorites,
  payload,
});

export const recipesFunction = (payload) => ({
  type: appActions.recipes,
  payload,
});

export const signInAction = (payload) => ({
  type: appActions.signIn,
  payload,
});
