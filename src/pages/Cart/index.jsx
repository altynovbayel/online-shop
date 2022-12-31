import React from 'react';
import {api} from "../../config/api";
import c from './Cart.module.scss'
import {AiOutlineDelete, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import Loader from "../../components/Loader";
import {useNavigate} from "react-router-dom";

function Cart() {
  const [data, setData] = React.useState(null)
  
  const baseUrl = 'https://cryxxen.pythonanywhere.com/'
  
  const accessToken = localStorage.getItem('accessToken')
  
  const navigate = useNavigate()
  
  const getData = () => api.getBasket(accessToken).then(r => setData(r.data))
  
  React.useEffect(() => {
    getData()
  }, [])
  
  const changeCount = (id, count) => {
    if(accessToken) {
      api.changeCount(accessToken,
        {"product": JSON.stringify(id),  "amount":JSON.stringify(count)})
        .then(r => console.log(r))
    } else {
      alert('Вы не авторизованы!')
      navigate('/auth/login')
    }
  }
  
  const initialValue = 0;
  const priceSum = data?.reduce((accum, item) => item.total + accum, initialValue)
  

  
  const deleteProduct = (id) => {
    api.deleteBasketCard(id, accessToken).then(r => r && getData())
  }
 
  if(!data) return  <Loader/>
  if (data.length === 0) return <h1 style={{textAlign: 'center'}}>ваша корзина пустая</h1>
  return (
    <div className={c.cart}>
      <div className={c.cart_background}>
        <img src="/assets/cart-background.svg" alt="" />
      </div>
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
                  <button
                    onClick={() => changeCount(item.products_data[0].id, item.products_data[0].amount--)}
                    disabled={item.products_data[0].amount <= 1}
                  >
                    <AiOutlineMinus/>
                  </button>
                  {item.products_data[0].amount}
                  <button  onClick={() => {
                    changeCount(item.id, item.products_data[0].amount++)
                    console.log(item.id)
                  }}>
                    <AiOutlinePlus />
                  </button>
                </div>
                <div className={c.price}>
                  стоимость: {item.products_data[0].price * item.products_data[0].amount}сом
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
      <div className={c.totalSum}>
        <span>Итого: {priceSum}сом</span>
      </div>
    </div>
  );
}

export default Cart;