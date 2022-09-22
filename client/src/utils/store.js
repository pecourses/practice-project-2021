export const pendingReducer = state => {
  state.isFetching = true;
  state.error = null;
};

export const fulfilledReducer = state => {
  state.isFetching = false;
};

export const rejectedReducer = (state, { payload }) => {
  state.isFetching = false;
  state.error = payload;
};
