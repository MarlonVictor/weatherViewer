import imageUrlGenerator from '../utils/imageUrlGenerator';


export default function WeekDisplay({ data, tempValue, date }) {
    const minTemp = tempValue(data.temp.min)
    const maxTemp = tempValue(data.temp.max)
    
    return (
        <div className='flex sm:flex-col justify-center items-center w-full sm:w-auto font-sans text-center px-5 relative -top-3 border-gray-200 dark:border-gray-600'>
            <header>
                <h1 className="capitalize">{date.substr(0, 3)}</h1>

                <span className="text-gray-700 dark:text-gray-200 tracking-tight pr-10 sm:pr-0">
                    {minTemp.substr(0, minTemp.length - 1)}
                    <b className="font-normal text-gray-400">/{maxTemp.substr(0, minTemp.length - 1)}</b>
                </span>
            </header>

            <img
                className="w-20 pb-3 sm:pb-0"
                src={imageUrlGenerator(data.weather[0].icon)}
            />
        </div>
    )
}