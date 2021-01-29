import { useState } from 'react';
import axios from 'axios';


const initialInfo = {
    error: null,
    data: null,
    loading: null
}

export default function useApi(config) {
    const [requestInfo , setRequestInfo] = useState(initialInfo)

    async function call() {
        setRequestInfo({
            ...initialInfo,
            loading: true
        })

        try {
            const response = await axios(config)
    
            setRequestInfo({
                ...initialInfo,
                data: response.data
            })
        } catch(error) {
            setRequestInfo({
                ...initialInfo,
                error
            })
        }
    }

    return [
        call,
        requestInfo
    ]
}