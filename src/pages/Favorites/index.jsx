import React from 'react';
import {api} from "../../config/api";
import useProducts from "../../hooks/useProducts";
import c from './Favorites.module.scss'
import ProductCard from "../../components/ProductCard";
import Loader from "../../components/Loader";
import Search from "../../components/Search";
import {BsArrowLeftShort, BsArrowRightShort} from "react-icons/bs";

function Favorites(props) {
  const [data, setData] = React.useState(null)
  const [filteredData, setFilteredData] = React.useState(null)
  const [categories, setCategories] = React.useState('All')
  const [refresh, setRefresh] = React.useState('')
  const [input, setInput] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(0)
  const [slice_1, setSlice_1] = React.useState(0)
  const [slice_2, setSlice_2] = React.useState(3)
  
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
  
  const token = localStorage.getItem('accessToken')
  const {base} = useProducts()
  
  let favArr = []
  
  React.useEffect(() => {
    api.getFavorites(token).then(r => {
      r.data?.map(item => {
        setData(r.data)
        return base?.map(el => el.id === item.product ? favArr.push(el) : '')
      })
      localStorage.setItem('favorites', JSON.stringify(favArr));
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
  
  
  if (!data) return <Loader/>
  if (favorites.length === 0) return <h1 style={{textAlign: 'center'}}>У вас нет избранных товаров</h1>
  return (
    <div className={c.favorites}>
      <Search setCategories={setCategories} setInput={setInput}/>
      <div className={c.container}>
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
  );
}

export default Favorites;