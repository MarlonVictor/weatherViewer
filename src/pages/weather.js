import { useContext, useEffect } from 'react';

import MainDisplay from '../components/MainDisplay';
import WeekDisplay from '../components/WeekDisplay';
import SearchInput from '../components/SearchInput';

import useApi from '../utils/useApi';
import { Context } from '../providers/GlobalProvider';


export default function Weather() {
    const { values } = useContext(Context)
    const locationName = values.location

    const [load, loadInfo] = useApi({
        url: `https://api.openweathermap.org/data/2.5/weather`,
        method: 'get',
        params: {
            q: locationName,
            lang: 'pt_br',
            APPID: '1a788676b927fd9d836e736fd6e92e25'
        }
    })

    useEffect(() => {
        load()
    }, [locationName])

    
    if(loadInfo.error) {
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

            {loadInfo.loading 
                ? <h2>Carregando</h2>
                : (
                    <>
                        <MainDisplay values={loadInfo.data} />

                        <p className="sm:invisible bg-white dark:bg-gray-700 w-full mt-8 mb-3 sm:mb-0 py-2 tracking-wide text-center text-gray-400 dark:text-gray-300">Previsão dos próximos 5 dias:</p>

                        <div className="flex flex-col sm:flex-row justify-center items-center">
                            <WeekDisplay week_day="Seg" />
                            <WeekDisplay week_day="Ter" />
                            <WeekDisplay week_day="Qua" />
                            <WeekDisplay week_day="Qui" />
                            <WeekDisplay week_day="Sex" is_last={true} />
                        </div>
                    </>
                )
            }
        </main>
    )
}