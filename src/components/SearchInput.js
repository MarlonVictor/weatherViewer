import { BiMenu, BiSearchAlt } from 'react-icons/bi';

export default function SearchInput() {
    return (
        <div className="flex items-center relative bottom-1 w-full md:max-w-md mb-7 md:mt-6 mx-auto text-lg bg-transparent text-gray-700 border-b-4 border-gray-200">
            <button 
                className="md:hidden bg-gray-200 relative -bottom-0.5 p-3"
            >
                <BiMenu size="26px" />
            </button>

            <input
                type="text"
                className="relative -bottom-1 md:-bottom-0 bg-transparent border-none w-full mr-3 px-2 mb-1 leading-tight focus:outline-none text-sm sm:text-base"
                placeholder="Busque por Cidade, Estado ou País..." 
            />
            
            <button 
                type="submit" 
                className="relative right-3 md:right-1 top-0.5 md:top-0 md:mb-1"
            >
                <BiSearchAlt size="26px" />
            </button>
        </div>
    )
}