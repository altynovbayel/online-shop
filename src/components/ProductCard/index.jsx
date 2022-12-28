import React from 'react';
import c from './ProductCard.module.scss'
import {useNavigate} from 'react-router-dom'
import {MdOutlineFavorite, MdOutlineFavoriteBorder} from "react-icons/md";
import {api} from "../../config/api";

function ProductCard({image, price, title, id, is_active, page, fav, setRefresh}) {
  const [data, setData] = React.useState(null)
  const [singleFavorite, setSingleFavorite] = React.useState(null)
  const navigate = useNavigate()
  
  
  const accessToken = localStorage.getItem('accessToken')
  
  const singleCard = (id) => api.getSingleProduct(id)
  
  const addToBasket = (id) => {
    singleCard(id).then(r => setData(r.data))
    if (accessToken) {
      if (data) {
        api.postBasket(accessToken, {
          products: [JSON.stringify(data.id)],
          s_active: data.is_active,
        })
          .then(r => r && alert('ваш товар в корзине'))
      }
    } else {
      alert('Вы не авторизованы!')
      navigate('/auth/register')
    }
  }
  
  const addToFavorite = (id) => {
    console.log(id)
    if (accessToken) {
      api.postFavorites(accessToken, {product: id, is_active: is_active})
        .then(r => r.data.Error ? alert('Он уже в избранном') : alert('вы добавили в избранные'))
    } else {
      alert('Вы не авторизованы!')
      navigate('/auth/register')
    }
  }
  
  const deleteFavorite = id => {
    const obj = fav?.find(item => item.product === id ? item.id : '')
    if (accessToken) {
      api.deleteSingleFavorite(accessToken, obj.id)
        .then(r => r && setRefresh('update'))
    } else {
      alert('Вы не авторизованы!')
      navigate('/auth/register')
    }
  }
  
  return (
    <div className={c.card}>
      <img src={image} alt="image" onClick={() => navigate(`/products/${id}`)}/>
      <div className={c.card_info}>
        <p className={c.card_title}>
          {title.length > 20 ? title.split('').slice(0, 19).join('') : title}
        </p>
        <div className={c.bottom_text}>
          <p className={c.card_price}>
            {price} сом
          </p>
        </div>
        <div className={c.card_btn}>
          <button
            className={c.busket}
            onClick={() => addToBasket(id)}
          >
            В корзину
          </button>
          {
            page === 'favorite' ?
              <button
                className={c.favorite}
                onClick={() => deleteFavorite(id)}
              >
                <MdOutlineFavorite/>
              </button> :
              <button
                className={c.favorite}
                onClick={() => addToFavorite(id)}
              >
                <MdOutlineFavoriteBorder/>
              </button>
          }
        
        </div>
      </div>
    </div>
  );
}

export default ProductCard;