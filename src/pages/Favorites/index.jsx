import React from 'react';
import {api} from "../../config/api";
import useProducts from "../../hooks/useProducts";
import c from './Favorites.module.scss'
import ProductCard from "../../components/ProductCard";
import Loader from "../../components/Loader";
import Search from "../../components/Search";

function Favorites(props) {
  const [data, setData] = React.useState(null)
  const [ refresh, setRefresh ] = React.useState('')
  const [filteredData, setFilteredData] = React.useState(null)
  const [categories, setCategories] = React.useState('All')
  const [input, setInput] = React.useState('')
  
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
    setFilteredData(favArr)
  }, [refresh])
  
  const favorites = JSON.parse(localStorage.getItem('favorites'))
  
  React.useEffect(() => {
    if (categories === 'All') {
      setFilteredData(favorites)
    } else {
      const base = favorites.filter(item => item.category === categories)
      setFilteredData(base)
    }
  }, [categories])
  
  React.useEffect(() => {
    const base = filteredData?.filter(item => item.title.toLowerCase().includes(input.toLowerCase()))
    input.length === 0 ? setFilteredData(favorites) : setFilteredData(base)
    
  }, [input])
  
  
  if(!data) return <Loader/>
  if (favorites.length === 0) return <h1 style={{textAlign: 'center'}}>У вас нет избранных товаров</h1>
  return (
    <div className={c.favorites}>
      <Search setCategories={setCategories} setInput={setInput}/>
      <div className={c.container}>
        {
          filteredData.length > 0 ?
          filteredData.map((item, id) => (
            <ProductCard key={id} {...item} page={'favorite'} fav={data} setRefresh={setRefresh}/>
          )) :  <h2>Нет избранных в этой категории</h2>
        }
      </div>
    </div>
  );
}

export default Favorites;