import { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

/**
 * Custom hook for managing edit mode state in admin tables
 * @param {function} setValue - React Hook Form setValue function
 * @param {object} defaultValues - Default values for form fields
 * @returns {object} - { editItem, setEditItem, isEditMode, handleEdit, handleCancel, formMethods }
 */
export default function useEditMode(setValue, defaultValues = {}) {
    const [editItem, setEditItem] = useState(null);
    const formMethods = useForm(defaultValues);

    const isEditMode = !!editItem;

    useEffect(() => {
        if (editItem && setValue) {
            // Update form values when editItem changes
            Object.keys(defaultValues).forEach((key) => {
                if (editItem[key] !== undefined) {
                    setValue(key, editItem[key]);
                }
            });
        }
    }, [editItem, setValue, defaultValues]);

    const handleEdit = useCallback((item) => {
        setEditItem(item);
    }, []);

    const handleCancel = useCallback(() => {
        setEditItem(null);
        formMethods.reset();
    }, [formMethods]);

    return {
        editItem,
        setEditItem,
        isEditMode,
        handleEdit,
        handleCancel,
        formMethods,
    };
}

