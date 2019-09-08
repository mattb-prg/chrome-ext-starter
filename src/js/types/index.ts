import { SnapshotIn } from "mobx-state-tree";
import { backgroundModel } from "../models/background-model";
import { contentModel } from "../models/content-model";
import { popupModel } from "../models/popup-model";
import * as messageActions from '../shared/messages/message-creators'

// Models
export type BackgroundStoreSnapshot = SnapshotIn<typeof backgroundModel>
export type ContentStoreSnapshot = SnapshotIn<typeof contentModel>
export type PopupStoreSnapshot = SnapshotIn<typeof popupModel>

// Messages
export type Messages = ReturnType<typeof messageActions[keyof typeof messageActions]>
