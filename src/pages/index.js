import { useContext } from 'react';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { motion } from 'framer-motion';

import ScaleSelector from '../components/ScaleSelector';
import SearchInput from '../components/SearchInput';

import { Context } from '../providers/GlobalProvider';
import Lottie from '../utils/lottieAnimation';


export default function Home() {
    const { values, setValues } = useContext(Context)

    // Aside button
    const itsOpen = values.openMenu
    const toggleScale = () => setValues.setOpenMenu(!itsOpen)

    return (
        <>
            <header className="md:hidden flex justify-between">
                <button onClick={toggleScale} className="m-2 p-2 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-800">
                    <AiOutlineMenuUnfold size="25" />
                </button>

                <SearchInput />
            </header>

            <main className="flex flex-col md:flex-col-reverse items-center justify-center mt-5 md:mt-24 lg:mt-30">
                <motion.header 
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: [0, 1], y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="bg-blue-400 rounded-xl md:mt-20"
                >
                    <div className="w-40 px-3 mx-auto mt-3">
                        <Lottie animationName="Home" />
                    </div>
                    <div className="flex w-full bg-gray-100 dark:bg-gray-700">
                        <ScaleSelector name="Celsius" />
                        <ScaleSelector name="Fahrenheit" />
                        <ScaleSelector name="Kelvin" />
                    </div>
                </motion.header>

                <motion.h1 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: [0, 1], y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="font-semibold tracking-wide text-center text-gray-700 dark:text-gray-300 text-lg sm:text-2xl lg:text-3xl mt-10 sm:mt-20 md:-mt-5 px-5"
                >
                    Temos previsões meteorológicas locais e internacionais com a tecnologia de previsão do tempo mais precisa, apresentando relatórios meteorológicos atualizados.
                </motion.h1>

            </main>

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className=" hidden md:block absolute left-0 bottom-0 pointer-events-none">
                <path fill="#9999990D" fillOpacity="1" d="M0,224L40,229.3C80,235,160,245,240,245.3C320,245,400,235,480,245.3C560,256,640,288,720,282.7C800,277,880,235,960,234.7C1040,235,1120,277,1200,288C1280,299,1360,277,1400,266.7L1440,256L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
            </svg>
        </>
    )
}