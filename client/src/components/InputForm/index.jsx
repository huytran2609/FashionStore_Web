import classNames from 'classnames';
import { memo } from 'react';

function InputForm({ label, disabled, register, errors, id, validate, type = 'text', placeholder, fullWidth, defaultValue }) {


    return (
        <div className="relative flex h-[60px] items-center">
            {label && (
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor={id}>
                    {label}
                </label>
            )}
            <input
                type={type}
                id={id}
                {...register(id, validate)}
                placeholder={placeholder}
                disabled={disabled}
                value = {defaultValue}
                className={classNames(
                    'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white',
                    fullWidth && 'w-full',
                )}
            />
            {errors[id] && (
                <small className="text-red-400 text-[10px] absolute bottom-0 translate-y-2 pl-1 pt-1">
                    {errors[id]?.message}
                </small>
            )}
        </div>
    );
}

export default memo(InputForm);
