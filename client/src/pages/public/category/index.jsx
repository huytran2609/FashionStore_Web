import styles from './Category.module.scss'
import Product from '~/layouts/public/products'
import { useState, useEffect, memo, useMemo } from 'react';
import Recommended from '~/layouts/public/recommended';
import Sidebar from '~/layouts/public/sidebar';
import Card from '~/components/card';
import { Row, Col } from 'antd';
import categoryApi from '~/apis/categoryAPI/categoryApi';
import { Pagination } from '~/components/pagination';
import { useSearchParams, useLocation } from 'react-router-dom';
import { useProducts, useProductFilter } from '~/hooks';

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

    const [params] = useSearchParams();

    const pathCategory = location.pathname.replace('/', '').toLowerCase();
    const validCategories = ['women', 'men', 'beauty', 'kids', 'lifestyle'];
    const categoryFromPath = validCategories.includes(pathCategory) && pathCategory !== 'category' ? pathCategory : null;

    const categoryName = useMemo(() => {
        if (!categoryFromPath || categories.length === 0) return null;
        const category = categories.find(cat => cat.title.toLowerCase() === categoryFromPath);
        return category ? category.title : null;
    }, [categoryFromPath, categories]);

    const queries = useMemo(() => {
        const queryParams = Object.fromEntries([...params]);
        if (categoryName && !queryParams.category) {
            queryParams.category = categoryName;
        }
        return queryParams;
    }, [params, categoryName]);

    const { products: productData, count } = useProducts({
        defaultParams: queries,
        limit: 30,
        autoFetch: true,
        dependencies: [queries],
    });

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

    const {
        filteredProducts,
        query,
        setQuery,
        selectedFilter,
        setSelectedFilter,
        handleInputChange,
        handleFilterChange,
    } = useProductFilter(productData, {
        searchFields: ['title'],
        filterFields: ['category', 'color', 'company', 'newPrice', 'title'],
    });

    //---------- Radio Filter ------------
    const handleChange = (event) => {
        handleFilterChange(event.target.value);
    };

    //---------- Buttons Filter ------------
    const handleClick = (event) => {
        handleFilterChange(event.target.value);
    };

    const result = useMemo(() => {
        return filteredProducts.map(({ _id, thumbnail, title, price, color }) => (
            <MemoizedCard
                key={_id}
                img={thumbnail}
                title={title}
                prevPrice={Number(price * 3)}
                newPrice={price}
                id={_id}
                color={color}
            />
        ));
    }, [filteredProducts]);

    return (
        <>
            <Row>
                <Col span={4}>
                    <Sidebar handleChange={handleChange} productData={categories} />
                </Col>
                <Col span={20}>
                    <Row>
                        <Col style={{ height: '3.75rem' }} span={24}>

                        </Col>
                        <Col style={{ height: '5.625rem' }} span={24}>
                            <Recommended handleClick={handleClick} productData={categories} />
                        </Col>
                        <Col className={styles.productCategory} span={24}>
                            <div className='grid grid-cols-4 gap-4'>
                                <Product result={result} />
                            </div>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '1.875rem' }}>
                                <Pagination totalCount={count} pageSize={30}/>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </>
    )
}
