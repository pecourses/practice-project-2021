import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as restController from './../../api/rest/restController';
import CONSTANTS from '../../constants';

const GET_CONTESTS_SLICE_NAME = 'getContests';

export const getContests = createAsyncThunk(
  GET_CONTESTS_SLICE_NAME,
  async ({ requestData, role }, { rejectWithValue }) => {
    try {
      const { data } =
        role === CONSTANTS.CUSTOMER
          ? await restController.getCustomersContests(requestData)
          : await restController.getActiveContests(requestData);
      return data;
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
  contests: [],
  customerFilter: CONSTANTS.CONTEST_STATUS_ACTIVE,
  creatorFilter: {
    typeIndex: 1,
    contestId: '',
    industry: '',
    awardSort: 'asc',
    ownEntries: false,
  },
  haveMore: true,
};

const reducers = {
  clearContestsList: state => {
    state.error = null;
    state.contests = [];
  },
  setNewCustomerFilter: (state, { payload }) => ({
    ...initialState,
    isFetching: false,
    customerFilter: payload,
  }),
  setNewCreatorFilter: (state, { payload }) => ({
    ...initialState,
    isFetching: false,
    creatorFilter: { ...state.creatorFilter, ...payload },
  }),
};

const extraReducers = builder => {
  builder.addCase(getContests.pending, state => {
    state.isFetching = true;
    state.error = null;
  });
  builder.addCase(getContests.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.contests = [...state.contests, ...payload.contests];
    state.haveMore = payload.haveMore;
  });
  builder.addCase(getContests.rejected, (state, { payload }) => {
    state.isFetching = false;
    state.error = payload;
    state.contests = [];
  });
};

const getContestsSlice = createSlice({
  name: GET_CONTESTS_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = getContestsSlice;

export const {
  clearContestsList,
  setNewCustomerFilter,
  setNewCreatorFilter,
} = actions;

export default reducer;
