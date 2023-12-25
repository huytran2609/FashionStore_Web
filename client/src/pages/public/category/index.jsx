import styles from './Category.module.scss'
import Product from '~/layouts/public/Products/Product'
import { getAllProducts } from '~/apis/products'
import { useState, useEffect, memo } from 'react';
// import Navigation from '~/layouts/public/Navigation/Nav'
import Recommended from '~/layouts/public/Recommended/Recommended';
import Sidebar from '~/layouts/public/Sidebar/Sidebar';
import Card from '~/components/Card/Card';
import { Row, Col } from 'antd';
import { Pagination } from 'antd';
import categoryApi from '~/apis/categoryAPI/categoryApi';


export default function Category() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchApiCategories = async () => {
            const response = await categoryApi.getAll();
            setCategories(response.dataCategories);
            console.log(response)
        };
        fetchApiCategories();
    }, []);

    const [productData, setProductData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsData = await getAllProducts();
                setProductData(productsData.products)
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

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [query, setQuery] = useState('');

    //---------- Input Filter ------------

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const filteredItems = productData.filter(
        (product) => product.title.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) !== -1,
    );

    //---------- Radio Filter ------------
    const handleChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    //---------- Buttons Filter ------------
    const handleClick = (event) => {
        setSelectedCategory(event.target.value);
    };

    function filteredData(productData, selected, query) {
        let filteredProducts = productData;

        // Filtering Input Items
        if (query) {
            filteredProducts = filteredItems;
        }

        // Applying selected filter
        if (selected) {
            filteredProducts = filteredProducts.filter(
                ({ category, color, company, newPrice, title }) =>
                    category === selected ||
                    color === selected ||
                    company === selected ||
                    newPrice === selected ||
                    title === selected,
            );
        }

        return filteredProducts.map(({ _id, thumbnail, title, price }) => (
            <MemoizedProduct
                key={Math.random()}
                img={thumbnail}
                title={title}
                prevPrice={Number(price * 3)}
                newPrice={price}
                id={_id}
            />
        ));
    }

    const result = filteredData(productData, selectedCategory, query);

    return (
        <>
            <Row>
                <Col span={4}>
                    <Sidebar handleChange={handleChange} productData={categories} />
                </Col>
                <Col span={20}>
                    <Row>
                        <Col style={{ height: '60px' }} span={24}>

                        </Col>
                        <Col style={{ height: '90px' }} span={24}>
                            <Recommended handleClick={handleClick} productData={categories} />
                        </Col>
                        <Col className={styles.productCategory} span={24}>
                            <div className='grid grid-cols-4 gap-4'>
                                <Product result={result} />
                            </div>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
                                <Pagination defaultCurrent={1} total={10} />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            {/* <Navigation query={query} handleInputChange={handleInputChange} /> */}
        </>
    )
}
