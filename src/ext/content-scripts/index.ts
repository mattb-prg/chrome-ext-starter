import { asyncifyAll } from 'chrome-ext-async';
import { getStore } from 'chrome-ext-mst-sync';
import { backgroundModel, id } from '../../models/background';
import { contentModel } from '../../models/content';
import '../../shared/lib/logger';
import logger from '../../shared/lib/logger';
import Message from '../../shared/messages/types';
import { MessageActions } from '../../types';

const ac = asyncifyAll()

async function main() {
  // Create the stores
  const snap = await getStore(id)
  const backgroundStore = backgroundModel.create(snap)
  const contentStore = contentModel.create()

  // Listen for messages
  chrome.runtime.onMessage.addListener((message: MessageActions, sender, sendResponse) => {
    if (message.type === Message.EXAMPLE) {
      sendResponse(message.foo)
    }
  })
}
main()
