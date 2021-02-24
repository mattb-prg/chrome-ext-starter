import { SnapshotIn, types } from "mobx-state-tree";

export const popupModel = types.model({
    clickCounter: types.number,
}).actions((self) => {
    return {
        incrCounter() {
            self.clickCounter += 1
        }
    }
})

export const popupModelDefault: SnapshotIn<typeof popupModel> = {
    clickCounter: 0
}
