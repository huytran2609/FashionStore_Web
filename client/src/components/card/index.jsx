import React, { useState } from 'react'
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
import { Heart, Eye } from 'lucide-react'

function Card({ 
  id, 
  img, 
  title, 
  newPrice, 
  prevPrice, 
  color,
  totalRatings = 0,
  sold = 0,
  category = '',
  brand = ''
}) {
  const { isLoggedIn, current } = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Calculate discount percentage if prevPrice > newPrice
  const discount = prevPrice && prevPrice > newPrice 
    ? Math.round(((prevPrice - newPrice) / prevPrice) * 100) 
    : null;

  // Calculate average rating (0-5)
  const rating = totalRatings > 0 ? Math.min(totalRatings, 5) : 0;

  const handleClick = async() => {
    if (!isLoggedIn) {
      navigate('/login', { state: location?.pathname })
    } else {
        const selectedColor = Array.isArray(color) && color.length > 0 
          ? color[0] 
          : 'DefaultColor';
        const response = await apiCart({pid: id, color: selectedColor})
        if(response.success) {
          toast.success(response.mes)
          dispatch(getCurrent())
        }
    }
  }

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    toast.info(isFavorite ? 'Removed from favorites' : 'Added to favorites');
  }

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`${config.productdetail.replace(":id", id).replace(":title", title)}`);
  }

  return (
    <div 
      className={styles.Product} 
      data-aos='fade-up'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image Container */}
      <Link 
        to={`${config.productdetail.replace(":id", id).replace(":title", title)}`} 
        className={styles.imgProduct} 
        data-aos="zoom-in"
      >
        <div className={styles.imageWrapper}>
          <img src={img || '/placeholder.svg'} alt={title} loading='lazy' />
          
          {/* Discount Badge */}
          {discount && discount > 0 && (
            <div className={styles.discountBadge}>
              <span>-{discount}%</span>
            </div>
          )}

          {/* Category Badge */}
          {category && (
            <div className={styles.categoryBadge}>
              <span>{category}</span>
            </div>
          )}

          {/* Hover Actions */}
          <div className={`${styles.hoverActions} ${hovered ? styles.show : ''}`}>
            <button 
              className={styles.actionBtn}
              onClick={handleFavorite}
              aria-label="Add to favorites"
            >
              <Heart 
                className={`${styles.icon} ${isFavorite ? styles.iconFavorited : styles.iconNotFavorited}`}
                fill={isFavorite ? '#ef4444' : 'none'} 
                stroke={isFavorite ? 'none' : '#374151'}
              />
            </button>
            <button 
              className={styles.actionBtn}
              onClick={handleQuickView}
              aria-label="Quick view"
            >
              <Eye className={styles.icon} />
            </button>
          </div>

          {/* Glow Effect */}
          <div className={`${styles.glowEffect} ${hovered ? styles.active : ''}`}></div>
        </div>
      </Link>

      {/* Product Info */}
      <div className={styles.productBelow} data-aos="zoom-in">
        {/* Brand */}
        {brand && (
          <div className={styles.brand}>{brand}</div>
        )}

        {/* Title */}
        <Link 
          to={`${config.productdetail.replace(":id", id).replace(":title", title)}`} 
          className={styles.productName}
        >
          {title}
        </Link>

        {/* Rating and Reviews */}
        <div className={styles.ratingSection}>
          <Star classParent={styles.productRate} rate={rating} />
          {sold > 0 && (
            <span className={styles.soldCount}>{sold} sold</span>
          )}
        </div>

        {/* Price */}
        <div className={styles.productInfo}>
          <div className={styles.priceContainer}>
            <h3 className={styles.productNewPrice}>${newPrice}</h3>
            {prevPrice && prevPrice > newPrice && (
              <h3 className={styles.productPrevPrice}>${prevPrice}</h3>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <Button 
          onClick={handleClick} 
          cart={true} 
          classParent={styles.btnProduct} 
          content='Add to Cart'
          variant="card"
          useGradient={true}
        />
      </div>
    </div>
  )
}

export default Card
