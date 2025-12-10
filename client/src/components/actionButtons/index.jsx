import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Reusable ActionButtons component for admin tables
 * @param {boolean} isEditMode - Whether in edit mode
 * @param {function} onEdit - Callback when Edit button is clicked
 * @param {function} onDelete - Callback when Delete button is clicked
 * @param {function} onUpdate - Callback when Update button is clicked (only shown in edit mode)
 * @param {function} onCancel - Callback when Back/Cancel button is clicked (only shown in edit mode)
 * @param {string} editLabel - Label for edit button (default: 'Edit')
 * @param {string} deleteLabel - Label for delete button (default: 'Delete')
 * @param {string} updateLabel - Label for update button (default: 'Update')
 * @param {string} cancelLabel - Label for cancel button (default: 'Back')
 * @param {boolean} showDelete - Whether to show delete button (default: true)
 * @param {string} className - Additional CSS classes
 */
export default function ActionButtons({
    isEditMode,
    onEdit,
    onDelete,
    onUpdate,
    onCancel,
    editLabel = 'Edit',
    deleteLabel = 'Delete',
    updateLabel = 'Update',
    cancelLabel = 'Back',
    showDelete = true,
    className = '',
}) {
    if (isEditMode) {
        return (
            <div className={classNames('flex gap-1', className)}>
                {onUpdate && (
                    <button
                        type="submit"
                        className="rounded-md border border-blue-600 text-blue-600 text-[0.75rem] w-13 p-1 mr-1 hover:bg-blue-500 hover:text-white"
                    >
                        {updateLabel}
                    </button>
                )}
                {onCancel && (
                    <span
                        onClick={onCancel}
                        className="rounded-md border bg-blue-100 border-blue-600 text-blue-600 text-[0.75rem] w-12 p-1 mr-1 hover:bg-blue-500 hover:text-white cursor-pointer"
                    >
                        {cancelLabel}
                    </span>
                )}
            </div>
        );
    }

    return (
        <div className={classNames('flex gap-1', className)}>
            {onEdit && (
                <span
                    onClick={onEdit}
                    className="rounded-md border border-blue-600 text-blue-600 text-[0.75rem] w-12 p-1 mr-1 hover:bg-blue-500 hover:text-white cursor-pointer"
                >
                    {editLabel}
                </span>
            )}
            {showDelete && onDelete && (
                <span
                    onClick={onDelete}
                    className="bg-red-600 rounded-md border border-red-600 text-white text-[0.75rem] w-12 p-1 hover:bg-red-700 hover:text-white cursor-pointer"
                >
                    {deleteLabel}
                </span>
            )}
        </div>
    );
}

ActionButtons.propTypes = {
    isEditMode: PropTypes.bool.isRequired,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onUpdate: PropTypes.func,
    onCancel: PropTypes.func,
    editLabel: PropTypes.string,
    deleteLabel: PropTypes.string,
    updateLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    showDelete: PropTypes.bool,
    className: PropTypes.string,
};

