import { createStoreSync, getStore } from "chrome-ext-mst-sync"
import { createElement } from "react"
import { render } from "react-dom"
import App from "../../apps/popup/app"
import { backgroundModel, id } from "../../models/background"
import { popupModel } from "../../models/popup"
import Message from "../../shared/messages/types"
import { MessageActions } from "../../types"

async function main() {
    const snap = await getStore(id)
    const backgroundStore = backgroundModel.create(snap)
    const popupStore = popupModel.create({
        test: 'foo',
    })
    const sync = createStoreSync(id, backgroundStore, {
        truthStore: false,
    })
    sync.start()

    chrome.runtime.onMessage.addListener((message: MessageActions, sender, sendResponse) => {
        if (message.type === Message.EXAMPLE_2) {
            sendResponse(message.bar)
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
