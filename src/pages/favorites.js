import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { BsStarFill } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';

import useLocalStorage from '../hooks/useLocalStorage';
import { Context } from '../providers/GlobalProvider';

import SearchInput from '../components/SearchInput';


export default function Favorites() {
    const { setValues } = useContext(Context)
    const [searchTerm, setSearchTerm] = useState('')
    const [favorites, setFavorites] = useState([])

    useEffect(() => {
        setFavorites(useLocalStorage())
    }, [])
    
    const router = useRouter()

    function searchLocation(location) {
        setValues.setLocation(location)
        router.push('/weather')
    }

    function deleteFavorite(i) {
        useLocalStorage('delete', i)
        setFavorites(useLocalStorage())
    }


    return (
        <>
            <SearchInput />

            {favorites.length < 1 ? (
                <>
                    <h1 className="mt-32 text-center text-lg sm:text-2xl xl:text-3xl 2xl:text-4xl font-semibold text-gray-600 dark:text-gray-200">Não há nenhum local salvo como Favorito!</h1>

                    <img 
                        src="/CityFooter.png" 
                        alt="Footer" 
                        className="w-full absolute bottom-0 md:hidden"
                    />
                </>
            ) : (
                <main className="mx-auto max-w-sm px-4 sm:p-0 max-h-full">
                    <h1 className="text-gray-700 dark:text-gray-300 text-2xl font-semibold tracking-wider">Meus Favoritos:</h1>

                    <input 
                        onChange={val => setSearchTerm(val.target.value)}
                        placeholder="Busque por favoritos..." 
                        className="bg-gray-200 dark:bg-gray-500 w-full mt-5 mb-2 px-2 leading-8 shadow-md rounded-md" 
                    />

                    <ul className="overflow-y-auto max-h-64 md:max-h-80">
                        {favorites.filter(val => {
                            if(searchTerm === '') {
                                return val
                            } else if(val.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return val
                            }
                        }).map((name, key) =>
                            <li key={key} className="flex justify-between py-2 px-1 border-b-2">
                                <span className="flex items-center text-lg md:text-base cursor-pointer" onClick={() => searchLocation(name)}>
                                    <BsStarFill size="18" className="text-yellow-300 mr-2" /> 
                                    {name}
                                </span>

                                <FaTrash 
                                    size="25" 
                                    onClick={() => deleteFavorite(name)}
                                    className="text-red-600 opacity-50 hover:opacity-100 transition duration-150 cursor-pointer" 
                                /> 
                            </li>
                        )}
                    </ul>
                </main>
            )}
        </>
    )
}