import Main from "./pages/Main";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import Products from "./pages/Products";
import Header from "./components/Header";
import More from "./pages/More";
import Profile from "./pages/Profile";
import * as Auth from './pages/AuthPages'
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";


axios.defaults.baseURL = 'https://cryxxen.pythonanywhere.com'

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path={'/'} element={<Main/>}/>
        <Route path={'/products'} element={<Products/>}/>
        <Route path={'/products/:id'} element={<More/>}/>
        <Route path={'/profile'} element={<Profile/>}/>
        <Route path={'/cart'} element={<Cart/>}/>
        <Route path={'/favorites'} element={<Favorites/>}/>
        <Route path={'/auth/register'} element={<Auth.Register/>}/>
        <Route path={'/auth/login'} element={<Auth.Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
