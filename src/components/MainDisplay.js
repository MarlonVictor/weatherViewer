import moment from 'moment';

export default function MainDisplay() {
    moment.locale('pt_br')
    const dia = moment().format('LL') // DD de MM de YY

    return (
        <div className="flex flex-col items-center font-sans text-center">
            <h1 className="text-2xl font-semibold sm:font-base sm:text-4xl pb-1">Rio de Janeiro, RJ</h1>
            <small>{dia}</small>

            <main className="flex pt-3 justify-center items-center">
                <div>
                    <h2 className="tracking-tighter text-4xl sm:text-7xl font-bold text-gray-800">23ºC</h2>
                    <p className="sm:text-lg tracking-wide text-gray-400 pb-3">Nublado</p>
                </div>
                <img
                    className="w-28 sm:w-40 ml-7"
                    src="https://www.flaticon.com/svg/static/icons/svg/578/578116.svg" 
                />
            </main>

            <footer className="flex font-medium text-gray-500 space-x-6">
                <small>Sensação: 21ºC</small>
                <small>Vento: 250m/s</small>
                <small>Humidade: 80%</small>
            </footer>
        </div>
    )
}