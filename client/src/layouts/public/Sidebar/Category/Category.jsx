import React from 'react';
import styles from './Category.module.scss';
import Input from '~/components/Input/Input';
import categoryApi from '~/apis/categoryAPI/categoryApi';
import { useState, useEffect } from 'react';

export default function Category({ handleChange }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchApiCategories = async () => {
            const response = await categoryApi.getAll();
            setCategories(response.dataCategories);
        };
        fetchApiCategories();
    }, []);

    return (
        <div style={{ marginLeft: '-45px' }}>
            <h2 className={styles.sidebarTitle}>Category</h2>

            <div>
                <label className={styles.sidebarLabelContainer}>
                    <input onChange={handleChange} type="radio" value="" name="test" />
                    <span className={styles.checkmark}></span>All
                </label>
                {categories.map((data) =>
                    // <li key={data._id}>{data.title}</li>
                    <Input key={data._id} handleChange={handleChange} value={data.title} title={data.title} name="test" />
                )}
            </div>
        </div>
    );
}
