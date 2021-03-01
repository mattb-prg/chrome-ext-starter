import * as messageActions from '../shared/messages/actions';
import Message from '../shared/messages/types';
// Messages
export type MessageActions = ReturnType<typeof messageActions[keyof typeof messageActions]>

export type OnMessageCB<M extends Message> = [
    message: Extract<MessageActions, { type: M }>,
    sender: chrome.runtime.MessageSender,
    sendResponse: (...args: any) => any
]