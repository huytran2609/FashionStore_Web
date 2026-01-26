import { useState, useEffect, useRef } from 'react';
import categoryApi from '~/apis/categoryAPI/categoryApi';

/**
 * Custom hook for fetching categories
 * Automatically fetches categories on mount
 * Use refetch() to manually trigger a fetch
 * @param {object} options - Configuration options
 * @param {array} options.categories_emoji - Optional emoji array to merge with categories
 * @returns {object} - { categories, loading, error, refetch }
 */
function useCategories(options = {}) {
    const {
        categories_emoji = [],
    } = options;

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Use ref to store categories_emoji to avoid dependency issues
    const categoriesEmojiRef = useRef(categories_emoji);
    useEffect(() => {
        categoriesEmojiRef.current = categories_emoji;
    }, [categories_emoji]);

    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await categoryApi.getAll();
            if (response.dataCategories) {
                let merged = response.dataCategories;
                
                // Merge with emoji if provided
                if (categoriesEmojiRef.current.length > 0) {
                    merged = response.dataCategories.map((category, index) => ({
                        ...category,
                        ...categoriesEmojiRef.current[index % categoriesEmojiRef.current.length],
                    }));
                }
                
                setCategories(merged);
            } else {
                setError('Failed to fetch categories');
                setCategories([]);
            }
        } catch (err) {
            console.error('Error fetching categories:', err);
            setError(err.message || 'An error occurred while fetching categories');
            setCategories([]);
        } finally {
            setLoading(false);
        }
    };

    // Fetch on mount only
    useEffect(() => {
        fetchCategories();
    }, []);

    const refetch = () => {
        return fetchCategories();
    };

    return {
        categories,
        loading,
        error,
        refetch,
    };
}

export default useCategories;

