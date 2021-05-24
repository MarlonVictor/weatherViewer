import Lottie from 'react-lottie';

import HomeAnimation from '../../public/HomeAnimated.json';
import ListAnimation from '../../public/ListAnimated.json';
import LoaderAnimation from '../../public/LoaderAnimated.json';

import { useEffect, useState } from 'react';

export default ({ animationName }) => {
    const [optionAnimation, setOptionAnimation] = useState({})

    const defaultOptions = {
        loop: true,
        autoplay: true,
    }

    useEffect(() => {
        if(animationName === 'Home') {
            setOptionAnimation({
                ...defaultOptions,
                animationData: HomeAnimation
            })
        } else if(animationName === 'Favorite') {
            setOptionAnimation({
                ...defaultOptions,
                animationData: ListAnimation
            })
        } else {
            setOptionAnimation({
                ...defaultOptions,
                animationData: LoaderAnimation
            })
        }
    }, [])

    return <Lottie options={optionAnimation} />
}