import {FaInstagram, FaTelegramPlane, FaWhatsapp} from "react-icons/fa";

export const navbarList = [
  {
    id: 1,
    route: '/',
    title: 'Главная',
  },
  {
    id: 2,
    route: '/products',
    title: 'Товары',
  },
  {
    id: 3,
    route: '/about',
    title: 'О нас',
  },
  {
    id: 4,
    route: '/profile',
    title: 'профиль',
  },
  {
    id: 5,
    route: '/cart',
    title: 'корзина',
  },
  {
    id: 6,
    route: '/favorites',
    title: 'избранные',
  },
]

export const socialLink = [
  {
    id:1,
    route: 'https://t.me/bbayell',
    icon: <FaTelegramPlane/>
  },
  {
    id:2,
    route: 'https://wa.me/996704708090',
    icon: <FaWhatsapp/>
  },
  {
    id:3,
    route: 'https://instagram.com/bbayell?igshid=YTY2NzY3YTc=',
    icon: <FaInstagram/>
  },
]