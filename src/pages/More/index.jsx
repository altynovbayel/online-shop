import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {api} from "../../config/api";
import c from './More.module.scss'
import {MdOutlineFavorite, MdOutlineFavoriteBorder} from "react-icons/md";
import Loader from "../../components/Loader";
import ProductCard from "../../components/ProductCard";

function More() {
  const [data, setData] = React.useState(null)
  const [check, setCheck] = useState(false)
  const [reload, setReload] = useState('')
  const [categoryData, setCategoryDara] = React.useState(null)
  
  const {id} = useParams()
  const accessToken = localStorage.getItem('accessToken')
  const navigate = useNavigate()
  
  React.useEffect(() => {
    api.getSingleProduct(id).then(r => setData(r.data))
    api.getFavorites(accessToken).then(r => r.data?.find(item => item.product === parseInt(id) ? setCheck(item) : null))
    api.getSingleCategories(data?.category).then(r => setCategoryDara(r.data.product_category))
    setTimeout(() => {
      setReload('1')
    }, 1000)
    
  }, [reload])
  
  console.log(categoryData)
  
  const addToBasket = () => {
    api.postBasket(accessToken, {
      products: [JSON.stringify(data.id)],
      s_active: data.is_active,
    })
      .then(r => console.log(r))
  }
  
  const addToFavorite = () => {
    if (accessToken) {
      api.postFavorites(accessToken, {product: id, is_active: data.is_active}).then(r => r && setReload('added'))
    } else {
      alert('Вы не авторизованы!')
      navigate('/auth/register')
    }
  }
  
  const deleteFavorite = () => {
    if (accessToken) {
      api.deleteSingleFavorite(accessToken, check.id).then(r => r && setReload('update'))
      alert('вы удалили из избранных')
    } else {
      alert('Вы не авторизованы!')
      navigate('/auth/register')
    }
  }
  
  
  
  if(!data) return <Loader/>
  return (
    <div className={c.more}>
      <div className={c.container}>
        <div className={c.product_img}>
          <img src={data.image} alt="" />
        </div>
        <div className={c.product_info}>
          <h2>{data.title}</h2>
          
          <p>{data.price}</p>
          <div className={c.product_btn}>
            <button
              className={c.busket}
              onClick={() => addToBasket()}
            >
              В корзину
            </button>
            {
              check
                ? <button onClick={deleteFavorite}><MdOutlineFavorite/></button>
                : <button onClick={addToFavorite}><MdOutlineFavoriteBorder/></button>
            }
          </div>
        </div>
      </div>
      {
      }
    </div>
  );
}

export default More;