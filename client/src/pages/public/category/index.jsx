import styles from './Category.module.scss'
import Product from '~/layouts/public/Products/Product'
import { getAllProducts } from '~/apis/products'
import { useState, useEffect, memo, useMemo } from 'react';
// import Navigation from '~/layouts/public/Navigation/Nav'
import Recommended from '~/layouts/public/Recommended/Recommended';
import Sidebar from '~/layouts/public/Sidebar/Sidebar';
import Card from '~/components/Card/Card';
import { Row, Col } from 'antd';
import categoryApi from '~/apis/categoryAPI/categoryApi';
import Header from '~/layouts/public/Header';
import Footer from '~/layouts/public/Footer';
import { Pagination } from '~/components/Pagination';
import { useSearchParams, useLocation } from 'react-router-dom';

export default function Category() {
    const [categories, setCategories] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetchApiCategories = async () => {
            const response = await categoryApi.getAll();
            setCategories(response.dataCategories);
        };
        fetchApiCategories();
    }, []);

    const [productData, setProductData] = useState([])
    const [count , setCount] = useState(0)
    const [params] = useSearchParams();

    const pathCategory = location.pathname.replace('/', '').toLowerCase();
    const validCategories = ['women', 'men', 'beauty', 'kids', 'lifestyle'];
    const categoryFromPath = validCategories.includes(pathCategory) && pathCategory !== 'category' ? pathCategory : null;

    const categoryName = useMemo(() => {
        if (!categoryFromPath || categories.length === 0) return null;
        const category = categories.find(cat => cat.title.toLowerCase() === categoryFromPath);
        return category ? category.title : null;
    }, [categoryFromPath, categories]);

    useEffect(() => {
        const fetchData = async (params) => {
            try {
                const queryParams = { ...params };
                if (categoryName && !queryParams.category) {
                    queryParams.category = categoryName;
                }
                const productsData = await getAllProducts({ ...queryParams, limit: 30 });
                setProductData(productsData.products)
                setCount(productsData.counts)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        const queries = Object.fromEntries([...params]);
        fetchData(queries);
    }, [params, categoryName]);

    const MemoizedCard = memo(({ id, img, title, newPrice, color }) => (
        <Card
            key={id}
            img={img}
            title={title}
            prevPrice={Number(newPrice * 2)}
            newPrice={newPrice}
            id={id}
            color={color}
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

        return filteredProducts.map(({ _id, thumbnail, title, price, color }) => (
            <MemoizedCard
                key={Math.random()}
                img={thumbnail}
                title={title}
                prevPrice={Number(price * 3)}
                newPrice={price}
                id={_id}
                color={color}
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
                                <Pagination totalCount={count} pageSize={30}/>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}
