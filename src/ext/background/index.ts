import { sharedModel, sharedModelDefault } from '../../models/shared';
import '../../shared/logger';
import logger from '../../shared/logger';
import Message from '../../shared/messages/types';
import { createChromeEventObservable, createStoreFromStorage, filterMessage, saveStoreSnapshots } from '../../shared/utils';
import { storageKeys } from '../config';

async function main() {
  const onMessage$ = createChromeEventObservable(chrome.runtime.onMessage)
  const onInstalled$ = createChromeEventObservable(chrome.runtime.onInstalled)
  const sharedStore = await createStoreFromStorage(sharedModel, sharedModelDefault, storageKeys.shared)

  saveStoreSnapshots(sharedStore, storageKeys.shared)

  filterMessage(onMessage$, Message.EXAMPLE).subscribe(([message, sender, sendResponse]) => {
    logger.debug('received EXAMPLE message')
    sendResponse(true)
  })

  filterMessage(onMessage$, Message.EXAMPLE_TWO).subscribe(([message, sender, sendResponse]) => {
    logger.debug('received EXAMPLE TWO message')
    sendResponse(false)
  })

  onInstalled$.subscribe(([details]) => {
    console.log('installation details', details)
    sharedStore.setInstallDate(new Date)
  })
}

main()
