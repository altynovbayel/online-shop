import React from 'react';
import c from './Products.module.scss'
import {api} from "../../config/api";
import ProductCard from "../../components/ProductCard";
import Loader from "../../components/Loader";


function Products() {
  const [data, setData] = React.useState(null)
  React.useEffect(() => {
    api.getProducts().then(r => setData(r.data))
  }, [])
  
  if (!data) return <Loader/>
  return (
    <div className={c.products}>
      {
        data.map(item => (
          <ProductCard key={item.id} {...item}/>
        ))
      }
    </div>
  );
}

export default Products;