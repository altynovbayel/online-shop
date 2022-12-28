import React from 'react';
import {api} from "../../config/api";
import useProducts from "../../hooks/useProducts";
import c from './Favorites.module.scss'
import ProductCard from "../../components/ProductCard";
import Loader from "../../components/Loader";

function Favorites(props) {
  const [data, setData] = React.useState(null)
  const [ refresh, setRefresh ] = React.useState('')
  const token = localStorage.getItem('accessToken')
  const {base} = useProducts()
  
  let favArr = []
  
  React.useEffect(() => {
    api.getFavorites(token).then(r => {
      r.data?.map(item => {
        setData(r.data)
        return base?.map(el => el.id === item.product ? favArr.push(el) : '')
      })
      localStorage.setItem('favorites' , JSON.stringify(favArr));
    })
    setTimeout(() => {
      setRefresh('hello')
    }, 1000)
  }, [refresh])
  
  const favorites = JSON.parse(localStorage.getItem('favorites'))
  
  if(!data) return <Loader/>
  if (favorites.length === 0) return <h1 style={{textAlign: 'center'}}>У вас нет избранных товаров</h1>
  return (
    <div className={c.favorites}>
      {
        favorites &&
        favorites.map((item, id) => (
          <ProductCard key={id} {...item} page={'favorite'} fav={data} setRefresh={setRefresh}/>
        ))
      }
    </div>
  );
}

export default Favorites;