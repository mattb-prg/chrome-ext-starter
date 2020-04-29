import { observer } from 'mobx-react';
import { Instance } from 'mobx-state-tree';
import React, { createContext, useContext } from 'react';
import styled from 'styled-components';
import { backgroundModel } from '../../models/background';
import { popupModel } from '../../models/popup';
import { AsyncStoreFns } from 'chrome-ext-mst-sync';
import { BackgroundStoreInstance, PopupStoreInstance } from '../../types';

interface IProps {
    stores: {
        background: BackgroundStoreInstance
        popup: PopupStoreInstance
        bgActions: AsyncStoreFns<BackgroundStoreInstance>
    }
}

const Context = createContext<IProps>(null as any)

const App = observer((props: IProps) => {
    return (
        <Context.Provider value={{ ...props }}>
            <StyledComponent />
        </Context.Provider>
    )
})

interface IStyledProps {
    className?: string
}

const StyledComponent = styled(observer((props: IStyledProps) => {
    const { popup, bgActions, background } = useContext(Context).stores;

    const onSignInOut = async () => {
        if (background.loggedIn) {
            await bgActions.signOut()
        } else {
            await bgActions.signIn()
        }
    }

    return (
        <div>
            <div>{background.loggedIn ? 'Signed in' : 'Signed out'}</div>
            <div><button onClick={onSignInOut}>{background.loggedIn ? 'Sign out' : 'Sign in'}</button></div>
            <div className={props.className}>{popup.test}</div>
            <button onClick={popup.changeTest}>Change test prop</button>
        </div>
    )
}))`
    color: red;
`
export default App
