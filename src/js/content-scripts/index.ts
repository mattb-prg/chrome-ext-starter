import 'chrome-extension-async';
import { applySnapshot } from 'mobx-state-tree';
import { backgroundModel } from '../models/background';
import { contentModel } from '../models/content';
import '../shared/lib/logger';
import { getBgStore } from '../shared/messages/creators';
import { MessageType } from '../shared/messages/types';
import { BackgroundStoreSnapshot, Messages } from '../types';

// Make sure to import chrome-extension-async to asyncify chrome API
async function main() {
  // Create the stores
  const snapshot: BackgroundStoreSnapshot = await chrome.runtime.sendMessage(getBgStore())
  const backgroundStore = backgroundModel.create(snapshot)
  const contentStore = contentModel.create()

  // Any changes made here to the background store can be sent back to
  // the background page if needed. This code can also be used in the popup
  //
  // onSnapshot(backgroundStore, async (snapshot) => {
  //   await chrome.runtime.sendMessage(bgStoreUpdate(snapshot))
  // })

  // Listen for messages
  chrome.runtime.onMessage.addListener((message: Messages, sender, sendResponse) => {
    // apply any updates from the background store
    if (message.type === MessageType.BG_STORE_UPDATE) {
      applySnapshot(backgroundStore, message.snapshot)
    }
    return true
  })
}
main()
