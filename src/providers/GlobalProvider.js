import { createContext, useState } from 'react';


export const Context = createContext();

export function GlobalProvider({ children }) {
    const [scale, setScale] = useState('Kelvin')
    const [openMenu, setOpenMenu] = useState(false)

    const values = {
        scale,
        openMenu
    }
    const setValues = {
        setScale,
        setOpenMenu
    }

    return (
        <Context.Provider value={{ values, setValues }}>
            {children}
        </Context.Provider>
    )
}