import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';

import SideBar from '../components/SideBar';

import 'tailwindcss/tailwind.css';


export default function MyApp({ Component, pageProps }) {
    const router = useRouter()
    const currentPage = router.pathname === 'favorites' ? 'fav' : 'home'

    const [isDark, setIsDark] = useState(false)

    return (
        <div className={ isDark ? 'dark' : null }>
            <Head>
                <title>Weather Viewer</title>
                <link rel="icon" href="/WhiteIcon.png" />
            </Head>

            <section className="bg-gray-50 dark:bg-gray-800 dark:text-gray-300 min-h-screen flex w-screen">
                <SideBar page={currentPage} theme={{isDark, setIsDark}}/>

                <main className="min-h-5/6 sm:mb-10 flex-1">
                    <Component {...pageProps} />
                </main>
            </section>
        </div>
    )
}