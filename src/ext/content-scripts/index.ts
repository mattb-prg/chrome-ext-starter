import '../../shared/logger';
import Message from '../../shared/messages/types';
import { MessageActions } from '../../types';
import { asyncifyAll, asyncifyChromeFn } from 'chrome-ext-async';
import { storageKeys } from '../config';
import { popupModel, popupModelDefault } from '../../models/popup';
import { contentModel, contentModelDeault } from '../../models/content';
import { autorun } from 'mobx';
import { applySnapshotOnStorageChange, createStoreFromStorage } from '../../shared/utils';
import R from 'ramda';
import { sharedModel, sharedModelDefault } from '../../models/shared';
import { example, exampleTwo } from '../../shared/messages/actions';
import logger from '../../shared/logger';

const ac = asyncifyAll()

async function main() {
  logger.debug(await ac.runtime.sendMessage(example(1)))
  logger.debug(await ac.runtime.sendMessage(exampleTwo(1)))
  const sharedStore = await createStoreFromStorage(sharedModel, sharedModelDefault, storageKeys.shared)
  const contentStore = contentModel.create(contentModelDeault)

  contentStore.setLinkCount(document.links.length)

  autorun(() => {
    document.body.style.backgroundColor = sharedStore.bgColor
  })

  // Storage changes
  chrome.storage.onChanged.addListener(applySnapshotOnStorageChange(sharedStore, storageKeys.shared))

  // Listen for messages
  chrome.runtime.onMessage.addListener((message: MessageActions, sender, sendResponse) => {
    if (message.type === Message.EXAMPLE) {
      sendResponse(message.foo)
    }
  })
}
main()
