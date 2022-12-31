import React from 'react';
import {Link} from "react-router-dom";
import c from './Profile.module.scss'
import {api} from "../../config/api";
import Loader from "../../components/Loader";
import ProductCard from "../../components/ProductCard";
import Search from "../../components/Search";
import {BsArrowLeftShort, BsArrowRightShort} from "react-icons/bs";

function Profile() {
  const [data, setData] = React.useState(null)
  const [favorite, setFavorite] = React.useState(null)
  const [categories, setCategories] = React.useState('')
  const [input, setInput] = React.useState('')
  const [filteredData, setFilteredData] = React.useState(null)
  const [refresh, setRefresh] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(0)
  const [slice_1, setSlice_1] = React.useState(0)
  const [slice_2, setSlice_2] = React.useState(3)
  
  const token = localStorage.getItem('accessToken')
  
  const pageSize = 3
  const countPage = Math.floor(filteredData?.length / pageSize)
  
  const nextPage = () => {
    if (currentPage < countPage) {
      setCurrentPage(prev => prev + 1)
      setSlice_1(prev => prev + 3)
      setSlice_2(prev => prev + 3)
    }
  }
  
  const prevPage = () => {
    if (currentPage >= 1) {
      setCurrentPage(prev => prev - 1)
      setSlice_1(prev => prev - 3)
      setSlice_2(prev => prev - 3)
    }
  }
  
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
            filteredData?.length <= 3
              ? filteredData?.map(item => (
                <ProductCard
                  key={item.id}
                  {...item}
                  page={'favorite'}
                  fav={data}
                  setRefresh={setRefresh}
                />
              ))
              : filteredData?.length > 3
                ? filteredData?.slice(slice_1, slice_2).map(item => (
                  <ProductCard
                    key={item.id}
                    {...item}
                    page={'favorite'}
                    fav={data}
                    setRefresh={setRefresh}
                  />
                ))
                : <h2>Нет избранных в этой категории</h2>
          }
        </div>
        {
          filteredData?.length > 3 &&
          <div className={c.pagination}>
            <div>
            <span onClick={prevPage}>
              <BsArrowLeftShort/>
            </span>
              <span>{currentPage + 1} / {countPage + 1}</span>
              <span onClick={nextPage}>
              <BsArrowRightShort/>
            </span>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default Profile;