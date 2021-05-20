import Link from 'next/link';
import { useContext } from 'react';

import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { AiOutlineHome, AiOutlineStar, AiOutlineGithub, AiFillLinkedin } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';

import { Context } from '../providers/GlobalProvider';
import SearchInput from './SearchInput';


export default function SideBar({ page, theme }) {
    const currentPage = current => page === current ? 'bg-gray-300 dark:bg-gray-900' : null
    const { values, setValues } = useContext(Context)

    const itsOpen = values.openMenu
    const closeMenu = () => setValues.setOpenMenu(false)

    const contentClick = e => e.stopPropagation()
    
    const asideClass = itsOpen 
        ? 'z-20 flex flex-col justify-between w-full max-w-xs min-h-screen bg-white dark:bg-gray-800 p-3 shadow-lg absolute' 
        : 'z-20 hidden md:flex flex-col justify-between w-80 min-h-screen bg-white dark:bg-gray-800 p-3 shadow-lg'
    

    return (
        <>
            <div className={`${itsOpen ? 'absolute' : 'hidden'} w-screen h-full bg-black bg-opacity-75 z-10`} onClick={() => closeMenu()} />
            <aside className={asideClass} onClick={contentClick}> 
                <main>
                    <header className="flex items-center space-x-4 py-2 px-2 mb-5">
                        <img 
                            className="h-12" 
                            src={theme.isDark ? '/WhiteIcon.png' : '/BlackIcon.png'} 
                            alt="Logo" 
                        />
                        <h1 className="flex-1 font-semibold text-lg text-gray-700 dark:text-gray-200 capitalize font-poppins">Weather Viewer</h1>
                        <button className="sm:hidden pr-2" onClick={closeMenu}>
                            <IoMdClose className="text-gray-600 dark:text-gray-200" size="25" />
                        </button>
                    </header>

                    <nav className="space-y-2 text-sm">
                        <SearchInput screen="sidebar" />
                        <Link href="/">
                            <a onClick={closeMenu} className={`flex items-center space-x-3 text-gray-700 dark:text-gray-300 p-2 rounded-md font-medium hover:bg-gray-300 dark:hover:bg-gray-900 focus:shadow-outline ${currentPage('home')}`}>
                                <AiOutlineHome className="text-gray-600 dark:text-gray-200" size="25" />
                                <span>Inicio</span>
                            </a>
                        </Link>
                        <Link href="/favorites">
                            <a onClick={closeMenu} className={`flex items-center space-x-3 text-gray-700 dark:text-gray-300 p-2 rounded-md font-medium hover:bg-gray-300 dark:hover:bg-gray-900 focus:shadow-outline ${currentPage('fav')}`}>
                                <AiOutlineStar className="text-gray-600 dark:text-gray-200" size="25" />
                                <span>Favoritos</span>
                            </a>
                        </Link>
                    </nav>
                </main>

                <footer className="w-full flex justify-center items-center text-center">
                    <section className="border-r-4 border-gray-400 pr-5">
                        <small className="text-xs text-gray-400 dark:text-gray-200">Social</small>
                        <div className="flex justify-center items-center space-x-2">
                            <a href="https://github.com/MarlonVictor" target="_blank">
                                <AiOutlineGithub size="23" />
                            </a>
                            <a href="https://www.linkedin.com/in/marlon-victor-2548b51a2" target="_blank">
                                <AiFillLinkedin size="23" />
                            </a>
                        </div>
                    </section>

                    <section className="text-center pl-5">
                        <DarkModeSwitch
                            checked={theme.isDark}
                            onChange={theme.setIsDark}
                            size={35}
                        />
                    </section>
                </footer>
            </aside>
        </>
    )
}