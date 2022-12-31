import React, {useState} from 'react';
import {api} from "../config/api";

function UseProducts(props) {
  const [base, setBase] = useState(null)
  
  React.useEffect(() => {
    api.getProducts().then(r => setBase(r.data))
  }, [])
  
  return {
    base
  };
}

export default UseProducts;