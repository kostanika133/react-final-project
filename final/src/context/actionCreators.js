import appActions from "./actions";

export const signInAction = (payload) => {
  return {
    type: appActions.signIn,
    payload,
  };
};

export const authFunction = (payload) => {
  return { type: appActions.auth, payload };
};
