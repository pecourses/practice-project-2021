import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import CONSTANTS from '../../constants';
import * as restController from '../../api/rest/restController';

const CONTEST_BY_ID_SLICE_NAME = 'getContestById';

export const getContestById = createAsyncThunk(
  `${CONTEST_BY_ID_SLICE_NAME}/getContest`,
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await restController.getContestById(payload);
      const { Offers } = data;
      delete data.Offers;
      return { contestData: data, offers: Offers };
    } catch ({ response: { data, status } }) {
      return rejectWithValue({ data, status });
    }
  }
);

export const addOffer = createAsyncThunk(
  `${CONTEST_BY_ID_SLICE_NAME}/addOffer`,
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await restController.setNewOffer(payload);
      return data;
    } catch ({ response: { data, status } }) {
      return rejectWithValue({ data, status });
    }
  }
);

export const setOfferStatus = createAsyncThunk(
  `${CONTEST_BY_ID_SLICE_NAME}/setOfferStatus`,
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await restController.setOfferStatus(payload);
      return data;
    } catch ({ response: { data, status } }) {
      return rejectWithValue({ data, status });
    }
  }
);

export const changeMark = createAsyncThunk(
  `${CONTEST_BY_ID_SLICE_NAME}/changeMark`,
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await restController.changeMark(payload);
      return { data, offerId: payload.offerId, mark: payload.mark };
    } catch ({ response: { data, status } }) {
      return rejectWithValue({ data, status });
    }
  }
);

export const downloadContestFile = createAsyncThunk(
  `${CONTEST_BY_ID_SLICE_NAME}/downloadContestFile`,
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await restController.downloadContestFile(payload);
      return data;
    } catch ({ response: { data, status } }) {
      return rejectWithValue({ data, status });
    }
  }
);

const initialState = {
  isFetching: true,
  contestData: null,
  error: null,
  offers: [],
  addOfferError: null,
  setOfferStatusError: null,
  changeMarkError: null,
  isEditContest: false,
  isBrief: true,
  isShowOnFull: false,
  isShowModal: false,
  imagePath: null,
};

const reducers = {
  updateStoreAfterUpdateContest: (state, { payload }) => {
    state.error = null;
    state.isEditContest = false;
    state.contestData = { ...state.contestData, ...payload };
  },
  changeContestViewMode: (state, { payload }) => {
    state.isEditContest = false;
    state.isBrief = payload;
  },
  changeEditContest: (state, { payload }) => {
    state.isEditContest = payload;
  },
  clearAddOfferError: state => {
    state.addOfferError = null;
  },
  clearSetOfferStatusError: state => {
    state.setOfferStatusError = null;
  },
  clearChangeMarkError: state => {
    state.changeMarkError = null;
  },
  changeShowImage: (state, { payload: { isShowOnFull, imagePath } }) => {
    state.isShowOnFull = isShowOnFull;
    state.imagePath = imagePath;
  },
};

const extraReducers = builder => {
  builder.addCase(getContestById.pending, state => {
    state.isFetching = true;
    state.contestData = null;
    state.error = null;
    state.offers = [];
  });
  builder.addCase(
    getContestById.fulfilled,
    (state, { payload: { contestData, offers } }) => {
      state.isFetching = false;
      state.contestData = contestData;
      state.error = null;
      state.offers = offers;
    }
  );
  builder.addCase(getContestById.rejected, (state, { payload }) => {
    state.isFetching = false;
    state.error = payload;
  });

  builder.addCase(addOffer.fulfilled, (state, { payload }) => {
    state.offers.unshift(payload);
    state.error = null;
  });
  builder.addCase(addOffer.rejected, (state, { payload }) => {
    state.addOfferError = payload;
  });

  builder.addCase(setOfferStatus.fulfilled, (state, { payload }) => {
    state.offers.forEach(offer => {
      if (payload.status === CONSTANTS.OFFER_STATUS_WON) {
        offer.status =
          payload.id === offer.id
            ? CONSTANTS.OFFER_STATUS_WON
            : CONSTANTS.OFFER_STATUS_REJECTED;
      } else if (payload.id === offer.id) {
        offer.status = CONSTANTS.OFFER_STATUS_REJECTED;
      }
    });
    state.error = null;
  });
  builder.addCase(setOfferStatus.rejected, (state, { payload }) => {
    state.setOfferStatusError = payload;
  });

  builder.addCase(
    changeMark.fulfilled,
    (state, { payload: { data, offerId, mark } }) => {
      state.offers.forEach(offer => {
        if (offer.User.id === data.userId) {
          offer.User.rating = data.rating;
        }
        if (offer.id === offerId) {
          offer.mark = mark;
        }
      });
      state.error = null;
    }
  );
  builder.addCase(changeMark.rejected, (state, { payload }) => {
    state.changeMarkError = payload;
  });
};

const contestByIdSlice = createSlice({
  name: CONTEST_BY_ID_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = contestByIdSlice;

export const {
  updateStoreAfterUpdateContest,
  changeContestViewMode,
  changeEditContest,
  clearAddOfferError,
  clearSetOfferStatusError,
  clearChangeMarkError,
  changeShowImage,
} = actions;

export default reducer;
