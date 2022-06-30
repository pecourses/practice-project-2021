import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateStoreAfterUpdateContest } from './getContestByIdSlice';
const restController = require('./../../api/rest/restController');

const UPDATE_CONTEST_SLICE = 'updateContest';

export const updateContest = createAsyncThunk(
  UPDATE_CONTEST_SLICE,
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await restController.updateContest(payload);
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      dispatch(updateStoreAfterUpdateContest(data));
    } catch (err) {
      rejectWithValue(err.response.data);
    }
  }
);

const initialState = {
  isFetching: true,
  error: null,
  data: null,
};

const reducers = {
  clearUpdateContestStore: () => initialState,
};

const extraReducers = builder => {
  builder.addCase(updateContest.pending, state => {
    state.isFetching = true;
    state.error = null;
    state.data = null;
  });
  // ! не используется
  builder.addCase(updateContest.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    // state.error = null;
    state.data = payload;
  });
  builder.addCase(updateContest.rejected, (state, { payload }) => {
    state.isFetching = false;
    state.error = payload;
    // state.data = null;
  });
};

const updateContestSlice = createSlice({
  name: UPDATE_CONTEST_SLICE,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = updateContestSlice;

export const { clearUpdateContestStore } = actions;

export default reducer;
