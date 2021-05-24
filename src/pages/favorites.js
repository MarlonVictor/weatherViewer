import { useRouter } from 'next/router';
import { useState, useContext, useEffect } from 'react';
import { AiOutlineMenuUnfold, AiOutlineSearch } from 'react-icons/ai';
import { BsStarFill } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';

import useLocalStorage from '../hooks/useLocalStorage';
import { Context } from '../providers/GlobalProvider';
import Lottie from '../utils/lottieAnimation';

import SearchInput from '../components/SearchInput';


export default function Favorites() {
    const { values, setValues } = useContext(Context)
    const [searchTerm, setSearchTerm] = useState('')
    const [favorites, setFavorites] = useState([])

    // Aside button
    const itsOpen = values.openMenu
    const toggleScale = () => setValues.setOpenMenu(!itsOpen)

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
            <header className="md:hidden flex justify-between">
                <button onClick={toggleScale} className="m-2 p-2 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800">
                    <AiOutlineMenuUnfold size="25" />
                </button>

                <SearchInput />
            </header>

            {favorites.length < 1 ? (
                <>
                    <div className="mt-32 w-44 mx-auto">
                        <Lottie animationName="Favorite" />
                    </div>
                    <h1 className="text-center text-lg sm:text-2xl font-semibold text-gray-600 dark:text-gray-200">Não há nenhum local salvo como Favorito!</h1>
                </>
            ) : (
                <main className="mx-auto max-w-md px-4 sm:p-0 md:mt-14 max-h-full">
                    <h1 className="text-gray-700 dark:text-gray-300 text-2xl font-bold tracking-wider">Meus Favoritos:</h1>

                    <div className="flex my-5 space-x-3 text-gray-700 dark:text-gray-300 p-2 rounded-md font-medium border border-gray-200 dark:border-gray-900 bg-white dark:bg-gray-800">
                        <AiOutlineSearch size="25" />

                        <input
                            type="text"
                            onChange={e => setSearchTerm(e.target.value)}
                            placeholder="Busque por favoritos..." 
                            className="flex-1 outline-none bg-transparent"
                        />
                    </div>

                    <ul className="overflow-y-auto max-h-64 md:max-h-80">
                        {favorites.filter(val => {
                            if(searchTerm === '') {
                                return val
                            } else if(val.toLowerCase().includes(searchTerm.toLowerCase())) {
                                return val
                            }
                        }).map((name, key) =>
                            <li key={key} className="flex justify-between py-2 px-1 border-b-2 dark:border-gray-700">
                                <span className="flex items-center text-lg md:text-base cursor-pointer tracking-wide" onClick={() => searchLocation(name)}>
                                    <BsStarFill size="18" className="text-yellow-300 mr-2" /> 
                                    {name}
                                </span>

                                <FaTrash 
                                    size="22" 
                                    onClick={() => deleteFavorite(name)}
                                    className="text-red-600 opacity-50 hover:opacity-100 transition duration-150 cursor-pointer" 
                                /> 
                            </li>
                        )}
                    </ul>
                </main>
            )}
            
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className=" hidden md:block absolute left-0 bottom-0 pointer-events-none">
                <path fill="#9999990D" fillOpacity="1" d="M0,256L48,256C96,256,192,256,288,240C384,224,480,192,576,170.7C672,149,768,139,864,154.7C960,171,1056,213,1152,197.3C1248,181,1344,107,1392,69.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
        </>
    )
}