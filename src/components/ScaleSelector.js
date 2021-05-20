import { useContext } from 'react';

import { Context } from '../providers/GlobalProvider';


export default function ScaleSelector({ name }) {
    const { values, setValues } = useContext(Context)

    const currentScale = values.scale
    const toggleScale = value => setValues.setScale(value)

    return (
        <button 
            value={name} 
            onClick={e => toggleScale(e.target.value)}
            className={`${name === currentScale ? 'bg-gray-200 dark:bg-gray-600 border-gray-300' : 'bg-transparent'} text-center text-sm w-24 p-2 border-b-2 border-transparent hover:border-gray-300`}
        >
            {name}
        </button>
    )
}