import { getStore } from 'chrome-ext-mst-sync';
import 'chrome-extension-async';
import { applySnapshot } from 'mobx-state-tree';
import { backgroundModel, id } from '../models/background';
import { contentModel } from '../models/content';
import '../shared/lib/logger';
import { MessageType } from '../shared/messages/types';
import { Messages } from '../types';

// Make sure to import chrome-extension-async to asyncify chrome API
async function main() {
  // Create the stores
  const snap = await getStore(id)
  const backgroundStore = backgroundModel.create(snap)
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
    if (message.type === MessageType.EXAMPLE) {
      applySnapshot(backgroundStore, message.foo)
    }
    return true
  })
}
main()
