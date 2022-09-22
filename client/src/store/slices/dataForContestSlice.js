import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as restController from '../../api/rest/restController';
import { rejectedReducer } from '../../utils/store';

const DATA_FOR_CONTEST_SLICE_NAME = 'dataForContest';

export const getDataForContest = createAsyncThunk(
  `${DATA_FOR_CONTEST_SLICE_NAME}/getDataForContest`,
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await restController.dataForContest(payload);
      return data;
    } catch ({ response: { data, status } }) {
      return rejectWithValue({ data, status });
    }
  }
);

const initialState = {
  isFetching: true,
  data: null,
  error: null,
};

const extraReducers = builder => {
  builder.addCase(getDataForContest.pending, state => {
    state.isFetching = true;
    state.data = null;
    state.error = null;
  });
  builder.addCase(getDataForContest.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.data = payload;
  });
  builder.addCase(getDataForContest.rejected, rejectedReducer);
};

const dataForContestSlice = createSlice({
  name: `${DATA_FOR_CONTEST_SLICE_NAME}`,
  initialState,
  reducers: {},
  extraReducers,
});

const { reducer } = dataForContestSlice;

export default reducer;
