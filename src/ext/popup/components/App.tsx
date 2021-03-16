import { observer } from 'mobx-react';
import { Instance } from 'mobx-state-tree';
import React, { createContext, FC, useContext } from 'react';
import { popupModel, popupModelDefault } from '../../../models/popup';
import { sharedModel, sharedModelDefault } from '../../../models/shared';

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

const Main: FC<IMainProps> = observer((props) => {
    return (
        <div className='m-2'>
            <div>Install time: {props.installDate.toTimeString()}</div>
            <div>Toggle BG Color</div>
            <Btn onClick={props.onChangeBgColor}>toggle</Btn>
            <div>Click counter: {props.clickCount}</div>
            <Btn onClick={props.onIncrClickCounter}>increment</Btn>
        </div>
    )
})

const Btn: FC<any> = (props) => {
    return (
        <button {...props} className='rounded-md py-1 px-2 focus:outline-none hover:bg-purple-600 active:bg-purple-800 bg-purple-400'></button>
    )
}
