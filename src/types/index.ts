import * as messageActions from '../shared/messages/actions';

// Messages
export type MessageActions = ReturnType<typeof messageActions[keyof typeof messageActions]>
