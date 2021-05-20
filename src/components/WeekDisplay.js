import imageUrlGenerator from '../utils/imageUrlGenerator';


export default function WeekDisplay({ data, tempValue, date }) {
    const minTemp = tempValue(data.temp.min)
    const maxTemp = tempValue(data.temp.max)
    
    return (
        <>
            <div className="hidden sm:flex flex-col items-center p-3 m-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-700">
                <h1 className="capitalize font-semibold tracking-wider text-gray-600 dark:text-gray-300">{date.substr(0, 3)}</h1>
                <img
                    className="w-14 py-3"
                    loading="lazy"
                    src={imageUrlGenerator(data.weather[0].icon)}
                />
                <p className="text-xs text-gray-400">Max {maxTemp.substr(0, minTemp.length - 1)} - Min {minTemp.substr(0, minTemp.length - 1)}</p>
            </div>

            <div className="w-64 flex sm:hidden items-center justify-between py-2 px-5 mt-2 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-700"> 
                <h1 className="capitalize font-semibold tracking-wider text-gray-600 dark:text-gray-300">{date.substr(0, 3)}</h1>
                <span>
                    <p className="text-xs text-gray-400">Max: {maxTemp.substr(0, minTemp.length - 1)}</p>
                    <p className="text-xs text-gray-400 mt-1">Min: {minTemp.substr(0, minTemp.length - 1)}</p>
                </span>

                <img
                    className="w-14"
                    loading="lazy"
                    src={imageUrlGenerator(data.weather[0].icon)}
                />
            </div>
        </>
    )
}