import { useContext, useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';

import MainDisplay from '../components/MainDisplay';
import WeekDisplay from '../components/WeekDisplay';
import SearchInput from '../components/SearchInput';

import useApi from '../utils/useApi';
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
                <h1>Ocorreu um erro!</h1>
            </>
        )
    }

    return (
        <main> 
            <SearchInput />

            {mainInfo.loading 
                ? <h2>Carregando</h2>
                : (
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
                            ) : <button onClick={() => fetchWeekInfos()} className="bg-gray-500">Veja a previsão dos próximos 5 dias</button>}
                        </div>
                    </>
                )
            }
        </main>
    )
}