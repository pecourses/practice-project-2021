import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CONSTANTS from '../../constants';
import * as restController from './../../api/rest/restController';

const AUTH_SLICE_NAME = 'auth';

export const checkAuth = createAsyncThunk(
  `${AUTH_SLICE_NAME}/checkAuth`,
  async ({ data: authInfo, history, authMode }, { rejectWithValue }) => {
    try {
      authMode === CONSTANTS.AUTH_MODE.LOGIN
        ? await restController.loginRequest(authInfo)
        : await restController.registerRequest(authInfo);
      history.replace('/');
    } catch (err) {
      return rejectWithValue({
        data: err.response.data,
        status: err.response.status,
      });
    }
  }
);

const initialState = {
  isFetching: false,
  error: null,
};

const reducers = {
  clearAuthError: state => {
    state.error = null;
  },
  clearAuth: () => initialState,
};

const extraReducers = builder => {
  builder.addCase(checkAuth.pending, state => {
    state.isFetching = true;
    state.error = null;
  });
  builder.addCase(checkAuth.fulfilled, state => {
    state.isFetching = false;
  });
  builder.addCase(checkAuth.rejected, (state, { payload }) => {
    state.isFetching = false;
    state.error = payload;
  });
};

const authSlice = createSlice({
  name: `${AUTH_SLICE_NAME}`,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = authSlice;

export const { clearAuthError, clearAuth } = actions;

export default reducer;
