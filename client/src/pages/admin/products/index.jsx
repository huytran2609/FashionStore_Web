import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { Pagination } from '~/components/Pagination';
import { useDebounce } from '~/hooks';
import InputSearch from '~/layouts/admin/Components/InputSearch';
import { useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import InputForm from '~/components/InputForm';
import Modal from '~/components/Modal';
import categoryApi from '~/apis/categoryAPI/categoryApi';
import Select from '~/components/Select';
import { getAllProducts } from '~/apis/products';

function Product() {
    const [isOpen, setIsOpen] = useState(false);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await categoryApi.getAll();
            setCategories(response.dataCategories);
        };
        fetchCategories();
    }, []);

    const {
        handleSubmit,
        reset,
        register,
        setValue,
        watch,
        formState: { errors },
    } = useForm();

    const [editProduct, setEditProduct] = useState(null);
    // const [updated, setUpdated] = useState(false);

    const [products, setProducts] = useState([]);
    const [query, setQuery] = useState({ q: '' });

    const [params] = useSearchParams();

    const debounced = useDebounce(query.q, 600);

    const fetchApiProducts = async (params) => {
        const response = await getAllProducts({ ...params, limit: 8 });
        if (response.success) {
            setProducts(response);
        }
    };

    useEffect(() => {
        const queries = Object.fromEntries([...params]);
        if (debounced) {
            queries.q = debounced;
        }
        fetchApiProducts(queries);
    }, [debounced, params]);

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

    // const render = useCallback(() => {
    //     setUpdated(!updated);
    // }, [updated]);

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

    const handleCreateProduct = (data) => {
        if(data.category) data.category = categories.find(item => item._id === data.category)?.title;
        console.log(data);
    };

    return (
        <div>
            <div className="flex items-center justify-between bg-white outline-none w-full h-12 pl-4 pr-4 rounded-md">
                <h3 className="font-semibold text-xl">Product Management</h3>
                <InputSearch type="text" placeholder="Search..." value={query.q} setValue={setQuery} />
                <button
                    onClick={() => {
                        setIsOpen(true);
                    }}
                    className="bg-blue-600 rounded-md border border-blue-600 text-white text-[14px] w-25 p-2 hover:bg-blue-700 hover:text-white"
                >
                    Add new product
                </button>
            </div>
            <div className="max-w-screen-xl mt-3 rounded-lg">
                <form>
                    <table className="w-full table-auto mb-6 text-left bg-white">
                        <thead className="text-[13px] border-b bg-neutral-200 font-medium dark:border-neutral-500 dark:text-neutral-800">
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
                                <th className="px-4 py-2">UpdatedAtt</th>
                                <th className="px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.products?.map((product, index) => (
                                <tr key={`${product._id} - ${index} - ${product.color}`} className="border-b dark:border-neutral-500">
                                    <td className="whitespace-nowrap  px-5 py-2 font-semibold">{index + 1}</td>
                                    <td className="whitespace-nowrap  px-4 py-2">
                                        <img
                                            src={product.thumbnail}
                                            alt="Thumb"
                                            className="w-12 h-12 object-cover rounded-md"
                                        />
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 max-w-[400px] overflow-hidden overflow-ellipsis">
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
                                                validate={{
                                                    required: 'Required',
                                                    pattern: {
                                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                        message: 'Invalid email address',
                                                    },
                                                }}
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
                                                validate={{
                                                    required: 'Required',
                                                    pattern: {
                                                        value: /^[0-9]{10}$/,
                                                        message: 'Invalid phone number',
                                                    },
                                                }}
                                            />
                                        ) : (
                                            <span>{product?.category}</span>
                                        )}
                                    </td>

                                    <td className="whitespace-nowrap px-4 py-2">
                                        <span>{product?.price}</span>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2">
                                        <span>{product?.quantity}</span>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2">
                                        <span>{product?.sold}</span>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 max-w-[200px] overflow-hidden overflow-ellipsis">
                                        <span>{product?.color}</span>
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-center">
                                        <span>{product?.totalRatings}</span>
                                    </td>

                                    <td className="whitespace-nowrap  px-4 py-2">
                                        {moment(product?.updatedAt).format('MM/DD/YYYY')}
                                    </td>
                                    <td className="whitespace-nowrap  px-4 py-2">
                                        {editProduct?._id === product._id ? (
                                            <>
                                                <button
                                                    type="submit"
                                                    className="rounded-md border border-blue-600 text-blue-600 text-[12px] w-13 p-1 mr-1 hover:bg-blue-500 hover:text-white"
                                                >
                                                    Update
                                                </button>
                                                <span
                                                    // onClick={() => setEditProduct(null)}
                                                    className="rounded-md border bg-blue-100 border-blue-600 text-blue-600 text-[12px] w-12 p-1 mr-1 hover:bg-blue-500 hover:text-white cursor-pointer"
                                                >
                                                    Back
                                                </span>
                                            </>
                                        ) : (
                                            <>
                                                <span
                                                    onClick={() => setEditProduct(product)}
                                                    className="rounded-md border border-blue-600 text-blue-600 text-[12px] w-12 p-1 mr-1 hover:bg-blue-500 hover:text-white cursor-pointer"
                                                >
                                                    Edit
                                                </span>
                                                <span
                                                    // onClick={() => handleDelete(product._id)}
                                                    className="bg-red-600 rounded-md border border-red-600 text-white text-[12px] w-12 p-1 hover:bg-red-700 hover:text-white cursor-pointer"
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
            <Pagination totalCount={products.counts} pageSize={8}/>
            {/* Add product */}
            <Modal
                isOpen={isOpen}
                handleClose={() => {
                    setIsOpen(false);
                }}
                title="Tạo mới sản phẩm"
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
                                style="pl-[10px]"
                                placeholder="Name of new product"
                            />
                            <InputForm
                                label="Product price"
                                type="number"
                                register={register}
                                errors={errors}
                                id="price"
                                validate={{ required: 'Required' }}
                                style="pl-[10px]"
                                placeholder="Price"
                            />
                            <InputForm
                                label="Product quantity"
                                type="number"
                                register={register}
                                errors={errors}
                                id="quantity"
                                validate={{ required: 'Required' }}
                                style="pl-[10px]"
                                placeholder="Quantity"
                            />
                            <InputForm
                                label="Product color"
                                register={register}
                                errors={errors}
                                id="color"
                                validate={{ required: 'Required' }}
                                style="pl-[10px]"
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
                                options={categories.find((item) => item._id === watch('category'))?.childrenCategory?.map((child) => ({ code: child, value: child }))}
                                register={register}
                                errors={errors}
                                validate={{ required: 'Required' }}
                            />
                        </div>
                    </div>
                    <button type = "submit">Add</button>
                </form>
            </Modal>
        </div>
    );
}

export default Product;
