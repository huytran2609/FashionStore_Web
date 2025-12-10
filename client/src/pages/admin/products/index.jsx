import { useCallback, useState, useMemo } from 'react';
import { Pagination } from '~/components/pagination';
import { useDebounce, useConfirmDelete } from '~/hooks';
import InputSearch from '~/layouts/admin/components/inputSearch';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import InputForm from '~/components/inputForm';
import Modal from '~/components/modal';
import categoryApi from '~/apis/categoryAPI/categoryApi';
import Select from '~/components/select';
import TextArea from '~/components/textArea';
import { formatCreatedAt } from '~/utils/helpers';
import { apiCreateProduct, apiDeleteProduct } from '~/apis/admin/product';
import { useProducts, useCategories } from '~/hooks';
import { getEmailValidation, getPhoneValidation } from '~/utils/validators';
import { appConfig } from '~/config/env';
import PageHeader from '~/components/pageHeader';
import ActionButtons from '~/components/actionButtons';
import FileUpload from '~/components/fileUpload';

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
    const debounced = useDebounce(query.q, appConfig.debounceDelay);

    const queries = useMemo(() => {
        const queryParams = Object.fromEntries([...params]);
        if (debounced) {
            queryParams.q = debounced;
        }
        return queryParams;
    }, [debounced, params]);

    const { products: productsResponse, refetch } = useProducts({
        defaultParams: queries,
        limit: appConfig.adminProductsLimit,
        dependencies: [updated],
    });

    const products = useMemo(() => {
        if (!productsResponse || !productsResponse.products) {
            return { products: [], counts: 0 };
        }
        return productsResponse;
    }, [productsResponse]);
    
    const render = useCallback(() => {
        setUpdated(!updated);
        refetch(queries);
    }, [updated, refetch, queries]);


    const handleCreateProduct = (data) => {
        if (data.category) data.category = categories.find((item) => item._id === data.category)?.title;
        const formData = new FormData();
        for (let i of Object.entries(data)) formData.append(i[0], i[1]);
        if (data.thumbnail) formData.append('thumbnail', data.thumbnail[0]);
        if (data.images) for (let image of data.images) formData.append('images', image);
        const response = apiCreateProduct(formData);
        if (response.success) {
            toast.success('Create new product successfully!');
            reset();
            setPreview({ thumbnail: null, images: [] });
        } else {
            toast.success('Create new product successfully!');
        }
    };

    const handleDelete = useConfirmDelete(apiDeleteProduct, {
        onSuccess: () => {
            render();
        },
    });

    return (
        <div>
            <PageHeader title="Product Management">
                <div className="flex items-center gap-2">
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
            </PageHeader>
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
                                        <ActionButtons
                                            isEditMode={editProduct?._id === product._id}
                                            onEdit={() => setEditProduct(product)}
                                            onDelete={() => handleDelete(product._id)}
                                            onCancel={() => setEditProduct(null)}
                                        />
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
                    reset();
                    setPreview({ thumbnail: null, images: [] });
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
                            <FileUpload
                                id="thumbnail"
                                register={register}
                                errors={errors}
                                watch={watch}
                                setPreview={setPreview}
                                preview={preview}
                                multiple={false}
                                label="Thumbnail"
                                validate={{ required: 'Required' }}
                            />
                            <FileUpload
                                id="images"
                                register={register}
                                errors={errors}
                                watch={watch}
                                setPreview={setPreview}
                                preview={preview}
                                multiple={true}
                                label="Images"
                            />
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
