import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

import { Context } from '../providers/GlobalProvider';


export default function SearchInput({ screen }) {
    const router = useRouter()

    const { setValues } = useContext(Context)

    const [inputValue, setInputValue] = useState('')
    const [inputIsOpened, setInputIsOpened] = useState(false)
    
    const handleKeyPress = e => e.key === 'Enter' ? saveLocationName() : null
    const toggleInput = () => setInputIsOpened(!inputIsOpened)

    function saveLocationName() {
        setValues.setLocation(inputValue)
        setValues.setOpenMenu(false)
        router.push('/weather')
        setInputValue('')
        setInputIsOpened(false)
    }

    if (screen === 'sidebar') {
        return (
            <div className="flex mb-7 space-x-3 text-gray-700 dark:text-gray-300 p-2 rounded-md font-medium border border-gray-200 dark:border-gray-900">
                <AiOutlineSearch size="25" />

                <input
                    type="text"
                    value={inputValue}
                    onKeyPress={handleKeyPress}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder="Digite o local desejado..." 
                    className="flex-1 font-medium outline-none bg-transparent"
                />
            </div>
        )
    } else {
        return (
            <div className="flex m-2 p-2 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800">
                <AiOutlineSearch 
                    size="25" 
                    onClick={toggleInput} 
                />

                <input 
                    type="text"
                    value={inputValue}
                    onKeyPress={handleKeyPress}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder="Digite o local desejado..." 
                    className={`transition-all outline-none bg-transparent ${inputIsOpened ? 'w-100 ml-3' : 'w-0'}`}
                />
            </div>
        )
    }
}