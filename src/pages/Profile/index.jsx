import React from 'react';
import {Link} from "react-router-dom";
import c from './Profile.module.scss'
import {api} from "../../config/api";
import Loader from "../../components/Loader";
import ProductCard from "../../components/ProductCard";

function Profile(props) {
  const [data, setData] = React.useState(null)
  const [favorite, setFavorite] = React.useState(null)
  const token = localStorage.getItem('accessToken')
  React.useEffect(() => {
    api.getUser(token).then(r => setData(r.data))
    setFavorite(JSON.parse(localStorage.getItem('favorites')))
  }, [])
  
  if (!data) return <Loader/>
  return (
    <div>
      <Link to={'/auth/login'}>
        Вход
      </Link>
      <Link to={'/auth/register'}>
        Регисрация
      </Link>
      
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
        <div className={c.favorite_container}>
          {
            favorite &&
            favorite.map((item, index) => (
              <ProductCard key={index} {...item}/>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Profile;