import { BackgroundStoreSnapshot, ContentStoreSnapshot, PopupStoreSnapshot } from "../../types";
import { MessageType } from "./message-types";

export function bgStoreUpdate(snapshot: BackgroundStoreSnapshot) {
  return {
    snapshot,
    type: MessageType.BG_STORE_UPDATE as MessageType.BG_STORE_UPDATE,
  }
}

export function csStoreUpdate(snapshot: ContentStoreSnapshot) {
  return {
    snapshot,
    type: MessageType.CS_STORE_UPDATE as MessageType.CS_STORE_UPDATE,
  }
}

export function puStoreUpdate(snapshot: PopupStoreSnapshot) {
  return {
    snapshot,
    type: MessageType.PU_STORE_UPDATE as MessageType.PU_STORE_UPDATE,
  }
}

export function getBgStore() {
  return {
    type: MessageType.GET_BG_STORE as MessageType.GET_BG_STORE,
  }
}
