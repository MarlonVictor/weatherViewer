import Head from 'next/head';
import { useRouter } from 'next/router'

import SideBar from '../components/SideBar';

import 'tailwindcss/tailwind.css';


function MyApp({ Component, pageProps }) {
    const router = useRouter()
    const currentPage = router.pathname === 'favorites' ? 'fav' : 'home'

    const isDark = false

    return (
        <div className={ isDark ? 'dark' : null }>
            <Head>
                <title>Weather Viewer</title>
                <link rel="icon" href="/WhiteIcon.png" />
            </Head>

            <section className="bg-gray-50 dark:bg-gray-800 dark:text-gray-300 min-h-screen flex w-screen">
                <SideBar page={currentPage} />

                <main className="min-h-scren sm:mb-10 flex-1">
                    <Component {...pageProps} />
                </main>
            </section>
        </div>
    )
}
  
export default MyApp;