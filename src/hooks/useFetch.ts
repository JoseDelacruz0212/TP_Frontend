import {useEffect, useState} from "react";

const useFetch = <T>(getData: () => Promise<T>) => {
    const [data, setData] = useState<T | undefined>();
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getData()
            .then(data => {
                console.log(data);
                setIsLoading(false);
                setData(data);
            })
            .catch(() => {
                setIsLoading(false);
                setHasError(true);
            });
    }, [getData]);

    return { data, isLoading, hasError };
};

export default useFetch;
