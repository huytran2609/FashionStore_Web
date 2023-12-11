import classNames from 'classnames';
import { Link } from 'react-router-dom';

const popularProducts = [
    {
        id: '3432',
        product_name: 'Straight Pants"',
        product_thumbnail: 'https://cdn-images.kooding.com/productDetailImage/495871-2/1d54d0669776bbf093d0092e24b38a967ce464a2.jpeg',
        product_price: '$1499.00',
        product_stock: 341,
    },
    {
        id: '7633',
        product_name: 'NY Yankees Cream',
        product_thumbnail: 'https://cdn-images.kooding.com/productDetailImage/492834-2/ff5660918bb2df2a80007560ae0f97d6eee739e4.jpg',
        product_price: '$399.00',
        product_stock: 24,
    },
    {
        id: '6534',
        product_name: 'Lotus Medi Skirt',
        product_thumbnail: 'https://cdn-images.kooding.com/productDetailImage/497092-2/3ca3b393224b0e7bea8daff3f2b2876a3a8cdbae.jpg',
        product_price: '$899.00',
        product_stock: 56,
    },
    {
        id: '9234',
        product_name: 'Off-shoulder Tee A3096LG Flex Canvas',
        product_thumbnail: 'https://cdn-images.kooding.com/productDetailImage/497429-2/8f27258001257b51a426eb2a23cce2b86519d09d.jpeg',
        product_price: '$499.00',
        product_stock: 98,
    },
    {
        id: '4314',
        product_name: 'Square Neck Knit',
        product_thumbnail: 'https://cdn-images.kooding.com/productDetailImage/496413-2/aa39c164e65742cf9385b4533708aca6beb34e0f.jpeg',
        product_price: '$699.00',
        product_stock: 0,
    },
    {
        id: '4342',
        product_name: 'Mockneck Stretch Tee',
        product_thumbnail: 'https://cdn-images.kooding.com/productDetailImage/496275-2/f1a44f8e97dbb985179f3ab997dde2414ec3e6a0.jpeg',
        product_price: '$399.00',
        product_stock: 453,
    },
];

function PopularProducts() {
    return (
        <div className="w-[20rem] bg-white p-4 rounded-md border border-gray-200">
            <strong className="text-gray-700 font-medium">Popular Products</strong>
            <div className="mt-4 flex flex-col gap-3">
                {popularProducts.map((product) => (
                    <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className="flex items-start hover:no-underline"
                    >
                        <div className="w-10 h-10 min-w-[2.5rem] bg-gray-200 rounded-sm">
                            <img
                                className="w-full h-full object-cover rounded-md"
                                src={product.product_thumbnail}
                                alt={product.product_name}
                            />
                        </div>
                        <div className="ml-4 flex-1">
                            <p className="text-sm text-gray-800">{product.product_name}</p>
                            <span
                                className={classNames(
                                    product.product_stock === 0
                                        ? 'text-red-500'
                                        : product.product_stock > 50
                                        ? 'text-green-500'
                                        : 'text-orange-500',
                                    'text-xs font-medium',
                                )}
                            >
                                {product.product_stock === 0 ? 'Out of Stock' : product.product_stock + ' in Stock'}
                            </span>
                        </div>
                        <div className="text-xs text-gray-400 pl-1.5">{product.product_price}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default PopularProducts;
