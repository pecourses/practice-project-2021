import { combineReducers } from 'redux';
import authReducer from './../app/slices/authSlice';
import getUserReducer from './userReducer';
import dataForContestReducer from './../app/slices/dataForContestSlice';
import paymentPeducer from './../app/slices/paymentSlice';
import getContestsReducer from './getContestsReducer';
import storeContestReducer from './../app/slices/storeContestSlice';
import bundleReducer from './../app/slices/bundleSlice';
import getContestByIdReducer from './getContestByIdReducer';
import updateContestReducer from './updateContestReducer';
import chatReducer from './chatReducer';
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
