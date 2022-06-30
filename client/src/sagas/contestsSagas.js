import { put } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as restController from '../api/rest/restController';

export function * downloadContestFileSaga (action) {
  yield put({ type: ACTION.DOWNLOAD_CONTEST_FILE_REQUEST });
  try {
    const { data } = yield restController.downloadContestFile(action.data);
    yield put({ type: ACTION.DOWNLOAD_CONTEST_FILE_SUCCESS, data });
  } catch (e) {
    yield put({ type: ACTION.DOWNLOAD_CONTEST_FILE_ERROR, error: e.response });
  }
}
