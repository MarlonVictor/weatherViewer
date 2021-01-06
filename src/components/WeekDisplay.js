export default function WeekDisplay({ week_day, is_last }) {
    return (
        <div className={`flex sm:flex-col justify-center items-center w-full sm:w-auto font-sans text-center px-5 relative -top-3 ${is_last ? null : 'border-b-4 sm:border-b-0 sm:border-r-4'} border-gray-200`}>
            <header>
                <h1>{week_day}</h1>

                <span className="text-gray-700 tracking-tight pr-10 sm:pr-0">
                    24º
                    <b className="font-normal text-gray-400">/14º</b>
                </span>
            </header>

            <img
                className="w-20 pb-3 sm:pb-0"
                src="https://www.flaticon.com/svg/static/icons/svg/578/578116.svg" 
            />
        </div>
    )
}