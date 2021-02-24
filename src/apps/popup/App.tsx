import classnames from 'classnames';
import { observer } from 'mobx-react';
import { Instance } from 'mobx-state-tree';
import React, { createContext, FC, useContext } from 'react';
import { popupModel, popupModelDefault } from '../../models/popup';
import { sharedModel, sharedModelDefault } from '../../models/shared';
import logger from '../../shared/logger';
import style from './App.module.scss';

logger.debug(style)

interface IProps {
    sharedStore: Instance<typeof sharedModel>
    popupStore: Instance<typeof popupModel>
}

const PopupStoreContext = createContext({
    popupStore: popupModel.create(popupModelDefault),
    sharedStore: sharedModel.create(sharedModelDefault)
})

export const App = observer((props: IProps) => {
    return (
        <PopupStoreContext.Provider value={{ ...props }}>
            <MainCont />
        </PopupStoreContext.Provider>
    )
})

const MainCont = observer(() => {
    const { popupStore, sharedStore } = useContext(PopupStoreContext);

    return <Main
        bgColor={sharedStore.bgColor}
        clickCount={popupStore.clickCounter}
        installDate={sharedStore.installDate}
        onIncrClickCounter={popupStore.incrCounter}
        onChangeBgColor={sharedStore.toggleBgColor}
    />
})

interface IMainProps {
    bgColor: string
    clickCount: number
    installDate: Date
    onChangeBgColor(): void
    onIncrClickCounter(): void
}

const Main = observer<FC<IMainProps>>((props) => {
    return (
        <div>
            <div style={{ marginTop: 10 }}>Install time: {props.installDate.toTimeString()}</div>
            <div>Toggle BG Color</div>
            <button onClick={props.onChangeBgColor}>toggle</button>
            <div>Click counter: {props.clickCount}</div>
            <button onClick={props.onIncrClickCounter}>increment</button>
        </div>
    )
})
