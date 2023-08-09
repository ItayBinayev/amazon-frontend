import React, { useEffect, useReducer, useState } from 'react';
import "./HomePage.css"
import Products from '../Components/Products/Products';
import axios from "axios";
import { HomePageReducer, initState } from '../Reducers/HomePageReducer';
import { GET_REQUEST, GET_SUCCESS, GET_FAIL } from '../Reducers/Actions';
import Loading from '../Components/Loading/Loading';
import MsgBox from '../Components/MsgBox/MsgBox';

function HomePage() {
  // const [products, setProducts] = useState([]);
  const [{loading, error, products},dispatch] = useReducer(
    HomePageReducer,
    initState
  )

  useEffect(() => {
    const getProducts = async () => {
      dispatch({ type: GET_REQUEST })
      try{
        const res = await axios.get('/products')
        dispatch({ type: GET_SUCCESS,payload: res.data })
      }
      catch(error){
        dispatch({ type: GET_FAIL, payload: error.message })
      }
    }
    getProducts()
  },[])
  return (
  <div>
    <main>
    <h1>Products</h1>
    <div className='products'>
      {loading ? (<Loading/>) : error? (<MsgBox variant="danger">{error}</MsgBox>):(

    <Products products={products}></Products>
      ) }
    </div>
        </main>
    </div>
  )
}

export default HomePage;