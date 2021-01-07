import Head from 'next/head';

import MainDisplay from '../components/MainDisplay';
import WeekDisplay from '../components/WeekDisplay';
import SearchInput from '../components/SearchInput';

import "tailwindcss/tailwind.css";


export default function Weather() {
    return (
        <>
            <Head>
                <title>Weather Viewer - Detail</title>
                <link rel="icon" href="/WhiteIcon.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <section className="bg-gray-50 min-h-screen flex justify-center items-center">
                <main className="w-full sm:mb-10 text-center">
                    <SearchInput />

                    <MainDisplay />

                    <p className="sm:invisible bg-white w-full mt-8 mb-3 sm:mb-0 py-2 tracking-wide text-center text-gray-400">Previsão dos próximos 5 dias:</p>

                    <div className="flex flex-col sm:flex-row justify-center items-center">
                        <WeekDisplay week_day="Seg" />
                        <WeekDisplay week_day="Ter" />
                        <WeekDisplay week_day="Qua" />
                        <WeekDisplay week_day="Qui" />
                        <WeekDisplay week_day="Sex" is_last={true}/>
                    </div>
                </main>
            </section>
        </>
    )
}