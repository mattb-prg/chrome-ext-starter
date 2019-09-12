import { applySnapshot } from "mobx-state-tree"
import { createElement } from "react"
import { render } from "react-dom"
import { backgroundModel } from "../models/background"
import { popupModel } from "../models/popup"
import { getBgStore } from "../shared/messages/creators"
import { MessageType } from "../shared/messages/types"
import { Messages } from "../types"
import App from "./components/app"

async function main() {
    const snapshot = await chrome.runtime.sendMessage(getBgStore())
    const backgroundStore = backgroundModel.create(snapshot)
    const popupStore = popupModel.create({
        test: 'foo',
    })

    chrome.runtime.onMessage.addListener((message: Messages, sender, sendResponse) => {
        if (message.type === MessageType.BG_STORE_UPDATE) {
            applySnapshot(backgroundStore, message.snapshot)
        }
    })

    render(createElement(App, {
        stores: {
            background: backgroundStore,
            popup: popupStore,
        },
    }), document.getElementById('app-root'))
}
main()
