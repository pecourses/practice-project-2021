import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import getUserReducer from './slices/userSlice';
import dataForContestReducer from './slices/dataForContestSlice';
import paymentReducer from './slices/paymentSlice';
import getContestsReducer from './slices/contestsSlice';
import storeContestReducer from './slices/storeContestSlice';
import bundleReducer from './slices/bundleSlice';
import getContestByIdReducer from './slices/getContestByIdSlice';
import updateContestReducer from './slices/contestUpdationSlice';
import chatReducer from './slices/chatSlice';
import userProfileReducer from './slices/userProfileSlice';

const appReducer = combineReducers({
  userStore: getUserReducer,
  auth: authReducer,
  dataForContest: dataForContestReducer,
  payment: paymentReducer,
  contestByIdStore: getContestByIdReducer,
  contestsList: getContestsReducer,
  contestStore: storeContestReducer,
  bundleStore: bundleReducer,
  updateContestStore: updateContestReducer,
  chatStore: chatReducer,
  userProfile: userProfileReducer,
});

export default appReducer;
