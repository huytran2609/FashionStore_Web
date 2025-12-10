import { useCallback } from 'react';
import { confirmAndExecute } from '~/utils/confirmDialog';
import { toast } from 'react-toastify';

/**
 * Custom hook for handling delete operations with confirmation dialog
 * @param {function} deleteFn - Async function that performs the delete operation
 * @param {function} onSuccess - Optional callback on successful delete
 * @param {function} onError - Optional callback on error
 * @param {object} confirmOptions - Options for confirmation dialog
 * @returns {function} - handleDelete function that takes the item id
 */
export default function useConfirmDelete(deleteFn, { onSuccess, onError, confirmOptions } = {}) {
    const handleDelete = useCallback(
        async (id) => {
            await confirmAndExecute(
                async () => {
                    try {
                        const response = await deleteFn(id);
                        if (response?.success) {
                            toast.success(response.mes || 'Deleted successfully');
                            onSuccess?.(response);
                        } else {
                            toast.error(response?.mes || 'Failed to delete');
                            onError?.(response);
                        }
                        return response;
                    } catch (error) {
                        toast.error('An error occurred while deleting');
                        onError?.(error);
                        throw error;
                    }
                },
                {
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    ...confirmOptions,
                },
            );
        },
        [deleteFn, onSuccess, onError, confirmOptions],
    );

    return handleDelete;
}

