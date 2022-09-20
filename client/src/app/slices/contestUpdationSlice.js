import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateStoreAfterUpdateContest } from './contestByIdSlice';
import * as restController from '../../api/rest/restController';

const CONTEST_UPDATION_SLICE_NAME = 'contestUpdation';

export const updateContest = createAsyncThunk(
  CONTEST_UPDATION_SLICE_NAME,
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await restController.updateContest(payload);
      dispatch(updateStoreAfterUpdateContest(data));
    } catch (err) {
      return rejectWithValue({
        data: err.response.data,
        status: err.response.status,
      });
    }
  }
);

const initialState = {
  isFetching: true,
  error: null,
};

const reducers = {
  clearContestUpdationStore: () => initialState,
};

const extraReducers = builder => {
  builder.addCase(updateContest.pending, state => {
    state.isFetching = true;
    state.error = null;
  });
  builder.addCase(updateContest.fulfilled, state => {
    state.isFetching = false;
  });
  builder.addCase(updateContest.rejected, (state, { payload }) => {
    state.isFetching = false;
    state.error = payload;
  });
};

const contestUpdationSlice = createSlice({
  name: CONTEST_UPDATION_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = contestUpdationSlice;

export const { clearContestUpdationStore } = actions;

export default reducer;
