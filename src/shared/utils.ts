import { asyncifyAll } from "chrome-ext-async";
import { applySnapshot, IAnyModelType, Instance, onSnapshot } from "mobx-state-tree";
import R from 'ramda';
import * as Rx from 'rxjs';
import { OnMessageCB } from "../types";
import Message from "./messages/types";
import { filter } from 'rxjs/operators';

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

export function createChromeEventObservable<T extends (...args: any[]) => any, E extends chrome.events.Event<T>>(messageEvent: E) {
    return new Rx.Observable<Parameters<Parameters<E['addListener']>[0]>>((subscriber) => {
        const listener = ((...args: any) => {
            if (chrome.runtime.lastError) {
                subscriber.error(chrome.runtime.lastError)
            } else {
                subscriber.next(args)
                return true
            }
        }) as unknown as T
        messageEvent.addListener(listener)
    })
}

export function filterMessage<M extends Message>(obs: Rx.Observable<any>, message: M) {
    return obs.pipe<OnMessageCB<M>>(
        filter(([m]) => m.type === message)
    )
}
