import { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getBase64 } from '~/utils/helpers';

/**
 * Reusable FileUpload component for image/file uploads
 * @param {string} id - Input id and name
 * @param {object} register - React Hook Form register function
 * @param {object} errors - React Hook Form errors object
 * @param {function} watch - React Hook Form watch function
 * @param {function} setPreview - Callback to set preview state
 * @param {object} preview - Preview state object
 * @param {boolean} multiple - Whether to allow multiple files (default: false)
 * @param {string} label - Label text (default: 'Upload')
 * @param {string} accept - Accepted file types (default: 'image/*')
 * @param {string} className - Additional CSS classes
 * @param {string} maxSizeText - Text for max size info (default: 'SVG, PNG, JPG or GIF (MAX. 800x400px)')
 * @param {object} validate - Validation rules for React Hook Form
 */
export default function FileUpload({
    id,
    register,
    errors,
    watch,
    setPreview,
    preview,
    multiple = false,
    label = 'Upload',
    accept = 'image/*',
    className = '',
    maxSizeText = 'SVG, PNG, JPG or GIF (MAX. 800x400px)',
    validate,
}) {
    const files = watch(id);

    const handlePreview = useCallback(
        async (fileList) => {
            if (!fileList || fileList.length === 0) return;

            if (multiple) {
                const imagesPreview = [];
                for (let file of fileList) {
                    const base64Image = await getBase64(file);
                    imagesPreview.push(base64Image);
                }
                setPreview((prev) => ({ ...prev, [id]: imagesPreview }));
            } else {
                const file = fileList[0];
                if (file) {
                    const base64File = await getBase64(file);
                    setPreview((prev) => ({ ...prev, [id]: base64File }));
                }
            }
        },
        [id, multiple, setPreview],
    );

    useEffect(() => {
        if (files) {
            handlePreview(files);
        }
    }, [files, handlePreview]);

    const previewValue = preview?.[id];
    const hasPreview = multiple ? Array.isArray(previewValue) && previewValue.length > 0 : !!previewValue;

    return (
        <label
            htmlFor={id}
            className={classNames(
                'relative flex flex-col mt-6 items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100',
                className,
            )}
        >
            <div>
                {hasPreview ? (
                    multiple ? (
                        <div className="flex gap-1 w-fit flex-wrap">
                            {previewValue.map((image, index) => (
                                <img
                                    key={index}
                                    src={image || 'https://www.freeiconspng.com/img/23494'}
                                    width={10}
                                    height={100}
                                    alt={`${label} ${index + 1}`}
                                    className="w-[10.625rem] object-contain rounded-md"
                                />
                            ))}
                        </div>
                    ) : (
                        <img
                            src={previewValue || 'https://www.freeiconspng.com/img/23494'}
                            width={10}
                            height={100}
                            alt={label}
                            className="w-full h-full object-cover"
                        />
                    )
                ) : (
                    <div className="flex flex-col p-4 items-center justify-center">
                        <svg
                            aria-hidden="true"
                            className="w-10 h-10 mb-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">{label}</span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">{maxSizeText}</p>
                    </div>
                )}
            </div>
            <input
                id={id}
                type="file"
                className="hidden"
                multiple={multiple}
                accept={accept}
                {...register(id, validate)}
            />
            {errors[id] && (
                <small className="text-red-400 text-[0.625rem] absolute bottom-0 translate-y-[-3] pl-1 pt-1">
                    {errors[id]?.message}
                </small>
            )}
        </label>
    );
}

FileUpload.propTypes = {
    id: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    watch: PropTypes.func.isRequired,
    setPreview: PropTypes.func.isRequired,
    preview: PropTypes.object,
    multiple: PropTypes.bool,
    label: PropTypes.string,
    accept: PropTypes.string,
    className: PropTypes.string,
    maxSizeText: PropTypes.string,
    validate: PropTypes.object,
};

