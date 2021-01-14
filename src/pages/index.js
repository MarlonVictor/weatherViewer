import SearchInput from '../components/SearchInput';


export default function Home() {
    return (
        <div className="flex flex-col md:flex-col-reverse items-center justify-between h-full text-center">
            <section className="flex flex-col">
                <SearchInput />

                <div className="md:mt-10 xl:mt-20">
                    <small className="text-xs text-gray-400 dark:text-gray-200">Escolha uma Unidade de Medida:</small>
                    <div className="flex justify-center items-center space-x-1 mb-3 text-gray-500 dark:text-gray-300">
                        <button className="px-1 text-center text-sm border-2 border-gray-300 dark:border-gray-500 rounded bg-gray-300 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-800">Celcius</button>
                        <button className="px-1 text-center text-sm border-2 border-gray-300 dark:border-gray-500 rounded bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-800">Kelvin</button>
                        <button className="px-1 text-center text-sm border-2 border-gray-300 dark:border-gray-500 rounded bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-800">Fahrenheit</button>
                    </div>
                </div>
            </section>

            <h1 className="text-lg sm:text-2xl xl:text-3xl 2xl:text-4xl font-semibold text-gray-600 dark:text-gray-200 px-6 md:px-14 xl:px-28 my-5 sm:my-10 xl:my-16">Temos previsões meteorológicas locais e internacionais com a tecnologia de previsão do tempo mais precisa, apresentando relatórios meteorológicos atualizados.</h1>

            <img 
                src="/CityFooter.png" 
                alt="Footer" 
                className="w-full md:hidden"
            />
        </div>
    )
}