import { useCallback, useEffect, useState, useMemo } from 'react';
import { Pagination } from '~/components/pagination';
import { useDebounce } from '~/hooks';
import InputSearch from '~/layouts/admin/components/inputSearch';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import InputForm from '~/components/inputForm';
import Modal from '~/components/modal';
import categoryApi from '~/apis/categoryAPI/categoryApi';
import Select from '~/components/select';
import TextArea from '~/components/textArea';
import { formatCreatedAt, getBase64 } from '~/utils/helpers';
import { apiCreateProduct, apiDeleteProduct } from '~/apis/admin/product';
import { useProducts, useCategories } from '~/hooks';
import { getEmailValidation, getPhoneValidation } from '~/utils/validators';

function Product() {
    const [isOpen, setIsOpen] = useState(false);

    const { categories } = useCategories();

    const {
        handleSubmit,
        reset,
        register,
        setValue,
        watch,
        formState: { errors },
    } = useForm();

    const [preview, setPreview] = useState({
        thumbnail: null,
        images: [],
    });

    const [editProduct, setEditProduct] = useState(null);
    const [updated, setUpdated] = useState(false);

    const [query, setQuery] = useState({ q: '' });
    const [params] = useSearchParams();
    const debounced = useDebounce(query.q, 600);

    const queries = useMemo(() => {
        const queryParams = Object.fromEntries([...params]);
        if (debounced) {
            queryParams.q = debounced;
        }
        return queryParams;
    }, [debounced, params]);

    const { products: productsResponse, refetch } = useProducts({
        defaultParams: queries,
        limit: 8,
        dependencies: [JSON.stringify(queries), updated],
    });

    const products = useMemo(() => {
        if (!productsResponse || !productsResponse.products) {
            return { products: [], counts: 0 };
        }
        return productsResponse;
    }, [productsResponse]);

    // useEffect(() => {
    //     // Khi editProduct thay đổi, cập nhật giá trị mặc định của các trường
    //     if (editProduct) {
    //         setValue('name', editProduct.name);
    //         setValue('email', editProduct.email);
    //         setValue('phone', editProduct.phone);
    //         setValue('status', editProduct.isBlocked ? 'Block' : 'Active');
    //     }
    //     console.log(editProduct);
    // }, [editProduct, setValue]);

    const render = useCallback(() => {
        setUpdated(!updated);
        refetch(queries);
    }, [updated, refetch, queries]);

    // const handleUpdate = async (data) => {
    //     const response = await apiUpdateproduct(data, editProduct._id);
    //     if (response.success) {
    //         setEditProduct(null);
    //         render();
    //         toast.success(response.mes);
    //     } else {
    //         toast.error(response.mes);
    //     }
    // };

    // const handleDelete = async (uid) => {
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         showCancelButton: true,
    //     }).then(async (result) => {
    //         if (result.isConfirmed) {
    //             const response = await apiDeleteproduct(uid);
    //             if (response.success) {
    //                 render();
    //                 toast.success(response.mes);
    //             } else {
    //                 toast.error(response.mes);
    //             }
    //         }
    //     });
    // };

    const handlePreviewThumb = async (file) => {
        const base64Thumb = await getBase64(file);
        setPreview((prev) => ({ ...prev, thumbnail: base64Thumb }));
    };

    useEffect(() => {
        const thumbnailFile = watch('thumbnail')[0];
        if (thumbnailFile) {
            handlePreviewThumb(thumbnailFile);
        }
    }, [watch('thumbnail')]);

    const handlePreviewImages = async (files) => {
        const imagesPreview = [];
        for (let file of files) {
            // if(file.type !== 'image/png' || file.type !== 'image/jpeg' || file.type != 'image/jpg') {
            //     toast.warning('File is not supported!')
            //     return;
            // }
            const base64Images = await getBase64(file);
            imagesPreview.push(base64Images);
        }
        setPreview((prev) => ({ ...prev, images: imagesPreview }));
    };

    useEffect(() => {
        const thumbnailImages = watch('images');
        if (thumbnailImages) {
            handlePreviewImages(thumbnailImages);
        }
    }, [watch('images')]);

    const handleCreateProduct = (data) => {
        if (data.category) data.category = categories.find((item) => item._id === data.category)?.title;
        // console.log(data);
        const formData = new FormData();
        for (let i of Object.entries(data)) formData.append(i[0], i[1]);
        for (let pair of formData.entries()) console.log(pair[0] + ', ' + pair[1]);
        if (data.thumbnail) formData.append('thumbnail', data.thumbnail[0]);
        if (data.images) for (let image of data.images) formData.append('images', image);
        const response = apiCreateProduct(formData);
        if (response.success) {
            toast.success('Create new product successfully!');
            reset();
            setPreview({ thumnail: '', images: [] });
        } else {
            toast.success('Create new product successfully!');
        }
    };

    const handleDelete = async (pid) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            showCancelButton: true,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await apiDeleteProduct(pid);
                if (response.success) {
                    render()
                    toast.success(response.mes);
                } else {
                    toast.error(response.mes);
                }
            }
        });
    }

    return (
        <div>
            <div className="flex items-center justify-between bg-white outline-none w-full h-12 pl-4 pr-4 rounded-md">
                <h3 className="font-semibold text-xl">Product Management</h3>
                <InputSearch type="text" placeholder="Search..." value={query.q} setValue={setQuery} />
                <button
                    onClick={() => {
                        setIsOpen(true);
                    }}
                    className="bg-blue-600 rounded-md border border-blue-600 text-white text-[0.875rem] w-25 p-2 hover:bg-blue-700 hover:text-white"
                >
                    Add new product
                </button>
            </div>
            <div className="max-w-screen-xl mt-3 rounded-lg">
                <form>
                    <table className="w-full table-auto mb-6 text-left bg-white">
                        <thead className="text-[0.8125rem] border-b bg-neutral-200 font-medium dark:border-neutral-500 dark:text-neutral-800">
                            <tr>
                                <th className="px-4 py-2">#</th>
                                <th className="px-4 py-2">Thumbnail</th>
                                <th className="px-4 py-2">Title</th>
                                <th className="px-4 py-2">Brand</th>
                                <th className="px-4 py-2">Category</th>
                                <th className="px-4 py-2">Price</th>
                                <th className="px-4 py-2">Quantity</th>
                                <th className="px-4 py-2">Sold</th>
                                <th className="px-4 py-2">Color</th>
                                <th className="px-4 py-2">Ratings</th>
                                <th className="px-4 py-2">UpdatedAt</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.products?.map((product, index) => (
                                <tr
                                    key={`${product._id} - ${index} - ${product.color}`}
                                    className="border-b dark:border-neutral-500"
                                >
                                    <td className="whitespace-nowrap  px-5 py-2 font-semibold">{index + 1}</td>
                                    <td className="whitespace-nowrap  px-4 py-2">
                                        <img
                                            src={product.thumbnail}
                                            alt="Thumb"
                                            className="w-12 h-12 object-cover rounded-md"
                                        />
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 max-w-[25rem] overflow-hidden overflow-ellipsis">
                                        {editProduct?._id === product._id ? (
                                            <InputForm
                                                key={editProduct?._id}
                                                register={register}
                                                errors={errors}
                                                defaultValue={editProduct?.name}
                                                id={'name'}
                                                validate={{ required: 'Required' }}
                                            />
                                        ) : (
                                            <span>{product?.title}</span>
                                        )}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2">
                                        {editProduct?._id === product._id ? (
                                            <InputForm
                                                register={register}
                                                errors={errors}
                                                defaultValue={watch(editProduct?.email)}
                                                id={'email'}
                                                validate={getEmailValidation()}
                                            />
                                        ) : (
                                            <span>{product?.brand}</span>
                                        )}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2">
                                        {editProduct?._id === product._id ? (
                                            <InputForm
                                                register={register}
                                                errors={errors}
                                                defaultValue={editProduct?.phone}
                                                id={'phone'}
                                                validate={getPhoneValidation()}
                                            />
                                        ) : (
                                            <span>{product?.category}</span>
                                        )}
                                    </td>

                                    <td className="whitespace-nowrap px-4 py-2">
                                        <span>$&nbsp;{product?.price}</span>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2">
                                        <span>{product?.quantity}</span>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2">
                                        <span>{product?.sold}</span>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 max-w-[12.5rem] overflow-hidden overflow-ellipsis">
                                        <span>{product?.color}</span>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-center">
                                        <span>{product?.totalRatings}</span>
                                    </td>

                                    <td className="whitespace-nowrap  px-4 py-2">
                                        {formatCreatedAt(product?.updatedAt)}
                                    </td>
                                    <td className="whitespace-nowrap  px-4 py-2">
                                        {editProduct?._id === product._id ? (
                                            <>
                                                <button
                                                    type="submit"
                                                    className="rounded-md border border-blue-600 text-blue-600 text-[0.75rem] w-13 p-1 mr-1 hover:bg-blue-500 hover:text-white"
                                                >
                                                    Update
                                                </button>
                                                <span
                                                    // onClick={() => setEditProduct(null)}
                                                    className="rounded-md border bg-blue-100 border-blue-600 text-blue-600 text-[0.75rem] w-12 p-1 mr-1 hover:bg-blue-500 hover:text-white cursor-pointer"
                                                >
                                                    Back
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <span
                                                    onClick={() => setEditProduct(product)}
                                                    className="rounded-md border border-blue-600 text-blue-600 text-[0.75rem] w-12 p-1 mr-1 hover:bg-blue-500 hover:text-white cursor-pointer"
                                                >
                                                    Edit
                                                </span>
                                                <span
                                                    onClick={() => handleDelete(product._id)}
                                                    className="bg-red-600 rounded-md border border-red-600 text-white text-[0.75rem] w-12 p-1 hover:bg-red-700 hover:text-white cursor-pointer"
                                                >
                                                    Delete
                                                </span>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>
            </div>
            <Pagination totalCount={products.counts} pageSize={8} />
            {/* Add product */}
            <Modal
                isOpen={isOpen}
                handleClose={() => {
                    setIsOpen(false);
                }}
                title="Create new product"
                size="2xl"
            >
                <form onSubmit={handleSubmit(handleCreateProduct)}>
                    <div className="flex gap-3">
                        <div className="flex flex-1 flex-col gap-3">
                            <InputForm
                                label="Product name"
                                register={register}
                                errors={errors}
                                id="title"
                                validate={{ required: 'Required' }}
                                style="pl-[0.625rem]"
                                placeholder="Name of new product"
                            />
                            <InputForm
                                label="Product price"
                                type="number"
                                register={register}
                                errors={errors}
                                id="price"
                                validate={{ required: 'Required' }}
                                style="pl-[0.625rem]"
                                placeholder="Price"
                            />
                            <InputForm
                                label="Product quantity"
                                type="number"
                                register={register}
                                errors={errors}
                                id="quantity"
                                validate={{ required: 'Required' }}
                                style="pl-[0.625rem]"
                                placeholder="Quantity"
                            />
                            <InputForm
                                label="Product color"
                                register={register}
                                errors={errors}
                                id="color"
                                validate={{ required: 'Required' }}
                                style="pl-[0.625rem]"
                                placeholder="Color"
                            />
                            <Select
                                label="Category"
                                id="category"
                                options={categories.map((item) => ({ code: item._id, value: item.title }))}
                                register={register}
                                errors={errors}
                                validate={{ required: 'Required' }}
                            />
                            <Select
                                label="Category child"
                                id="categoryChild"
                                options={categories
                                    .find((item) => item._id === watch('category'))
                                    ?.childrenCategory?.map((child) => ({ code: child, value: child }))}
                                register={register}
                                errors={errors}
                                validate={{ required: 'Required' }}
                            />
                            <InputForm
                                label="Brand"
                                register={register}
                                errors={errors}
                                id="brand"
                                validate={{ required: 'Required' }}
                                style="pl-[0.625rem]"
                                placeholder="Brand"
                            />
                            <TextArea
                                label="Description"
                                id="description"
                                register={register}
                                errors={errors}
                                validate={{ required: 'Required' }}
                                rows={4}
                                style="pl-[0.625rem] pb-2"
                            />
                        </div>
                        <div className="flex flex-1 flex-col gap-3">
                            <label
                                htmlFor="thumbnail"
                                className="relative flex flex-col mt-6 items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 "
                            >
                                <div>
                                    {preview?.thumbnail ? (
                                        <img
                                            src={preview.thumbnail || 'https://www.freeiconspng.com/img/23494'}
                                            width={10}
                                            height={100}
                                            alt="Thumbail"
                                            className="w-full h-full object-cover"
                                        />
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
                                                <span className="font-semibold">Thumbnail</span>
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <input
                                    id="thumbnail"
                                    type="file"
                                    className="hidden"
                                    {...register('thumbnail', { required: 'Required' })}
                                    // onChange={(event) => setPreview({thumbnail: event.target.files[0]})}
                                />
                                {errors['thumbnail'] && (
                                    <small className="text-red-400 text-[0.625rem] absolute bottom-0 translate-y-[-3] pl-1 pt-1">
                                        {errors['thumbnail']?.message}
                                    </small>
                                )}
                            </label>
                            {/* multiple images */}
                            <label
                                htmlFor="images"
                                className="relative flex flex-col mt-6 items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 "
                            >
                                <div>
                                    {preview.images.length > 0 ? (
                                        <div className="flex gap-1 w-fit flex-wrap">
                                            {preview.images.map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={image || 'https://www.freeiconspng.com/img/23494'}
                                                    width={10}
                                                    height={100}
                                                    alt="Images"
                                                    className="w-[10.625rem] object-contain rounded-md"
                                                />
                                            ))}
                                        </div>
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
                                                <span className="font-semibold">Images</span>
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <input
                                    id="images"
                                    type="file"
                                    className="hidden relative"
                                    multiple
                                    {...register('images')}
                                    // onChange={(event) => setPreview({images: event.target.files[0]})}
                                />
                                {errors['images'] && (
                                    <small className="text-red-400 text-[0.625rem] absolute bottom-0 translate-y-[-3] pl-1 pt-1">
                                        {errors['images']?.message}
                                    </small>
                                )}
                            </label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Add
                    </button>
                </form>
            </Modal>
        </div>
    );
}

export default Product;
