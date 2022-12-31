import React from 'react';
import c from './Header.module.scss'
import {navbarList, socialLink} from "../../utils/list";
import {Link} from "react-router-dom";
import {GiHamburgerMenu} from "react-icons/gi";
import {FaUserAlt} from "react-icons/fa";

function Header() {
  const [burgerActive, setBurgerActive] = React.useState(false)
  
  return (
    <div className={c.header}>
      <div className={c.row}>
        <div className={c.logo}>
          <img src="/assets/logo.svg" alt="logo" />
        </div>
        <div
          className={c.burger}
          onClick={() => setBurgerActive(prev => !prev)}>
          <GiHamburgerMenu/>
        </div>
        <ul className={burgerActive ? `${c.navList} ${c.nav_active}` : c.navList}>
          {
            navbarList.map(item => {
              return(
                <li key={item.id} onClick={() => setBurgerActive(false)}>
                  <Link to={item.route}>
                    {item.title}
                  </Link>
                </li>
              )
            })
          }
         
        </ul>
        <ul className={c.iconList}>
          <li>
            <Link to={'auth/login'}>
              <FaUserAlt/>
            </Link>
          </li>
          {
            socialLink.map(item => {
              return(
                <li key={item.id} onClick={() => window.location.href=item.route }>
                  {item.icon}
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
}

export default Header;