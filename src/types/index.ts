import { SnapshotIn } from "mobx-state-tree";
import { backgroundModel } from "../models/background";
import { contentModel } from "../models/content";
import { popupModel } from "../models/popup";
import * as messageActions from '../shared/messages/actions'

// Models
export type BackgroundStoreSnapshot = SnapshotIn<typeof backgroundModel>
export type ContentStoreSnapshot = SnapshotIn<typeof contentModel>
export type PopupStoreSnapshot = SnapshotIn<typeof popupModel>

// Messages
export type Messages = ReturnType<typeof messageActions[keyof typeof messageActions]>
