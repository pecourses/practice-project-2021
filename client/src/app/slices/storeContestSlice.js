import { createSlice } from '@reduxjs/toolkit';

const STORE_CONTEST_SLICE_NAME = 'storeContest';

const initialState = {
  contests: {},
};

const reducers = {
  saveContestToStore: (state, { payload: { type, info } }) => {
    state.contests = {
      ...state.contests,
      ...{ [type]: info },
    };
  },
  clearContestStore: () => initialState,
};

const storeContestSlice = createSlice({
  name: STORE_CONTEST_SLICE_NAME,
  initialState,
  reducers,
});

const { actions, reducer } = storeContestSlice;

export const { saveContestToStore, clearContestStore } = actions;

export default reducer;
