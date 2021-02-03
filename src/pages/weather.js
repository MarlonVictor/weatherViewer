import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';

import Loader from '../components/LoaderAnimation';
import MainDisplay from '../components/MainDisplay';
import WeekDisplay from '../components/WeekDisplay';
import SearchInput from '../components/SearchInput';

import useApi from '../hooks/useApi';
import { Context } from '../providers/GlobalProvider';


export default function Weather() {
    const { values } = useContext(Context)
    const [weekInfo, setWeekInfo] = useState('')

    moment.locale('pt_br')
    const day = moment().format('LL') // DD de MM de YY

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
                <SearchInput />
                
                <img 
                    alt="ERROR" 
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
        <main> 
            <SearchInput />

            {mainInfo.loading 
                ? (
                    <div className="h-40 cursor-default">
                        <Loader/>
                    </div>

                ) : (
                    <>
                        <MainDisplay data={mainInfo.data} tempValue={tempConverter} date={day} />

                        <div className="flex flex-col sm:flex-row justify-center items-center sm:mt-16">
                            {weekInfo ? (
                                <>
                                    <p className="sm:hidden bg-white dark:bg-gray-700 w-full mt-8 mb-5 sm:mb-0 py-2 tracking-wide text-center text-gray-400 dark:text-gray-300 relative bottom-2">Previsão dos próximos 5 dias:</p>

                                    {weekInfo.map((res, key) => {
                                        const day = moment().add(key + 1, 'd').format('dddd')

                                        return <WeekDisplay 
                                            data={res} 
                                            key={key} 
                                            tempValue={tempConverter}
                                            date={day}
                                        />
                                    }).slice(0, 5)}
                                </>
                            ) : (
                                <button
                                    onClick={() => fetchWeekInfos()}
                                    className="mt-7 sm:mt-0 py-2 px-3 sm:px-6 rounded shadow-lg bg-white dark:bg-gray-700 border-b-2 border-gray-400 transition hover:bg-gray-200 dark:hover:bg-gray-600"
                                >
                                    <span className="mx-auto text-sm text-gray-800 dark:text-gray-300 font-bold sm:tracking-wide">Veja a previsão dos próximos dias</span>
                                </button>
                            )}
                        </div>
                    </>
                )
            }
        </main>
    )
}