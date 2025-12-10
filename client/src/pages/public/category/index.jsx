import styles from './Category.module.scss'
import Product from '~/layouts/public/products'
import { useState, useEffect, memo, useMemo, useRef } from 'react';
import Recommended from '~/layouts/public/recommended';
import Sidebar from '~/layouts/public/sidebar';
import Card from '~/components/card';
import { Row, Col } from 'antd';
import categoryApi from '~/apis/categoryAPI/categoryApi';
import { Pagination } from '~/components/pagination';
import { useSearchParams, useLocation, useNavigate } from 'react-router-dom';
import { useProducts, useProductFilter, useCategories } from '~/hooks';

export default function Category() {
    const location = useLocation();
    const navigate = useNavigate();
    const { categories } = useCategories();

    const [params] = useSearchParams();

    const pathCategory = location.pathname.replace('/', '').toLowerCase();
    const validCategories = ['women', 'men', 'beauty', 'kids', 'lifestyle'];
    const categoryFromPath = validCategories.includes(pathCategory) && pathCategory !== 'category' ? pathCategory : null;

    const categoryName = useMemo(() => {
        if (!categoryFromPath || categories.length === 0) return null;
        // Find category by matching lowercase title with path category
        const category = categories.find(cat => {
            const catTitleLower = cat.title?.toLowerCase() || '';
            return catTitleLower === categoryFromPath;
        });
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
    });

    // Ensure productData is always an array
    const productsArray = useMemo(() => {
        if (!productData || !Array.isArray(productData)) {
            return [];
        }
        return productData;
    }, [productData]);

    const MemoizedCard = memo(({ id, img, title, newPrice, color, totalRatings, sold, category, brand }) => (
        <Card
            key={id}
            img={img}
            title={title}
            prevPrice={Number(newPrice * 2)}
            newPrice={newPrice}
            id={id}
            color={color}
            totalRatings={totalRatings}
            sold={sold}
            category={category}
            brand={brand}
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
        clearFilters,
    } = useProductFilter(productsArray, {
        searchFields: ['title'],
        filterFields: ['category', 'color', 'company', 'newPrice', 'title'],
    });

    // Clear filters when category changes
    const prevCategoryNameRef = useRef(categoryName);
    useEffect(() => {
        if (categoryName !== prevCategoryNameRef.current) {
            prevCategoryNameRef.current = categoryName;
            clearFilters();
        }
    }, [categoryName, clearFilters]);

    //---------- Radio Filter ------------
    const handleChange = (event) => {
        handleFilterChange(event.target.value);
    };

    //---------- Buttons Filter ------------
    const handleClick = (event) => {
        // Get value from button - can be from event.target.value or event.currentTarget.value
        const categoryValue = event.target?.value || event.currentTarget?.value || '';
        
        // If "All Products" is clicked (empty value), navigate to category page without specific category
        if (!categoryValue || categoryValue === '') {
            navigate('/category');
            return;
        }
        
        // Find the category by title (case-insensitive comparison)
        const clickedCategory = categories.find(cat => {
            const catTitle = cat.title?.toLowerCase() || '';
            const value = categoryValue.toLowerCase();
            return catTitle === value;
        });
        
        if (clickedCategory) {
            const categoryPath = clickedCategory.title.toLowerCase();
            // Navigate to the category page
            navigate(`/${categoryPath}`);
        } else {
            // Fallback: just filter if category not found
            handleFilterChange(categoryValue);
        }
    };

    const result = useMemo(() => {
        return filteredProducts.map(({ _id, thumbnail, title, price, color, totalRatings, sold, category, brand }) => (
            <MemoizedCard
                key={_id}
                img={thumbnail}
                title={title}
                prevPrice={Number(price * 3)}
                newPrice={price}
                id={_id}
                color={color}
                totalRatings={totalRatings}
                sold={sold}
                category={category}
                brand={brand}
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
