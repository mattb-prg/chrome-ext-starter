import { SnapshotIn, types } from 'mobx-state-tree';

export const contentModel = types.model({
    linkCount: types.number
}).actions((self) => {
    return {
        setLinkCount(count: number) {
            self.linkCount = count
        }
    }
})

export const contentModelDeault: SnapshotIn<typeof contentModel> = {
    linkCount: 0
}
