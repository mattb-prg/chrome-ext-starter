import 'chrome-extension-async';
import { getSnapshot, onSnapshot } from "mobx-state-tree";
import { backgroundModel } from "../models/background";
import '../shared/lib/logger';
import logger from '../shared/lib/logger';
import { bgStoreUpdate } from "../shared/messages/creators";
import { MessageType } from '../shared/messages/types';
import { Messages } from '../types';

// Create the store
const backgroundStore = backgroundModel.create()

// Send any store updates to content/popup scripts
onSnapshot(backgroundStore, async (snapshot) => {
  // Content scripts
  const tabs = await chrome.tabs.query({})
  tabs.forEach(async (tab) => {
    await chrome.tabs.sendMessage(tab.id, bgStoreUpdate(snapshot))
  })

  // Popup
  await chrome.runtime.sendMessage(bgStoreUpdate(snapshot))
})

// Listen for messages
chrome.runtime.onMessage.addListener((message: Messages, sender, sendResponse) => {
  if (message.type === MessageType.GET_BG_STORE) {
    sendResponse(getSnapshot(backgroundStore))
  }
})
