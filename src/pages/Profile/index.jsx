import React from 'react';
import {Link} from "react-router-dom";
import c from './Profile.module.scss'
import {api} from "../../config/api";
import Loader from "../../components/Loader";
import ProductCard from "../../components/ProductCard";
import Search from "../../components/Search";

function Profile() {
  const [data, setData] = React.useState(null)
  const [favorite, setFavorite] = React.useState(null)
  const [categories, setCategories] = React.useState('')
  const [input, setInput] = React.useState('')
  const [filteredData, setFilteredData] = React.useState(null)
  const [refresh, setRefresh] = React.useState('')
  
  const token = localStorage.getItem('accessToken')
  
  React.useEffect(() => {
    api.getUser(token).then(r => setData(r.data))
    setFavorite(JSON.parse(localStorage.getItem('favorites')))
    setFilteredData(JSON.parse(localStorage.getItem('favorites')))
  }, [])
  
  React.useEffect(() => {
    if (categories === 'All') {
      setFilteredData(favorite)
    } else {
      const base = favorite?.filter(item => item.category === categories)
      setFilteredData(base)
    }
  }, [categories])
  
  React.useEffect(() => {
    const base = filteredData?.filter(item => item.title.toLowerCase().includes(input.toLowerCase()))
    input.length === 0 ? setFilteredData(favorite) : setFilteredData(base)
  }, [input])
  
  if (!data) return <Loader/>
  return (
    <div>
      <div className={c.profile}>
        <div className={c.container}>
          <div className={c.left_side}>
            <div className={c.username}>
              <span>Имя:</span>
              <h3>{data.username}</h3>
            </div>
            <div className={c.email}>
              <span>Почта:</span>
              <h3>{data.email}</h3>
            </div>
            <div className={c.phone}>
              <span>Номер:</span>
              <h3>{data.phone_number}</h3>
            </div>
          </div>
          <div className={c.right_side}>
            <div className={c.date}>
              <span>Дата рождение:</span>
              <h3>{data.birth_date}</h3>
            </div>
            <div className={c.about}>
              <span>О себе:</span>
              <h3>{data.about}</h3>
            </div>
          </div>
        </div>
      </div>
      <div className={c.favorite_block}>
        <h3>Ваши избранные товары</h3>
        <Search setCategories={setCategories} setInput={setInput}/>
        <div className={c.favorite_container}>
          {
            filteredData?.length > 0 ?
            filteredData?.map((item, index) => (
              <ProductCard key={index} {...item}/>
            )) : <h2>Нет избранных в этой категории</h2>
          }
        </div>
      </div>
    </div>
  );
}

export default Profile;