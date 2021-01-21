import { createContext, useState } from 'react';


export const Context = createContext();

export function GlobalProvider({ children }) {
    const [scale, setScale] = useState('Kelvin')
    const [location, setLocation] = useState('')
    const [openMenu, setOpenMenu] = useState(false)

    const values = {
        scale,
        location,
        openMenu
    }
    const setValues = {
        setScale,
        setLocation,
        setOpenMenu
    }

    return (
        <Context.Provider value={{ values, setValues }}>
            {children}
        </Context.Provider>
    )
}