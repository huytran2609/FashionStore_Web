import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Generic custom hook for fetching data
 * Automatically fetches data on mount and when dependencies change
 * Use refetch() to manually trigger a fetch
 * @param {function} fetchFunction - Async function to fetch data
 * @param {object} options - Configuration options
 * @param {array} options.dependencies - Additional dependencies for useEffect
 * @param {function} options.onSuccess - Callback function on successful fetch
 * @param {function} options.onError - Callback function on error
 * @returns {object} - { data, loading, error, refetch }
 */
function useFetch(fetchFunction, options = {}) {
    const {
        dependencies = [],
        onSuccess,
        onError,
    } = options;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Use refs to store functions to avoid dependency issues
    const fetchFunctionRef = useRef(fetchFunction);
    const onSuccessRef = useRef(onSuccess);
    const onErrorRef = useRef(onError);
    
    useEffect(() => {
        fetchFunctionRef.current = fetchFunction;
        onSuccessRef.current = onSuccess;
        onErrorRef.current = onError;
    }, [fetchFunction, onSuccess, onError]);

    const fetchData = useCallback(async (...args) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetchFunctionRef.current(...args);
            
            if (response.success !== false) {
                setData(response);
                if (onSuccessRef.current) {
                    onSuccessRef.current(response);
                }
            } else {
                const errorMsg = response.mes || 'Failed to fetch data';
                setError(errorMsg);
                setData(null);
                if (onErrorRef.current) {
                    onErrorRef.current(errorMsg);
                }
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            const errorMsg = err.message || 'An error occurred while fetching data';
            setError(errorMsg);
            setData(null);
            if (onErrorRef.current) {
                onErrorRef.current(errorMsg);
            }
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch on mount
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    // Fetch when dependencies change
    useEffect(() => {
        if (dependencies.length > 0) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies);

    const refetch = useCallback((...args) => {
        return fetchData(...args);
    }, [fetchData]);

    return {
        data,
        loading,
        error,
        refetch,
    };
}

export default useFetch;

