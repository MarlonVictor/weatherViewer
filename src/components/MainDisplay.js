import Image from 'next/image';
import { useState, useEffect } from 'react';
import { BsStar, BsStarFill, BsDroplet } from 'react-icons/bs';
import { BiWind } from 'react-icons/bi';
import { FaThermometerEmpty } from 'react-icons/fa';

import imageUrlGenerator from '../utils/imageUrlGenerator';
import useLocalStorage from '../hooks/useLocalStorage';


export default function MainDisplay({ data, tempValue, date }) {
    const [favored, setFavored] = useState(undefined)
    const [store, setStore] = useState([])

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem('favorites'))
        setStore(favorites)
    }, [favored])

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
        <div className="flex flex-col items-center font-sans text-center mx-auto pt-5 md:pt-14">
            {data && (
                    <>  
                        <header className="flex items-center">
                            <h1 className="text-2xl md:tracking-wide font-semibold sm:font-base sm:text-4xl pb-1">{data.name}, {data.sys.country}</h1>
                            {store.includes(data.name)
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
                                <h2 className="text-5xl sm:text-7xl font-bold text-gray-800 dark:text-gray-200">{tempValue(data.main.temp)}</h2>
                                <p className="sm:text-lg tracking-wider text-gray-400 pb-3">{data.weather[0].description}</p>
                            </div>
                            
                            <div className="w-28 sm:w-36 ml-7 md:ml-14 py-2">
                                <Image 
                                    width={300}
                                    height={300}
                                    src={imageUrlGenerator(data.weather[0].icon)}
                                    alt="Icone"
                                />
                            </div>
                        </main>

                        <footer className="flex font-medium text-gray-700 dark:text-gray-200 space-x-3 px-2 mt-7">
                            <div className="w-20 sm:w-28 bg-white dark:bg-gray-700 p-2 rounded-lg border border-gray-200 dark:border-gray-700">
                                <small className="hidden sm:block mb-2 text-xs">Sensação</small>
                                <span className="flex flex-col sm:flex-row align-center">
                                    <FaThermometerEmpty size="25" className="mx-auto" /> 
                                    <small className="flex-1 mt-2 sm:mt-0.5 tracking-wider">{tempValue(data.main.feels_like)}</small>
                                </span>
                            </div>
                            <div className="w-20 sm:w-28 bg-white dark:bg-gray-700 p-2 rounded-lg border border-gray-200 dark:border-gray-700">
                                <small className="hidden sm:block mb-2 text-xs">Vel. Vento</small>
                                <span className="flex flex-col sm:flex-row align-center">
                                    <BsDroplet size="25" className="mx-auto" /> 
                                    <small className="flex-1 mt-2 sm:mt-0.5 tracking-wider">{data.wind.speed}m/s</small>
                                </span>
                            </div>
                            <div className="w-20 sm:w-28 bg-white dark:bg-gray-700 p-2 rounded-lg border border-gray-200 dark:border-gray-700">
                                <small className="hidden sm:block mb-2 text-xs">Humidade</small>
                                <span className="flex flex-col sm:flex-row align-center">
                                    <BiWind size="25" className="mx-auto" /> 
                                    <small className="flex-1 mt-2 sm:mt-0.5 tracking-wider">{data.main.humidity}%</small>
                                </span>
                            </div>
                        </footer>
                    </>
                )
            }
        </div>
    )
}