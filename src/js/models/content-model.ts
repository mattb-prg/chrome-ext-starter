import { Instance, SnapshotIn, SnapshotOut, types } from 'mobx-state-tree'
import { backgroundModel } from './background-model';

export const contentModel = types.model({
  background: backgroundModel,
})
