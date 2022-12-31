import React from 'react';
import c from './Products.module.scss'
import {api} from "../../config/api";
import ProductCard from "../../components/ProductCard";
import Loader from "../../components/Loader";
import Search from "../../components/Search";
import {BsArrowLeftShort, BsArrowRightShort} from "react-icons/bs";


function Products() {
  const [data, setData] = React.useState(null)
  const [filteredData, setFilteredData] = React.useState(null)
  const [categories, setCategories] = React.useState('All')
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
  
  React.useEffect(() => {
    api.getProducts().then(r => {
      setData(r.data)
      setFilteredData(r.data)
    })
  }, [])
  
  React.useEffect(() => {
    if (categories === 'All') {
      setFilteredData(data)
    } else {
      const base = data.filter(item => item.category === categories)
      setFilteredData(base)
    }
  }, [categories])
  
  React.useEffect(() => {
    const base = filteredData?.filter(item => item.title.toLowerCase().includes(input.toLowerCase()))
    input.length === 0 ? setFilteredData(data) : setFilteredData(base)
    
  }, [input])
  
  
  if (!data) return <Loader/>
  return (
    <div className={c.products}>
      <Search
        setCategories={setCategories}
        setInput={setInput}
      />
      <div className={c.container}>
        {
          filteredData.length <= 3
            ? filteredData?.map(item => (
              <ProductCard key={item.id} {...item}/>
            )) :
          filteredData?.length > 3 ?
            filteredData?.slice(slice_1, slice_2).map(item => (
              <ProductCard key={item.id} {...item}/>
            )) : <h2>Нет товаров в этой категории</h2>
        }
      </div>
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
    </div>
  );
}

export default Products;