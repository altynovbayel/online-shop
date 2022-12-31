import React from 'react';
import c from './Search.module.scss'
import {api} from "../../config/api";

function Search({setCategories, setInput}) {
  const [select, setSelect] = React.useState(null)
  const [active, setActive] = React.useState('All')
  const [activeBtn, setActiveBtn] = React.useState(false)
  
  
  React.useEffect(() => {
    api.getCategories().then(r => setSelect(r.data))
  }, [])
  
  return (
    <div className={c.search}>
      <input
        type="text"
        placeholder={active}
        onChange={(e) => setInput(e.target.value)}/>
      <div className={c.categories}>
        <div
          className={c.active}
          onClick={() => setActiveBtn(prev => !prev)}
        >
          {active}
        </div>
        <div
          className={activeBtn ? `${c.all_categories} ${c.all_categories_active}` : c.all_categories}
        >
          <div
            onClick={() => {
              setActive('All')
              setCategories('All')
              setActiveBtn(false)
            }}
            className={c.all_products}
          >
            All
          </div>
          {
            select?.map((item, i) => (
              <div
                key={i}
                onClick={() => {
                  setActive(item.title)
                  setCategories(item.id)
                  setActiveBtn(false)
                }}
              >
                {item.title}
              </div>
            ))
          }
          
        </div>
      </div>
    </div>
  );
}

export default Search;