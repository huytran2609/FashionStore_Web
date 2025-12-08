import PropTypes from 'prop-types';
import Loading from '~/components/loading';
import EmptyState from '~/components/emptyState';

/**
 * Reusable DataTable component for admin pages
 * @param {array} columns - Array of column definitions { key, label, render }
 * @param {array} data - Array of data objects
 * @param {boolean} loading - Loading state
 * @param {string} emptyMessage - Message when no data
 * @param {function} renderRowActions - Function to render action buttons for each row
 * @param {string} className - Additional CSS classes
 */
export default function DataTable({ 
    columns, 
    data = [], 
    loading = false,
    emptyMessage = 'No data available',
    renderRowActions,
    className = ''
}) {
    if (loading) {
        return <Loading message="Loading data..." />;
    }

    if (!data || data.length === 0) {
        return <EmptyState message={emptyMessage} />;
    }

    return (
        <div className={`w-full mt-3 rounded-md overflow-hidden ${className}`}>
            <table className="w-full table-auto mb-6 text-left bg-white">
                <thead className="text-[0.8125rem] border-b bg-neutral-200 font-medium dark:border-neutral-500 dark:text-neutral-800">
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key} className="px-4 py-2">
                                {column.label}
                            </th>
                        ))}
                        {renderRowActions && <th className="px-4 py-2">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={row._id || index} className="border-b hover:bg-gray-50">
                            {columns.map((column) => (
                                <td key={column.key} className="px-4 py-2">
                                    {column.render 
                                        ? column.render(row[column.key], row, index)
                                        : row[column.key]
                                    }
                                </td>
                            ))}
                            {renderRowActions && (
                                <td className="px-4 py-2">
                                    {renderRowActions(row, index)}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

DataTable.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            render: PropTypes.func,
        })
    ).isRequired,
    data: PropTypes.array,
    loading: PropTypes.bool,
    emptyMessage: PropTypes.string,
    renderRowActions: PropTypes.func,
    className: PropTypes.string,
};

