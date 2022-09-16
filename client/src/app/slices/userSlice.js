import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as restController from './../../api/rest/restController';
import { controller } from '../../api/ws/socketController';
import { changeEditModeOnUserProfile } from './userProfileSlice';
import CONSTANTS from './../../constants';

const { REDIRECT_TO_HOME } = CONSTANTS.GET_USER_MODE;

const USER_SLICE_NAME = 'user';

const initialState = {
  isFetching: true,
  error: null,
  data: null,
};

export const getUser = createAsyncThunk(
  `${USER_SLICE_NAME}/getUser`,
  async ({ getUserMode, replace }, { rejectWithValue }) => {
    try {
      const { data } = await restController.getUser();

      controller.subscribe(data.id);
      if (getUserMode === REDIRECT_TO_HOME) {
        replace('/');
      }

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  `${USER_SLICE_NAME}/updateUser`,
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await restController.updateUser(payload);
      dispatch(changeEditModeOnUserProfile(false));
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const reducers = {
  clearUserStore: state => {
    state.error = null;
    state.data = null;
  },
  clearUserError: state => {
    state.error = null;
  },
};

const extraReducers = builder => {
  builder.addCase(getUser.pending, state => {
    state.isFetching = true;
    state.error = null;
    state.data = null;
  });
  builder.addCase(getUser.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.data = payload;
  });
  builder.addCase(getUser.rejected, (state, { payload }) => {
    state.isFetching = false;
    state.error = payload;
  });
  builder.addCase(updateUser.fulfilled, (state, { payload }) => {
    state.data = { ...state.data, ...payload };
    state.error = null;
  });
  builder.addCase(updateUser.rejected, (state, { payload }) => {
    state.error = payload;
  });
};

const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = userSlice;

export const { clearUserStore, clearUserError } = actions;

export default reducer;
