import { createSlice } from '@reduxjs/toolkit';
import { isEqual, remove } from 'lodash';
import * as restController from '../../api/rest/restController';
import CONSTANTS from '../../constants';
import { decorateAsyncThunk, pendingReducer } from '../../utils/store';

const CHAT_SLICE_NAME = 'chat';

const initialState = {
  isFetching: true,
  addChatId: null,
  isShowCatalogCreation: false,
  currentCatalog: null,
  chatData: null,
  messages: [],
  error: null,
  isExpanded: false,
  interlocutor: [],
  messagesPreview: [],
  isShow: false,
  chatMode: CONSTANTS.NORMAL_PREVIEW_CHAT_MODE,
  catalogList: [],
  isRenameCatalog: false,
  isShowChatsInCatalog: false,
  catalogCreationMode: CONSTANTS.ADD_CHAT_TO_OLD_CATALOG,
};

export const getPreviewChat = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/getPreviewChat`,
  thunk: async () => {
    const { data } = await restController.getPreviewChat();
    console.log('data', data);
    return data;
  },
});

export const getDialogMessages = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/getDialogMessages`,
  thunk: async payload => {
    const { data } = await restController.getDialog(payload);
    return data;
  },
});

export const sendMessage = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/sendMessage`,
  thunk: async payload => {
    const { data } = await restController.newMessage(payload);
    return data;
  },
});

export const changeChatFavorite = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/changeChatFavorite`,
  thunk: async payload => {
    const { data } = await restController.changeChatFavorite(payload);
    return data;
  },
});

export const changeChatBlock = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/changeChatBlock`,
  thunk: async payload => {
    const { data } = await restController.changeChatBlock(payload);
    return data;
  },
});

export const getCatalogList = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/getCatalogList`,
  thunk: async payload => {
    const { data } = await restController.getCatalogList(payload);
    return data;
  },
});

export const addChatToCatalog = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/addChatToCatalog`,
  thunk: async payload => {
    const { data } = await restController.addChatToCatalog(payload);
    return data;
  },
});

export const createCatalog = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/createCatalog`,
  thunk: async payload => {
    const { data } = await restController.createCatalog(payload);
    return data;
  },
});

export const deleteCatalog = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/deleteCatalog`,
  thunk: async payload => {
    await restController.deleteCatalog(payload);
    return payload;
  },
});

export const removeChatFromCatalog = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/removeChatFromCatalog`,
  thunk: async payload => {
    const { data } = await restController.removeChatFromCatalog(payload);
    return data;
  },
});

export const changeCatalogName = decorateAsyncThunk({
  key: `${CHAT_SLICE_NAME}/changeCatalogName`,
  thunk: async payload => {
    const { data } = await restController.changeCatalogName(payload);
    return data;
  },
});

const reducers = {
  changeBlockStatusInStore: (state, { payload }) => {
    const { messagesPreview } = state;
    messagesPreview.forEach(preview => {
      if (isEqual(preview.participants, payload.participants))
        preview.blackList = payload.blackList;
    });
    state.chatData = payload;
    state.messagesPreview = messagesPreview;
  },

  addMessage: (state, { payload }) => {
    const { message, preview } = payload;
    const { messagesPreview } = state;
    let isNew = true;
    messagesPreview.forEach(preview => {
      if (isEqual(preview.participants, message.participants)) {
        preview.text = message.body;
        preview.sender = message.sender;
        preview.createAt = message.createdAt;
        isNew = false;
      }
    });
    if (isNew) {
      messagesPreview.push(preview);
    }
    state.messagesPreview = messagesPreview;
    state.messages = [...state.messages, payload.message];
  },

  backToDialogList: state => {
    state.isExpanded = false;
  },

  goToExpandedDialog: (state, { payload }) => {
    state.interlocutor = { ...state.interlocutor, ...payload.interlocutor };
    state.chatData = payload.conversationData;
    state.isShow = true;
    state.isExpanded = true;
    state.messages = [];
  },

  clearMessageList: state => {
    state.messages = [];
  },

  changeChatShow: state => {
    state.isShowCatalogCreation = false;
    state.isShow = !state.isShow;
  },

  setPreviewChatMode: (state, { payload }) => {
    state.chatMode = payload;
  },

  changeShowModeCatalog: (state, { payload }) => {
    state.currentCatalog = { ...state.currentCatalog, ...payload };
    state.isShowChatsInCatalog = !state.isShowChatsInCatalog;
    state.isRenameCatalog = false;
  },

  changeTypeOfChatAdding: (state, { payload }) => {
    state.catalogCreationMode = payload;
  },

  changeShowAddChatToCatalogMenu: (state, { payload }) => {
    state.addChatId = payload;
    state.isShowCatalogCreation = !state.isShowCatalogCreation;
  },

  changeRenameCatalogMode: state => {
    state.isRenameCatalog = !state.isRenameCatalog;
  },

  clearChatError: state => {
    state.error = null;
  },
};

