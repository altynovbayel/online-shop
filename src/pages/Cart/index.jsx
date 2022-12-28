import React from 'react';
import {api} from "../../config/api";
import ProductCard from "../../components/ProductCard";
import c from './Cart.module.scss'
import useProducts from "../../hooks/useProducts";
import {AiOutlineDelete, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import Loader from "../../components/Loader";

function Cart() {
  const [data, setData] = React.useState(null)
  const [count, setCount] = React.useState(1)
  
  const baseUrl = 'https://cryxxen.pythonanywhere.com/'
  
  const accessToken = localStorage.getItem('accessToken')
  
  const getData = () => api.getBasket(accessToken).then(r => setData(r.data))
  
  React.useEffect(() => {
    getData()
  }, [])
  
  const changeCount = (id) => {
    console.log(id)
    // api.changeCount(accessToken,id, count).then(r => console.log(r))
  }
  
  const deleteProduct = (id) => {
    api.deleteBasketCard(id, accessToken).then(r => r && getData())
  }
  
  if(!data) return  <Loader/>
  if (data.length === 0) return <h1 style={{textAlign: 'center'}}>ваша корзина пустая</h1>
  return (
    <div className={c.cart}>
      {
        data.map((item, id) => (
          <div className={c.cart_product} key={id}>
            <div className={c.cart_img}>
              <img src={`${baseUrl}${item.products_data[0].image}`} alt="image"/>
            </div>
            <div className={c.cart_info}>
              <h2>
                {
                  item.products_data[0].title.length > 20
                    ? item.products_data[0].title.split('').slice(0, 19).join('')
                    : item.products_data[0].title
                }
              </h2>
              <div className={c.cart_count}>
                <div className={c.counter}>
                  кол-во:
                  <button onClick={() => setCount(prev => prev - 1)} disabled={count <= 1}>
                    <AiOutlineMinus/>
                  </button>
                  {count}
                  <button onClick={() => changeCount(item.products_data[0].id)}>
                    <AiOutlinePlus />
                  </button>
                </div>
                <div className={c.price}>
                  стоимость: {item.products_data[0].price}
                </div>
              </div>
            </div>
            <button
              className={c.delete_btn}
              onClick={() => deleteProduct(item.id)}
            >
              <AiOutlineDelete/>
            </button>
          </div>
        ))
      }
    </div>
  );
}

export default Cart;