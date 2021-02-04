import { useState } from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';

import imageUrlGenerator from '../utils/imageUrlGenerator';
import useLocalStorage from '../hooks/useLocalStorage';


export default function MainDisplay({ data, tempValue, date }) {
    const [favored, setFavored] = useState(undefined)
    const favoriteList = localStorage.getItem('favorites') || []

    function handleFavorites(mode, name) {
        if(mode === 'add') {
            useLocalStorage('save', name)
            setFavored(true)
        } else {
            useLocalStorage('delete', name)
            setFavored(false)
        }
    }


    return (
        <div className="flex flex-col items-center font-sans text-center">
            {data && (
                    <>  
                        <header className="flex items-center">
                            <h1 className="text-2xl font-semibold sm:font-base sm:text-4xl pb-1">{data.name}, {data.sys.country}</h1>
                            {favoriteList.includes(data.name)
                                ? (
                                    <BsStarFill 
                                        size="38" 
                                        onClick={() => handleFavorites('del', data.name)}
                                        className="ml-5 text-yellow-300 hover:opacity-70 transition duration-150 cursor-pointer" 
                                    /> 
                                )
                                : (
                                    <BsStar 
                                        size="38" 
                                        onClick={() => handleFavorites('add', data.name)}
                                        className="ml-5 text-gray-500 dark:text-gray-200 hover:text-yellow-300 dark:hover:text-yellow-300 transition duration-150 cursor-pointer" 
                                    />
                                )
                            }
                        </header>

                        <small>{date}</small>

                        <main className="flex pt-3 justify-center items-center">
                            <div>
                                <h2 className="tracking-tighter text-5xl sm:text-7xl font-bold text-gray-800 dark:text-gray-200">{tempValue(data.main.temp)}</h2>
                                <p className="sm:text-lg tracking-wide text-gray-400 pb-3">{data.weather[0].description}</p>
                            </div>
                            <img
                                className="w-28 sm:w-36 ml-7 py-2"
                                src={imageUrlGenerator(data.weather[0].icon)}
                            />
                        </main>

                        <footer className="flex font-medium text-gray-500 dark:text-gray-400 space-x-6">
                            <small>Sensação: {tempValue(data.main.feels_like)}</small>
                            <small>Vento: {data.wind.speed}m/s</small>
                            <small>Humidade: {data.main.humidity}%</small>
                        </footer>
                    </>
                )
            }
        </div>
    )
}