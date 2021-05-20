import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';

import Loader from '../components/LoaderAnimation';
import MainDisplay from '../components/MainDisplay';
import WeekDisplay from '../components/WeekDisplay';
import SearchInput from '../components/SearchInput';

import useApi from '../hooks/useApi';
import { Context } from '../providers/GlobalProvider';
import { AiOutlineMenuUnfold } from 'react-icons/ai';


export default function Weather() {
    const { values, setValues } = useContext(Context)
    const [weekInfo, setWeekInfo] = useState('')

    moment.locale('pt_br')
    const day = moment().format('LL') // DD de MM de YY

    // Aside button
    const itsOpen = values.openMenu
    const toggleScale = () => setValues.setOpenMenu(!itsOpen)

    const locationName = values.location
    const appId = '1a788676b927fd9d836e736fd6e92e25'

    const [fetchMain, mainInfo] = useApi({
        url: 'https://api.openweathermap.org/data/2.5/weather',
        method: 'get',
        params: {
            q: locationName,
            APPID: appId,
            lang: 'pt_br'
        }
    })

    async function fetchWeekInfos() {
        await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${mainInfo.data.coord.lat}&lon=${mainInfo.data.coord.lon}&appid=${appId}&lang=pt_br`)
            .then(res => setWeekInfo(res.data.daily))
    }

    function tempConverter(temp) {
        const scaleName = values.scale
        const scaleCalc = temp - 273.15

        if(scaleName === 'Celsius') {
            return `${Math.round(scaleCalc)}ºC`

        } else if(scaleName === 'Fahrenheit') {
            return `${Math.round(scaleCalc * (9/5) + 32)}ºF`

        } else {
            return `${Math.round(temp)}ºK`
        }
    }

    useEffect(() => {
        fetchMain()
        setWeekInfo('')
    }, [locationName])

    
    if(mainInfo.error) {
        return (
            <>  
                <img 
                    alt="ERROR" 
                    loading="lazy"
                    src="https://www.freeiconspng.com/uploads/sign-red-error-icon-1.png" 
                    className="w-24 md:w-36 mx-auto"
                />

                <div className="text-center font-semibold text-gray-600 dark:text-gray-200">
                    <h1 className="py-2 text-lg sm:text-2xl xl:text-3xl 2xl:text-4xl">Ocorreu um erro!</h1>
                    <h2 className="px-2 sm:text-xl xl:text-2xl 2xl:text-3xl">Digite o nome do local desejado novamente</h2>
                </div>
            </>
        )
    }

    return (
        <main className="h-full flex flex-col"> 
            <header className="md:hidden flex justify-between">
                <button onClick={toggleScale} className="m-2 p-2 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800">
                    <AiOutlineMenuUnfold size="25" />
                </button>

                <SearchInput />
            </header>

            {mainInfo.loading 
                ? (
                   <div className="h-40 cursor-default mt-48">
                        <Loader />
                    </div>

                ) : (
                    <section>
                        <MainDisplay data={mainInfo.data} tempValue={tempConverter} date={day} />

                        <div className="flex flex-col sm:flex-row justify-center items-center mb-5 mt-5 sm:mt-10">
                            {weekInfo ? (
                                <div className="flex flex-wrap justify-center flex-col sm:flex-row">
                                    {weekInfo.map((res, key) => {
                                        const day = moment().add(key + 1, 'd').format('dddd')

                                        return <WeekDisplay 
                                            data={res} 
                                            key={key} 
                                            tempValue={tempConverter}
                                            date={day}
                                        />
                                    }).slice(0, 5)}
                                </div>
                            ) : (
                                <button
                                    onClick={() => fetchWeekInfos()}
                                    className="mt-5 py-2 px-3 sm:px-16 rounded shadow-lg bg-white dark:bg-gray-800 border-b-2 border-gray-400 transition hover:bg-gray-200 dark:hover:bg-gray-700"
                                >
                                    <span className="mx-auto text-sm text-gray-800 dark:text-gray-300 font-bold sm:tracking-wide">Veja a previsão dos próximos dias</span>
                                </button>
                            )}
                        </div>
                    </section>
                )
            }
            
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className=" hidden md:block absolute left-0 bottom-0 pointer-events-none">
                <path fill="#9999990D" fillOpacity="1" d="M0,96L80,122.7C160,149,320,203,480,229.3C640,256,800,256,960,229.3C1120,203,1280,149,1360,122.7L1440,96L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
            </svg>
        </main>
    )
}