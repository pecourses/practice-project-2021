import { takeLatest } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import { downloadContestFileSaga } from './contestsSagas';

function * rootSaga () {
  yield takeLatest(
    ACTION.DOWNLOAD_CONTEST_FILE_ACTION,
    downloadContestFileSaga
  );
}

export default rootSaga;
