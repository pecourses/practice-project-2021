import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as restController from './../../api/rest/restController';
import { clearContestStore } from './storeContestSlice';

const PAYMENT_SLICE_NAME = 'payment';

export const payRequest = createAsyncThunk(
  `${PAYMENT_SLICE_NAME}/payRequest`,
  async ({ data, history }, { rejectWithValue, dispatch }) => {
    try {
      await restController.payMent(data);
      history.replace('dashboard');
      dispatch(clearContestStore());
      dispatch(clearPaymentStore());
    } catch (err) {
      return rejectWithValue(err.response.data);
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
  builder.addCase(payRequest.pending, state => {
    state.isFetching = true;
    state.error = null;
  });
  builder.addCase(payRequest.rejected, (state, { payload }) => {
    state.isFetching = false;
    state.error = payload;
  });
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
