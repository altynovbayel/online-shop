import React from 'react';
import c from '../Header/Header.module.scss'

function Banner() {
  return (
    <div className={c.banner}>
      <img src="/assets/banner.svg" alt="" />
      <p>на каждый день</p>
    </div>
  );
}

export default Banner;