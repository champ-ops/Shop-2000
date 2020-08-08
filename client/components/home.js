import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Catalog from './catalog'
import Header from './Header'
import { getProducts, getRates } from '../redux/reducers/shop'
import Basket from './cart'
import Logs from './logs'

const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProducts())
    dispatch(getRates())
  })
  return (
    <div>
      <Header />
      <div className="container mx-auto py-6">
        <Route exact path="/" component={() => <Catalog />} />
        <Route exact path="/basket" component={() => <Basket />} />
        <Route exact path="/logs" component={() => <Logs />} />
      </div>
    </div>
  )
}

Home.propTypes = {}

export default Home
