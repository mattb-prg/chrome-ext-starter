import { createStoreSync } from 'chrome-ext-mst-sync';
import 'chrome-extension-async';
import { backgroundModel, id } from "../../models/background";
import '../../shared/lib/logger';
import Message from '../../shared/messages/types';
import { MessageActions } from '../../types';

async function main() {
  // Create the store
  const backgroundStore = backgroundModel.create()
  const sync = createStoreSync(id, backgroundStore, {
    truthStore: true,
    getTabs: (cb) => {
      chrome.tabs.query({}, cb)
    }
  })
  sync.start()

  // Listen for messages
  chrome.runtime.onMessage.addListener((message: MessageActions, sender, sendResponse) => {
    if (message.type === Message.EXAMPLE) {
      sendResponse(message.foo)
    }
  })

}
main()
