import { takeLatest, takeLeading, takeEvery } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import { downloadContestFileSaga } from './contestsSagas';
import {
  previewSaga,
  getDialog,
  sendMessage,
  changeChatFavorite,
  changeChatBlock,
  getCatalogListSaga,
  addChatToCatalog,
  createCatalog,
  deleteCatalog,
  removeChatFromCatalogSaga,
  changeCatalogName,
} from './chatSagas';

function * rootSaga () {
  yield takeLatest(
    ACTION.DOWNLOAD_CONTEST_FILE_ACTION,
    downloadContestFileSaga
  );
  yield takeLatest(ACTION.GET_PREVIEW_CHAT_ASYNC, previewSaga);
  yield takeLatest(ACTION.GET_DIALOG_MESSAGES_ASYNC, getDialog);
  yield takeLatest(ACTION.SEND_MESSAGE_ACTION, sendMessage);
  yield takeLatest(ACTION.SET_CHAT_FAVORITE_FLAG, changeChatFavorite);
  yield takeLatest(ACTION.SET_CHAT_BLOCK_FLAG, changeChatBlock);
  yield takeLatest(ACTION.GET_CATALOG_LIST_ASYNC, getCatalogListSaga);
  yield takeLatest(ACTION.ADD_CHAT_TO_CATALOG_ASYNC, addChatToCatalog);
  yield takeLatest(ACTION.CREATE_CATALOG_REQUEST, createCatalog);
  yield takeLatest(ACTION.DELETE_CATALOG_REQUEST, deleteCatalog);
  yield takeLatest(
    ACTION.REMOVE_CHAT_FROM_CATALOG_REQUEST,
    removeChatFromCatalogSaga
  );
  yield takeLatest(ACTION.CHANGE_CATALOG_NAME_REQUEST, changeCatalogName);
}

export default rootSaga;
