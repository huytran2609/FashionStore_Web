import { useState, useEffect, useCallback } from 'react';

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

    const fetchData = useCallback(async (...args) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetchFunction(...args);
            
            if (response.success !== false) {
                setData(response);
                if (onSuccess) {
                    onSuccess(response);
                }
            } else {
                const errorMsg = response.mes || 'Failed to fetch data';
                setError(errorMsg);
                setData(null);
                if (onError) {
                    onError(errorMsg);
                }
            }
        } catch (err) {
            console.error('Error fetching data:', err);
            const errorMsg = err.message || 'An error occurred while fetching data';
            setError(errorMsg);
            setData(null);
            if (onError) {
                onError(errorMsg);
            }
        } finally {
            setLoading(false);
        }
    }, [fetchFunction, onSuccess, onError]);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchData, ...dependencies]);

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

