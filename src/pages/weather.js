import Head from 'next/head';
import Link from 'next/link';

import MainDisplay from '../components/MainDisplay';
import WeekDisplay from '../components/WeekDisplay';

import "tailwindcss/tailwind.css";


export default function Weather() {
    return (
        <>
            <Head>
                <title>Weather Viewer - Detail</title>
                <link rel="icon" href="/WhiteIcon.png" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <Link href="/">
                <button className="bg-white w-10 p-2 m-1 border-2 border-gray-200 rounded hidden md:block">
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-arrow-90deg-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1.146 4.854a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H12.5A2.5 2.5 0 0 1 15 6.5v8a.5.5 0 0 1-1 0v-8A1.5 1.5 0 0 0 12.5 5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4z"/>
                    </svg>
                </button>
            </Link>

            <section className="bg-gray-50 min-h-screen flex justify-center items-center">

                <main className="w-full sm:mb-10 text-center">
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