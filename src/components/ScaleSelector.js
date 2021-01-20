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
            className={`${name === currentScale ? 'bg-gray-300 dark:bg-gray-800' : 'bg-gray-200 dark:bg-gray-600'} px-1 text-center text-sm border-2 border-gray-300 dark:border-gray-500 rounded hover:bg-gray-300 dark:hover:bg-gray-800`}
        >
            {name}
        </button>
    )
}