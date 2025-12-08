import Swal from 'sweetalert2';

/**
 * Show confirmation dialog using SweetAlert2
 * @param {object} options - Configuration options
 * @param {string} options.title - Dialog title (default: 'Are you sure?')
 * @param {string} options.text - Dialog text (default: "You won't be able to revert this!")
 * @param {string} options.confirmButtonText - Confirm button text (default: 'Yes')
 * @param {string} options.cancelButtonText - Cancel button text (default: 'Cancel')
 * @param {string} options.icon - Icon type (default: 'warning')
 * @returns {Promise} - Promise that resolves to result object
 */
export const showConfirmDialog = (options = {}) => {
    const {
        title = 'Are you sure?',
        text = "You won't be able to revert this!",
        confirmButtonText = 'Yes',
        cancelButtonText = 'Cancel',
        icon = 'warning',
    } = options;

    return Swal.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonText,
        cancelButtonText,
    });
};

/**
 * Show confirmation dialog and execute callback on confirm
 * @param {function} onConfirm - Function to execute on confirm
 * @param {object} options - Configuration options (same as showConfirmDialog)
 * @returns {Promise} - Promise that resolves when dialog is closed
 */
export const confirmAndExecute = async (onConfirm, options = {}) => {
    const result = await showConfirmDialog(options);
    if (result.isConfirmed) {
        return onConfirm();
    }
    return null;
};

