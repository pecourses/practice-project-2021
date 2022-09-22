import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateStoreAfterUpdateContest } from './contestByIdSlice';
import * as restController from '../../api/rest/restController';
import {
  pendingReducer,
  fulfilledReducer,
  rejectedReducer,
} from '../../utils/store';

const CONTEST_UPDATION_SLICE_NAME = 'contestUpdation';

export const updateContest = createAsyncThunk(
  CONTEST_UPDATION_SLICE_NAME,
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await restController.updateContest(payload);
      dispatch(updateStoreAfterUpdateContest(data));
    } catch ({ response: { data, status } }) {
      return rejectWithValue({ data, status });
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
  builder.addCase(updateContest.pending, pendingReducer);
  builder.addCase(updateContest.fulfilled, fulfilledReducer);
  builder.addCase(updateContest.rejected, rejectedReducer);
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
