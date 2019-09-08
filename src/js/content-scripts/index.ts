import 'chrome-extension-async'
import { applySnapshot, onSnapshot } from 'mobx-state-tree'
import { contentModel } from '../models/content-model';
import '../shared/lib/logger'
import logger from '../shared/lib/logger';
import { getBgStore } from '../shared/messages/message-creators';
import { MessageType } from '../shared/messages/message-types';
import { BackgroundStoreSnapshot, Messages } from '../types';

// Create the store
const contentStore = contentModel.create({
  background: {},
})

// make sure to import chrome-extension-async to asyncify chrome API
// Get the current background page store
chrome.runtime.sendMessage(getBgStore()).then((snapshot: BackgroundStoreSnapshot) => {
  applySnapshot(contentStore.background, snapshot)
})

// Listen for messages
chrome.runtime.onMessage.addListener((message: Messages, sender, sendResponse) => {
  // apply any updates from the background store
  if (message.type === MessageType.BG_STORE_UPDATE) {
    applySnapshot(contentStore.background, message.snapshot)
  }
  return true
})
