import { createStoreSync, getStore } from "chrome-ext-mst-sync"
import { createElement } from "react"
import { render } from "react-dom"
import { backgroundModel, id } from "../../models/background"
import { popupModel } from "../../models/popup"
import { Messages } from "../../types"
import App from "../../apps/popup/app"

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

    chrome.runtime.onMessage.addListener((message: Messages, sender, sendResponse) => {
        if (message.type === 'EXAMPLE_TWO') {
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
