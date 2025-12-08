import { useState, useEffect, useCallback } from 'react';
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

    const fetchProducts = useCallback(async (params = {}) => {
        setLoading(true);
        setError(null);
        try {
            const queryParams = { ...defaultParams, ...params, limit };
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
    }, [defaultParams, limit]);

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchProducts, ...dependencies]);

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

