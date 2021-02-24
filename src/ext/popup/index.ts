import { autorun } from "mobx"
import { createElement } from "react"
import { render } from "react-dom"
import { App } from "../../apps/popup/App"
import { popupModel, popupModelDefault } from "../../models/popup"
import { sharedModel, sharedModelDefault } from "../../models/shared"
import { applySnapshotOnStorageChange, createStoreFromStorage, saveStoreSnapshots } from "../../shared/utils"
import { storageKeys } from "../config"

async function main() {
    const sharedStore = await createStoreFromStorage(sharedModel, sharedModelDefault, storageKeys.shared)
    const popupStore = popupModel.create(popupModelDefault)
    render(createElement(App, { popupStore, sharedStore }), document.getElementById('app-root'))

    autorun(() => {
        document.body.style.backgroundColor = sharedStore.bgColor
    })

    chrome.storage.onChanged.addListener(applySnapshotOnStorageChange(sharedStore, storageKeys.shared))
    saveStoreSnapshots(sharedStore, storageKeys.shared)
}
main()
