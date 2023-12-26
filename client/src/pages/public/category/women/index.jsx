import { Pagination } from 'antd';
import Product from '~/layouts/public/Products/Product';
import { getProductsWomen } from '~/apis/products';
import { useState, useEffect, memo } from 'react';
import Card from '~/components/Card/Card';
export default function Women() {

    const [productData, setProductData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsData = await getProductsWomen();
                setProductData(productsData.productData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const MemoizedProduct = memo(({ id, img, title, newPrice }) => (
        <Card
            key={Math.random()}
            img={img}
            title={title}
            prevPrice={Number(newPrice * 2)}
            newPrice={newPrice}
            id={id}
        />
    ));

    const result = productData.map(({ _id, thumbnail, title, price }) => (
        <MemoizedProduct
            key={Math.random()}
            img={thumbnail}
            title={title}
            prevPrice={Number(price * 3)}
            newPrice={price}
            id={_id}
        />
    ));

    return (
        <div style={{ margin: '70px 50px 10px 50px' }}>
            <div style={{ padding: '10px 0 20px 0', fontWeight: '600', fontSize: '30px', textAlign: 'center' }}>
                Women
            </div>
            <div className="grid grid-cols-5 gap-4">
                <Product result={result} />
            </div>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                <Pagination defaultCurrent={1} total={10} />
            </div>
        </div>
    );
}
