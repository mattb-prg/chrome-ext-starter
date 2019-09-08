import 'chrome-extension-async';
import { getSnapshot, onSnapshot } from "mobx-state-tree";
import { backgroundModel } from "../models/background-model";
import '../shared/lib/logger';
import logger from '../shared/lib/logger';
import { bgStoreUpdate } from "../shared/messages/message-creators";
import { MessageType } from '../shared/messages/message-types';
import { Messages } from '../types';

// Create the store
const backgroundStore = backgroundModel.create()

// Send any store updates to content scripts
onSnapshot(backgroundStore, async (snapshot) => {
  logger.debug(snapshot)
  const tabs = await chrome.tabs.query({})
  tabs.forEach((tab) => {
    chrome.tabs.sendMessage(tab.id, bgStoreUpdate(snapshot))
  })
})

// Listen for messages
chrome.runtime.onMessage.addListener((message: Messages, sender, sendResponse) => {
  if (message.type === MessageType.GET_BG_STORE) {
    sendResponse(getSnapshot(backgroundStore))
  }
})
