import { combineReducers } from 'redux';
import authReducer from './../app/slices/authSlice';
import getUserReducer from './userReducer';
import dataForContestReducer from './../app/slices/dataForContestSlice';
import payReducer from './payReducer';
import getContestsReducer from './getContestsReducer';
import storeContestReducer from './storeContestReducer';
import bundleReducer from './../app/slices/bundleSlice';
import getContestByIdReducer from './getContestByIdReducer';
import updateContestReducer from './updateContestReducer';
import chatReducer from './chatReducer';
import userProfileReducer from './userProfileReducer';

const appReducer = combineReducers({
  userStore: getUserReducer,
  auth: authReducer,
  dataForContest: dataForContestReducer,
  payment: payReducer,
  contestByIdStore: getContestByIdReducer,
  contestsList: getContestsReducer,
  contestStore: storeContestReducer,
  bundleStore: bundleReducer,
  updateContestStore: updateContestReducer,
  chatStore: chatReducer,
  userProfile: userProfileReducer,
});

export default appReducer;
