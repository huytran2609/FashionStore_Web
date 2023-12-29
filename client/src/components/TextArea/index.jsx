import classNames from 'classnames';
import { memo } from 'react';

function TextArea({ label, register, errors, id, validate, defaultValue, style, ...props }) {
    return (
        <div className="relative flex flex-col">
            {label && (
                <label
                    className={classNames('block mb-1 text-sm font-medium text-gray-900 dark:text-white')}
                    htmlFor={id}
                >
                    {label}
                </label>
            )}
            <textarea
                id={id}
                {...props}
                {...register(id, validate)}
                defaultValue={defaultValue}
                className={classNames(
                    'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white',
                )}
            />
            {errors[id] && (
                <small
                    className={classNames(
                        'text-red-400 text-[10px] absolute bottom-0 translate-y-2 pl-1 pt-1',
                        style && style,
                    )}
                >
                    {errors[id]?.message}
                </small>
            )}
        </div>
    );
}

export default memo(TextArea);
