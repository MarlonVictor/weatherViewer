import Link from 'next/link';
import { DarkModeSwitch } from 'react-toggle-dark-mode';

import { AiOutlineHome, AiOutlineStar, AiOutlineGithub, AiFillLinkedin } from 'react-icons/ai';


export default function SideBar({ page }) {
    const currentPage = current => page === current ? 'bg-gray-300' : null

    return (
        <aside className="hidden md:flex flex-col justify-between w-60 min-h-screen bg-white rounded p-3 shadow-lg">
            <main>
                <header className="flex items-center space-x-2 lg:space-x-4 py-2 lg:px-2 mb-5">
                    <img 
                        className="h-12" 
                        src="/BlackIcon.png" 
                        alt="Logo" 
                    />
                    <h1 className="font-semibold lg:text-lg text-gray-700 capitalize font-poppins">Weather Viewer</h1>
                </header>
                <nav className="space-y-2 text-sm">
                    <Link href="/">
                        <a className={`flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-300 focus:shadow-outline ${currentPage('home')}`}>
                            <AiOutlineHome className="text-gray-600" size="25" />
                            <span>Inicio</span>
                        </a>
                    </Link>
                    <Link href="/favorites">
                        <a className={`flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-300 focus:shadow-outline ${currentPage('fav')}`}>
                            <AiOutlineStar className="text-gray-600" size="25" />
                            <span>Favoritos</span>
                        </a>
                    </Link>
                </nav>
            </main>

            <footer className="w-full flex justify-center items-center text-center">
                <section className="border-r-4 border-gray-400 pr-5">
                    <small className="text-xs text-gray-400">Social</small>
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
                        // checked={state}
                        // onChange={() => toggle function}
                        size={35}
                    />
                </section>
            </footer>
        </aside>
    )
}