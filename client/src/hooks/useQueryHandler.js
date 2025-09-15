import { noop, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

const useQueryHandler = ({ queryKey = [], queryFn = noop, errorCb = noop, successCb = noop, ...config }) => {
    const { isError, isLoading, data, error, isSuccess, ...rest } = useQuery({ queryKey, queryFn, ...config });

    useEffect(() => {
        if (isSuccess) successCb(data);
    }, [isSuccess, data]);
    

    useEffect(() => {
        if (isError) errorCb(error);
    }, [isError, error]);

    return { isError, isSuccess, data, error, isLoading, ...rest }

}

export default useQueryHandler;