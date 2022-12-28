import React from 'react';
import c from './Main.module.scss'

import Banner from "../../components/Banner";
import {api} from "../../config/api";
import ProductCard from "../../components/ProductCard";
import {Link, useNavigate} from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import Loader from "../../components/Loader";

function Main() {
  const {base} = useProducts()
  const navigate = useNavigate()
  
  

  if (!base) return <Loader/>
  return (
    <div className={c.main}>
      <Banner/>
      <div className={c.product_cards}>
        <div className={c.card_block}>
          {
            base?.reverse().slice(0, 4)
              .map(item => {
                return (
                  <ProductCard key={item.id} {...item} page={'main'}/>
                )
              })
          }
        </div>
        <Link to={'/products'}>
          Смотреть больше
        </Link>
      </div>
    </div>
  );
}

export default Main;