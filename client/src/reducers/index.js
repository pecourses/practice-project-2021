import { combineReducers } from 'redux';
import authReducer from './../app/slices/authSlice';
import getUserReducer from './../app/slices/userSlice';
import dataForContestReducer from './../app/slices/dataForContestSlice';
import paymentPeducer from './../app/slices/paymentSlice';
import getContestsReducer from './../app/slices/getContestsSlice';
import storeContestReducer from './../app/slices/storeContestSlice';
import bundleReducer from './../app/slices/bundleSlice';
import getContestByIdReducer from './../app/slices/getContestByIdSlice';
import updateContestReducer from './../app/slices/updateContestSlice';
import chatReducer from './../app/slices/chatSlice';
import userProfileReducer from './../app/slices/userProfileSlice';

const appReducer = combineReducers({
  userStore: getUserReducer,
  auth: authReducer,
  dataForContest: dataForContestReducer,
  payment: paymentPeducer,
  contestByIdStore: getContestByIdReducer,
  contestsList: getContestsReducer,
  contestStore: storeContestReducer,
  bundleStore: bundleReducer,
  updateContestStore: updateContestReducer,
  chatStore: chatReducer,
  userProfile: userProfileReducer,
});

export default appReducer;
