import React from 'react'
import styles from './Card.module.scss'
import img from '~/pages/public/assets/ImgBestSeller/Shoe.jpeg'
import Star from '~/components/Star/Star'
import Button from '~/components/Button/Button'
import { Link } from 'react-router-dom'
import config from '~/config'

function Card({ id, img, title, newPrice, prevPrice }) {
  return (
    <>
      <div className={styles.Product} data-aos='fade-up' >
        <Link to={`${config.productdetail.replace(":id", id).replace(":title", title)}`} className={styles.imgProduct} data-aos="zoom-in">
          <img src={img} alt="Image Product" loading='lazy' />
        </Link>
        <div className={styles.productBelow} data-aos="zoom-in">
          <Link to={`${config.productdetail.replace(":id", id).replace(":title", title)}`} className={styles.productName}>{title}</Link>
          <div className={styles.productInfo}>
            <h3 className={styles.productNewPrice}>{`$${newPrice}`}</h3>
            <h3 className={styles.productPrevPrice}>{`$${prevPrice}`}</h3>
            <Star classParent={styles.productRate} rate='5' />
          </div>
          <Button cart={true} classParent={styles.btnProduct} content='Add to Cart' />
        </div>
      </div>
    </>
  )
}

export default Card