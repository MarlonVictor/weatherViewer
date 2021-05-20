import Lottie from 'react-lottie';

import animationData from '../../public/HomeAnimated.json';

export default () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData
    }

    return <Lottie options={defaultOptions} />
}