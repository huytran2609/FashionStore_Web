import React from 'react';
import styles from './Sidebar.module.scss';
import { TfiShoppingCart } from 'react-icons/tfi';
import Category from './Category/Category';
import Price from './Price/Price';
import Colors from './Colors/Colors';
import { useState, useEffect } from 'react';
import categoryApi from '~/apis/categoryAPI/categoryApi';

export default function Sidebar({ handleChange, productData }) {

    return (
        <>
            <section className={styles.sidebar}>
                <div className={styles.logoContainer}>
                    <h1>
                        <TfiShoppingCart />
                    </h1>
                </div>

                <Category handleChange={handleChange} productData={productData} />
                <Price handleChange={handleChange} />
                <Colors handleChange={handleChange} />
            </section>
        </>
    );
}
