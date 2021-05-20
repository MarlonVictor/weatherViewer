import Lottie from 'react-lottie';

import animationData from '../../public/ListAnimated.json';

export default () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData
    }

    return <Lottie options={defaultOptions} />
}