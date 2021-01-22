export default function useImageUrl(icon) {
    const imgUrl = code => `https://www.flaticon.com/svg/static/icons/svg/578/5781${code}.svg`

    if(icon === '01d') return imgUrl('53') 
    else if(icon === '01n') return imgUrl('26')
    else if(icon === '02d') return imgUrl('16')
    else if(icon === '02n') return imgUrl('17')
    else if(icon === '10d') return imgUrl('33')
    else if(icon === '10n') return imgUrl('34')
    else if(icon === '03d' || icon === '03n') return imgUrl('15')
    else if(icon === '04d' || icon === '04n') return imgUrl('18')
    else if(icon === '09d' || icon === '09n') return imgUrl('32')
    else if(icon === '11d' || icon === '11n') return imgUrl('50')
    else if(icon === '13d' || icon === '13n') return imgUrl('43')
    else if(icon === '50d' || icon === '50n') return imgUrl('21')
    else return 'https://www.flaticon.com/svg/static/icons/svg/578/578116.svg'
}