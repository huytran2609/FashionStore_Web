import { useState, useMemo, useCallback } from 'react';

/**
 * Custom hook for filtering and searching products
 * @param {array} products - Array of products to filter
 * @param {object} options - Configuration options
 * @param {array} options.searchFields - Fields to search in (default: ['title'])
 * @param {array} options.filterFields - Fields that can be filtered (default: ['category', 'color', 'company', 'newPrice', 'title'])
 * @returns {object} - { filteredProducts, query, setQuery, selectedFilter, setSelectedFilter, handleInputChange, handleFilterChange, clearFilters }
 */
function useProductFilter(products = [], options = {}) {
    const {
        searchFields = ['title'],
        filterFields = ['category', 'color', 'company', 'newPrice', 'title'],
    } = options;

    const [query, setQuery] = useState('');
    const [selectedFilter, setSelectedFilter] = useState(null);

    // Handle input change for search
    const handleInputChange = useCallback((event) => {
        setQuery(event.target.value);
    }, []);

    // Handle filter change (for radio buttons, dropdowns, etc.)
    const handleFilterChange = useCallback((value) => {
        setSelectedFilter(value);
    }, []);

    // Clear all filters
    const clearFilters = useCallback(() => {
        setQuery('');
        setSelectedFilter(null);
    }, []);

    // Filter products based on query and selected filter
    const filteredProducts = useMemo(() => {
        let filtered = products;

        // Apply search query
        if (query) {
            const lowerQuery = query.toLowerCase();
            filtered = filtered.filter((product) => {
                return searchFields.some((field) => {
                    const value = product[field];
                    if (value === null || value === undefined) return false;
                    return String(value).toLowerCase().includes(lowerQuery);
                });
            });
        }

        // Apply selected filter (only if not empty string)
        if (selectedFilter && selectedFilter !== '') {
            filtered = filtered.filter((product) => {
                return filterFields.some((field) => {
                    const value = product[field];
                    if (value === null || value === undefined) return false;
                    // Case-insensitive comparison for category field
                    if (field === 'category') {
                        return String(value).toLowerCase() === String(selectedFilter).toLowerCase();
                    }
                    return value === selectedFilter || String(value) === String(selectedFilter);
                });
            });
        }

        return filtered;
    }, [products, query, selectedFilter, searchFields, filterFields]);

    return {
        filteredProducts,
        query,
        setQuery,
        selectedFilter,
        setSelectedFilter,
        handleInputChange,
        handleFilterChange,
        clearFilters,
    };
}

export default useProductFilter;

