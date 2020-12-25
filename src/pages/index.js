import Head from 'next/head';
import Image from 'next/image';
import { useState } from 'react';

import "tailwindcss/tailwind.css";


export default function Home() {
    const [darkMode, setDarkMode] = useState(false)

    return (
        <div className={darkMode ? 'dark' : null}>
            <Head>
                <title>Weather Viewer</title>
                <link rel="icon" href="/WhiteIcon.png" />
            </Head>

            <main className="bg-gray-50 dark:bg-gray-500 h-screen flex items-center justify-around">
                <h1 className="text-3xl font-serif text-gray-600 dark:text-gray-100">weatherViewer</h1>

                <Image
                    src={darkMode ? '/WhiteIcon.png' : '/BlackIcon.png'}
                    alt="Picture of the author"
                    width={200}
                    height={200}
                />

                <button 
                    className="bg-gray-600 dark:bg-gray-200 text-gray-200 dark:text-gray-600 rounded-lg p-4" 
                    onClick={() => setDarkMode(!darkMode)}
                >
                    Change
                </button>
            </main>
        </div>
    )
}