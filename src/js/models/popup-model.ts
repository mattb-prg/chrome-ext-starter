import { types } from "mobx-state-tree";
import { backgroundModel } from "./background-model";

export const popupModel = types.model({
  background: backgroundModel,
})
