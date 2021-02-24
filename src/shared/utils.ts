import { asyncifyAll } from "chrome-ext-async";
import { applySnapshot, IAnyModelType, Instance, onSnapshot } from "mobx-state-tree";
import R from 'ramda';

const ac = asyncifyAll()

export const createStoreFromStorage = async <M extends IAnyModelType>(model: M, defaultState: any, storageKey: string) => {
    return model.create(
        R.prop(storageKey, await ac.storage.local.get(storageKey)) || defaultState
    )
}

export const saveStoreSnapshots = (store: Instance<IAnyModelType>, storageKey: string) => {
    onSnapshot(store, (snapshot) => {
        chrome.storage.local.set({
            [storageKey]: snapshot
        })
    })
}

export const applySnapshotOnStorageChange = (store: Instance<IAnyModelType>, storageKey: string) => {
    return R.pipe(
        (changes: { [key: string]: chrome.storage.StorageChange }, areaName: chrome.storage.AreaName) => {
            const state = changes[storageKey]

            if (areaName === 'local' && state && state.newValue) {
                return state.newValue
            } else {
                return undefined
            }
        },
        (snapshot) => {
            if (snapshot) {
                applySnapshot(store, snapshot)
            }
        }
    )
}
