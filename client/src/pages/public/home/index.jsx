import styles from './Home.module.scss'
import bgWelcome from '../assets/BackgroundWelcome/Group2.jpg'
import proWelcome from '../assets/BackgroundWelcome/giay.png'
import Button from '~/components/Button/Button'
import imgVec from '../assets/BackgroundWelcome/leftVecto.svg'
import fire from '../assets/BackgroundWelcome/fire.gif'
import imgBest from '../assets/ImgBestSeller/Shoe.jpeg'
import setSport from '../assets/ImgBestSeller/SetSport.png'
import 'aos/dist/aos.css';
import Star from '~/components/Star/Star'
import Product from '~/layouts/public/Products/Product'
import productData from '../../../db/FashionStoreData1'
import React from 'react'

function Home() {
    const randomRate = Math.ceil(Math.random() * 5);
    const randomSale = Math.ceil(Math.random() * 80);
    const randomSale2 = Math.ceil(Math.random() * 80);
    const arrayNameProduct = ['', '', '', '', '', '', '']
    const MemoizedProduct = React.memo(({ img, title, prevPrice, newPrice }) => (
        <Product
            key={Math.random()}
            img={img}
            title={title}
            prevPrice={Number(newPrice * 2)}
            newPrice={newPrice}
        />
    ));

    return (
        <>
            <div className={styles.homeBgColor}>
                <div className={styles.imgContainer}>
                    <img
                        className={styles.img1}
                        alt="backgroundImage"
                        src={bgWelcome}
                    />
                </div>
            </div>
            <div className={styles.leftWelcome}>
                <div className={styles.titleWelcome}>Welcome to 4BEST SHOP</div>
                <div className={styles.contentWelcome}>Welcome to 4Best SHOP, where your shopping experience is elevated to a whole new level! Dive into a world of unparalleled variety and quality, curated just for you. Discover the latest trends, must-have essentials, and exclusive deals that redefine your shopping journey. Join us in exploring a realm of style, convenience, and exceptional value. Happy shopping at 4Best SHOP – where excellence meets your every need!</div>
                <div className={styles.contactWelcome}>
                    <Button link='Contact' content='Contact Us' />
                </div>
                <div className={styles.leftImg}>
                    <img src={imgVec} alt="Left Image" />
                </div>
            </div>

            <div className={styles.rightWelcome}>
                <img src={proWelcome} alt="Product Welcome" className={styles.productWelcome} />
            </div>

            <div className={styles.bestSellerFrame}
                data-aos="fade-up"
                data-aos-duration="10000">
                <div className={styles.titleBestSell}>
                    <img className={styles.leftFire} src={fire} alt="" />
                    <h1>BEST SELLER</h1>
                    <img className={styles.rightFire} src={fire} alt="" />
                    <Button link='AllProduct' content='See More' classParent={styles.btnMore} />
                </div>
                <div className={`absolute top-[166px] w-[353px] h-[383px] text-2xl text-black ${styles.framePro2}`} data-aos="fade-right">
                    <div className="absolute top-[0px] rounded-xl bg-white shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] w-[323px] h-[383px]" >
                        <div className={styles.imgProduct2}>
                            <img src={imgBest} alt="imgProduct" />
                        </div>
                        <div className={styles.productBest2}>
                            <h1 className={`${styles.productName2} ${styles.limitText2}`}>
                                Unisex Big Ball Chunky Embo Shoes NY Yankees Cream Unisex Big Ball Chunky Embo Shoes NY Yankees Cream
                            </h1>
                            <div className={styles.productInfo2}>
                                <div className={styles.newPrice2}>800$</div>
                                <div className={styles.prevPrice2}>1000$</div>
                                <div className={styles.rateStar2}>
                                    <Star rate={randomRate} />
                                </div>
                            </div>
                            <Button classParent={styles.btnAdd2} content='Add to Cart' />
                        </div>
                        <div className={styles.salePrice}><div>Sale {randomSale2}%</div></div>
                    </div>
                </div>
                <div className={`absolute top-[118px] left-[143px] w-[373px] h-[383px] text-base text-gray-100 ${styles.framePro}`} >
                    <div className="absolute top-[0px] left-[50px] rounded-xl bg-white shadow-[0px_2px_10px_rgba(0,_0,_0,_0.25)] w-[323px] h-[383px]">
                        <div className={styles.imgProduct} data-aos="zoom-in">
                            <img src={imgBest} alt="imgProduct" />
                        </div>
                        <div className={styles.productBest} data-aos="zoom-in">
                            <h1 className={`${styles.productName} ${styles.limitText2}`}>
                                Unisex Big Ball Chunky Embo Shoes NY Yankees Cream
                            </h1>
                            <div className={styles.productInfo}>
                                <div className={styles.newPrice}>800$</div>
                                <div className={styles.prevPrice}>1000$</div>
                                <div className={styles.rateStar}>
                                    <Star rate={randomRate} />
                                </div>
                            </div>
                            <Button classParent={styles.btnAdd} content='Add to Cart' />
                        </div>
                        <div className={styles.salePrice2}>
                            <div>Sale {randomSale}%</div>
                        </div>

                    </div>
                </div>
            </div>
            <div className='w-full' style={{ height: '541px' }}></div >

            {/* Behind Welcome */}

            <div className={styles.popularProduct}>
                <h1 className={styles.popularTitle} data-aos="fade-up">POPULAR PRODUCT</h1>
                <p className={styles.popularDes} data-aos="fade-up">These exquisite ensemble is the epitome of modern sophistication, seamlessly blending style and comfort for the discerning fashionista. Crafted from premium, breathable fabrics, the ensemble features a tailored fit that accentuates your curves while providing all-day comfort. The chic design incorporates trendy patterns and a versatile color palette, ensuring you make a statement at any event, from casual outings to upscale soirées. With meticulous attention to detail and a commitment to quality</p>
                <div className={styles.popularFrame} data-aos="fade-up">
                    <div className={styles.leftPopFrame}>
                        <img src={setSport} alt="Set Sport IMG" />
                    </div>
                    <div className={styles.rightPopFrame}>
                        <h1 className={styles.rightTitle}>NEW STYLE SPORT</h1>
                        <h3 className={styles.rightPrice}>$1000</h3>
                        <Button classParent={styles.rightButton} content='BUY NOW' />
                    </div>
                </div>
            </div>

            <div className={styles.latestProduct}>
                <h1 className={styles.latestTitle}>LATEST PRODUCT</h1>
                <div className='grid grid-cols-5 gap-4'>
                    {/* {productData.slice(0, 10).map(({ thumb, title, price }) => ( */}
                    {/* {productData.map(({ thumb, title, price }) => (
                        <Product
                            key={Math.random()}
                            img={thumb}
                            title={title}
                            prevPrice={Number(price * 3)}
                            newPrice={price}
                        />
                    ))} */}
                    {productData.map(({ thumb, title, price }) => (
                        <MemoizedProduct
                            key={Math.random()}
                            img={thumb}
                            title={title}
                            prevPrice={Number(price * 3)}
                            newPrice={price}
                        />
                    ))}
                </div>
            </div>

        </>
    );
}

export default Home;
