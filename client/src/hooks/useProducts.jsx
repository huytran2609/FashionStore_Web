import { useState, useEffect, useCallback, useRef } from 'react';
import { getAllProducts } from '~/apis/products';

/**
 * Custom hook for fetching products
 * Automatically fetches products on mount and when dependencies change
 * Use refetch() to manually trigger a fetch
 * @param {object} options - Configuration options
 * @param {object} options.defaultParams - Default query parameters
 * @param {number} options.limit - Number of products per page (default: 20)
 * @param {array} options.dependencies - Additional dependencies for useEffect
 * @returns {object} - { products, count, loading, error, refetch }
 */
function useProducts(options = {}) {
    const {
        defaultParams = {},
        limit = 20,
        dependencies = [],
    } = options;

    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Use ref to store defaultParams to avoid dependency issues
    const defaultParamsRef = useRef(defaultParams);
    const prevParamsStringRef = useRef('');
    const prevDepsStringRef = useRef('');
    const isFirstMountRef = useRef(true);
    
    useEffect(() => {
        defaultParamsRef.current = defaultParams;
    }, [defaultParams]);
    
    const fetchProducts = useCallback(async (params = {}) => {
        setLoading(true);
        setError(null);
        try {
            const queryParams = { ...defaultParamsRef.current, ...params, limit };
            const response = await getAllProducts(queryParams);
            
            if (response.success) {
                setProducts(response.products || []);
                setCount(response.counts || 0);
            } else {
                setError(response.mes || 'Failed to fetch products');
                setProducts([]);
                setCount(0);
            }
        } catch (err) {
            console.error('Error fetching products:', err);
            setError(err.message || 'An error occurred while fetching products');
            setProducts([]);
            setCount(0);
        } finally {
            setLoading(false);
        }
    }, [limit]);

    // Single useEffect to handle all fetch triggers - prevents infinite loops
    // Compare stringified values to detect actual changes (by value, not reference)
    useEffect(() => {
        const currentParamsString = JSON.stringify(defaultParams);
        const currentDepsString = JSON.stringify(dependencies);
        
        // Only fetch if:
        // 1. First mount, OR
        // 2. defaultParams actually changed (by value, not reference), OR
        // 3. dependencies actually changed
        const paramsChanged = currentParamsString !== prevParamsStringRef.current;
        const depsChanged = currentDepsString !== prevDepsStringRef.current;
        const shouldFetch = isFirstMountRef.current || paramsChanged || depsChanged;
        
        if (shouldFetch) {
            prevParamsStringRef.current = currentParamsString;
            prevDepsStringRef.current = currentDepsString;
            isFirstMountRef.current = false;
            fetchProducts();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultParams, dependencies]);

    const refetch = useCallback((params) => {
        return fetchProducts(params);
    }, [fetchProducts]);

    return {
        products,
        count,
        loading,
        error,
        refetch,
    };
}

export default useProducts;

