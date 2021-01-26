import imageUrlGenerator from '../utils/imageUrlGenerator';


export default function MainDisplay({ data, tempValue, date }) {
    return (
        <div className="flex flex-col items-center font-sans text-center">
            {data && (
                    <>
                        <h1 className="text-2xl font-semibold sm:font-base sm:text-4xl pb-1">{data.name}, {data.sys.country}</h1>
                        <small>{date}</small>

                        <main className="flex pt-3 justify-center items-center">
                            <div>
                                <h2 className="tracking-tighter text-5xl sm:text-7xl font-bold text-gray-800 dark:text-gray-200">{tempValue(data.main.temp)}</h2>
                                <p className="sm:text-lg tracking-wide text-gray-400 pb-3">{data.weather[0].description}</p>
                            </div>
                            <img
                                className="w-28 sm:w-36 ml-7 py-2"
                                src={imageUrlGenerator(data.weather[0].icon)}
                            />
                        </main>

                        <footer className="flex font-medium text-gray-500 dark:text-gray-400 space-x-6">
                            <small>Sensação: {tempValue(data.main.feels_like)}</small>
                            <small>Vento: {data.wind.speed}m/s</small>
                            <small>Humidade: {data.main.humidity}%</small>
                        </footer>
                    </>
                )
            }
        </div>
    )
}