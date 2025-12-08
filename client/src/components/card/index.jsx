import React from 'react'
import styles from './Card.module.scss'
import Star from '~/components/star'
import Button from '~/components/button'
import { Link } from 'react-router-dom'
import config from '~/config'
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { apiCart } from '~/apis/user'
import { toast } from 'react-toastify'
import { getCurrent } from '~/redux/features/slices/asyncActions'
function Card({ id, img, title, newPrice, prevPrice, color }) {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const handleClick = async() => {
    if (!isLoggedIn) {
      Navigate('/login', { state: location?.pathname })
    } else {
        if(color.length === 0) {
          color = 'DefaultColor'
        }
        else {
          color = color[0]
        }
        const response = await apiCart({pid: id, color: color})
        if(response.success) {
          toast.success(response.mes)
          dispatch(getCurrent())
        }
    }
  }
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
          <Button onClick={handleClick} cart={true} classParent={styles.btnProduct} content='Add to Cart' />
        </div>
      </div>
    </>
  )
}

export default Card

