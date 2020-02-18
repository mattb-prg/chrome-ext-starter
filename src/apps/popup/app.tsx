import { observer } from 'mobx-react';
import { Instance } from 'mobx-state-tree';
import React, { createContext, useContext } from 'react';
import styled from 'styled-components';
import { backgroundModel } from '../../models/background';
import { popupModel } from '../../models/popup';

interface IProps {
    stores: {
        background: Instance<typeof backgroundModel>
        popup: Instance<typeof popupModel>
    }
}

const Context = createContext<IProps>(null)

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
    const { stores } = useContext(Context)
    const { popup } = stores;

    return (
        <div>
            <div className={props.className}>{popup.test}</div>
            <button onClick={popup.changeTest}>Change test prop</button>
        </div>
    )
}))`
    color: red;
`

export default App
