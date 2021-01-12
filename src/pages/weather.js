import MainDisplay from '../components/MainDisplay';
import WeekDisplay from '../components/WeekDisplay';
import SearchInput from '../components/SearchInput';

export default function Weather() {
    return (
        <>
            <SearchInput />
            <MainDisplay />

            <p className="sm:invisible bg-white dark:bg-gray-700 w-full mt-8 mb-3 sm:mb-0 py-2 tracking-wide text-center text-gray-400 dark:text-gray-300">Previsão dos próximos 5 dias:</p>

            <div className="flex flex-col sm:flex-row justify-center items-center">
                <WeekDisplay week_day="Seg" />
                <WeekDisplay week_day="Ter" />
                <WeekDisplay week_day="Qua" />
                <WeekDisplay week_day="Qui" />
                <WeekDisplay week_day="Sex" is_last={true} />
            </div>
        </>
    )
}