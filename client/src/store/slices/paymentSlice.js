import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as restController from '../../api/rest/restController';
import { clearContestStore } from './contestSavingSlice';
import { changeProfileViewMode } from './userProfileSlice';
import { updateUser } from './userSlice';
import CONSTANTS from '../../constants';
import { pendingReducer, rejectedReducer } from '../../utils/store';

const PAYMENT_SLICE_NAME = 'payment';

export const pay = createAsyncThunk(
  `${PAYMENT_SLICE_NAME}/pay`,
  async ({ data, history }, { rejectWithValue, dispatch }) => {
    try {
      await restController.payMent(data);
      history.replace('dashboard');
      dispatch(clearContestStore());
    } catch ({ response: { data, status } }) {
      return rejectWithValue({ data, status });
    }
  }
);

export const cashOut = createAsyncThunk(
  `${PAYMENT_SLICE_NAME}/cashOut`,
  async (payload, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await restController.cashOut(payload);
      dispatch(updateUser.fulfilled(data));
      dispatch(changeProfileViewMode(CONSTANTS.USER_INFO_MODE));
    } catch ({ response: { data, status } }) {
      return rejectWithValue({ data, status });
    }
  }
);

const initialState = {
  isFetching: false,
  error: null,
  focusOnElement: 'number',
};

const reducers = {
  changeFocusOnCard: (state, { payload }) => {
    state.focusOnElement = payload;
  },
  clearPaymentStore: () => initialState,
};

const extraReducers = builder => {
  builder.addCase(pay.pending, pendingReducer);
  builder.addCase(pay.fulfilled, () => initialState);
  builder.addCase(pay.rejected, rejectedReducer);

  builder.addCase(cashOut.pending, pendingReducer);
  builder.addCase(cashOut.fulfilled, () => initialState);
  builder.addCase(cashOut.rejected, rejectedReducer);
};

const paymentSlice = createSlice({
  name: PAYMENT_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = paymentSlice;

export const { changeFocusOnCard, clearPaymentStore } = actions;

export default reducer;
