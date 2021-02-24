import { sharedModel, sharedModelDefault } from '../../models/shared';
import '../../shared/logger';
import Message from '../../shared/messages/types';
import { createStoreFromStorage, saveStoreSnapshots } from '../../shared/utils';
import { MessageActions } from '../../types';
import { storageKeys } from '../config';

async function main() {
  const sharedStore = await createStoreFromStorage(sharedModel, sharedModelDefault, storageKeys.shared)

  saveStoreSnapshots(sharedStore, storageKeys.shared)

  // Listen for messages
  chrome.runtime.onMessage.addListener((message: MessageActions, sender, sendResponse) => {
    if (message.type === Message.EXAMPLE) {
      sendResponse(message.foo)
    }
  })

  chrome.runtime.onInstalled.addListener(async () => {
    sharedStore.setInstallDate(new Date)
  })
}

main()