const extraReducers = builder => {
  builder.addCase(getPreviewChat.fulfilled, (state, { payload }) => {
    state.messagesPreview = payload;
    state.error = null;
  });
  builder.addCase(getPreviewChat.rejected, (state, { payload }) => {
    state.error = payload;
    state.messagesPreview = [];
  });

  builder.addCase(getDialogMessages.fulfilled, (state, { payload }) => {
    state.messages = payload.messages;
    state.interlocutor = payload.interlocutor;
  });
  builder.addCase(getDialogMessages.rejected, (state, { payload }) => {
    state.messages = [];
    state.interlocutor = null;
    state.error = payload;
  });

  builder.addCase(sendMessage.fulfilled, (state, { payload }) => {
    const { messagesPreview } = state;
    let isNew = true;
    messagesPreview.forEach(preview => {
      if (isEqual(preview.participants, payload.message.participants)) {
        preview.text = payload.message.body;
        preview.sender = payload.message.sender;
        preview.createAt = payload.message.createdAt;
        isNew = false;
      }
    });
    if (isNew) {
      messagesPreview.push(payload.preview);
    }
    const chatData = {
      _id: payload.preview._id,
      participants: payload.preview.participants,
      favoriteList: payload.preview.favoriteList,
      blackList: payload.preview.blackList,
    };
    state.chatData = { ...state.chatData, ...chatData };
    state.messagesPreview = messagesPreview;
    state.messages = [...state.messages, payload.message];
  });
  builder.addCase(sendMessage.rejected, (state, { payload }) => {
    state.error = payload;
  });

  builder.addCase(changeChatFavorite.fulfilled, (state, { payload }) => {
    const { messagesPreview } = state;
    messagesPreview.forEach(preview => {
      if (isEqual(preview.participants, payload.participants))
        preview.favoriteList = payload.favoriteList;
    });
    state.chatData = payload;
    state.messagesPreview = messagesPreview;
  });
  builder.addCase(changeChatFavorite.rejected, (state, { payload }) => {
    state.error = payload;
  });

  builder.addCase(changeChatBlock.fulfilled, (state, { payload }) => {
    const { messagesPreview } = state;
    messagesPreview.forEach(preview => {
      if (isEqual(preview.participants, payload.participants))
        preview.blackList = payload.blackList;
    });
    state.chatData = payload;
    state.messagesPreview = messagesPreview;
  });
  builder.addCase(changeChatBlock.rejected, (state, { payload }) => {
    state.error = payload;
  });

  builder.addCase(getCatalogList.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.catalogList = [...payload];
  });
  builder.addCase(getCatalogList.rejected, pendingReducer);

  builder.addCase(addChatToCatalog.fulfilled, (state, { payload }) => {
    const { catalogList } = state;
    for (let i = 0; i < catalogList.length; i++) {
      if (catalogList[i]._id === payload._id) {
        catalogList[i].chats = payload.chats;
        break;
      }
    }
    state.isShowCatalogCreation = false;
    state.catalogList = [...catalogList];
  });
  builder.addCase(addChatToCatalog.rejected, (state, { payload }) => {
    state.error = payload;
    state.isShowCatalogCreation = false;
  });

  builder.addCase(createCatalog.fulfilled, (state, { payload }) => {
    state.catalogList = [...state.catalogList, payload];
    state.isShowCatalogCreation = false;
  });
  builder.addCase(createCatalog.rejected, (state, { payload }) => {
    state.isShowCatalogCreation = false;
    state.error = payload;
  });

  builder.addCase(deleteCatalog.fulfilled, (state, { payload }) => {
    const { catalogList } = state;
    const newCatalogList = remove(
      catalogList,
      catalog => payload.catalogId !== catalog._id
    );
    state.catalogList = [...newCatalogList];
  });
  builder.addCase(deleteCatalog.rejected, (state, { payload }) => {
    state.error = payload;
  });

  builder.addCase(removeChatFromCatalog.fulfilled, (state, { payload }) => {
    const { catalogList } = state;
    for (let i = 0; i < catalogList.length; i++) {
      if (catalogList[i]._id === payload._id) {
        catalogList[i].chats = payload.chats;
        break;
      }
    }
    state.currentCatalog = payload;
    state.catalogList = [...catalogList];
  });
  builder.addCase(removeChatFromCatalog.rejected, (state, { payload }) => {
    state.error = payload;
  });

  builder.addCase(changeCatalogName.fulfilled, (state, { payload }) => {
    const { catalogList } = state;
    for (let i = 0; i < catalogList.length; i++) {
      if (catalogList[i]._id === payload._id) {
        catalogList[i].catalogName = payload.catalogName;
        break;
      }
    }
    state.catalogList = [...catalogList];
    state.currentCatalog = payload;
    state.isRenameCatalog = false;
  });
  builder.addCase(changeCatalogName.rejected, state => {
    state.isRenameCatalog = false;
  });
};

const chatSlice = createSlice({
  name: CHAT_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = chatSlice;

export const {
  changeBlockStatusInStore,
  addMessage,
  backToDialogList,
  goToExpandedDialog,
  clearMessageList,
  changeChatShow,
  setPreviewChatMode,
  changeShowModeCatalog,
  changeTypeOfChatAdding,
  changeShowAddChatToCatalogMenu,
  changeRenameCatalogMode,
  clearChatError,
} = actions;

export default reducer;
