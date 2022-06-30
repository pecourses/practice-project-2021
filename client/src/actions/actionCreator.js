import ACTION from './actionTypes';

export const createCatalog = data => ({
  type: ACTION.CREATE_CATALOG_REQUEST,
  data,
});

export const getPreviewChat = () => ({
  type: ACTION.GET_PREVIEW_CHAT_ASYNC,
});

export const backToDialogList = () => ({
  type: ACTION.BACK_TO_DIALOG_LIST,
});

export const goToExpandedDialog = data => ({
  type: ACTION.GO_TO_EXPANDED_DIALOG,
  data,
});

export const getDialogMessages = data => ({
  type: ACTION.GET_DIALOG_MESSAGES_ASYNC,
  data,
});

export const sendMessageAction = data => ({
  type: ACTION.SEND_MESSAGE_ACTION,
  data,
});

export const addMessage = data => ({
  type: ACTION.SEND_MESSAGE,
  data,
});

export const clearMessageList = () => ({
  type: ACTION.CLEAR_MESSAGE_LIST,
});

export const changeChatShow = () => ({
  type: ACTION.CHANGE_CHAT_SHOW,
});

export const setPreviewChatMode = mode => ({
  type: ACTION.SET_CHAT_PREVIEW_MODE,
  mode,
});

export const changeChatFavorite = data => ({
  type: ACTION.SET_CHAT_FAVORITE_FLAG,
  data,
});

export const changeChatBlock = data => ({
  type: ACTION.SET_CHAT_BLOCK_FLAG,
  data,
});

export const changeBlockStatusInStore = data => ({
  type: ACTION.CHANGE_CHAT_BLOCK,
  data,
});

export const getCatalogList = data => ({
  type: ACTION.GET_CATALOG_LIST_ASYNC,
  data,
});

export const changeShowModeCatalog = data => ({
  type: ACTION.CHANGE_SHOW_MODE_CATALOG,
  data,
});

export const changeTypeOfChatAdding = data => ({
  type: ACTION.CHANGE_TYPE_ADDING_CHAT_IN_CATALOG,
  data,
});

export const changeShowAddChatToCatalogMenu = data => ({
  type: ACTION.CHANGE_SHOW_ADD_CHAT_TO_CATALOG,
  data,
});

export const addChatToCatalog = data => ({
  type: ACTION.ADD_CHAT_TO_CATALOG_ASYNC,
  data,
});

export const deleteCatalog = data => ({
  type: ACTION.DELETE_CATALOG_REQUEST,
  data,
});

export const removeChatFromCatalog = data => ({
  type: ACTION.REMOVE_CHAT_FROM_CATALOG_REQUEST,
  data,
});

export const changeRenameCatalogMode = () => ({
  type: ACTION.CHANGE_RENAME_CATALOG_MODE,
});

export const changeCatalogName = data => ({
  type: ACTION.CHANGE_CATALOG_NAME_REQUEST,
  data,
});

export const clearChatError = () => ({
  type: ACTION.CLEAR_CHAT_ERROR,
});
