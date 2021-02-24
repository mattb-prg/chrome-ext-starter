import { SnapshotIn, types } from "mobx-state-tree";

const colors = {
    red: '#eb4034',
    green: '#71eb34'
}

export const sharedModel = types.model({
    installDate: types.Date,
    bgColor: types.string,
}).actions((self) => {
    return {
        toggleBgColor() {
            self.bgColor = self.bgColor === colors.red ? colors.green : colors.red
        },
        setInstallDate(date: Date){
            self.installDate = date
        }
    }
})

export const sharedModelDefault: SnapshotIn<typeof sharedModel> = {
    bgColor: colors.red,
    installDate: 0,
}
