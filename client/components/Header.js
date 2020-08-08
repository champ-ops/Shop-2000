import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setBase } from '../redux/reducers/shop'

const Header = () => {
  const selection = useSelector((s) => s.shop.selection)
  const quantity = Object.keys(selection).reduce((acc, rec) => acc + selection[rec], 0)
  const dispatch = useDispatch()
  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap bg-gray-600 p-6">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          {['USD', 'EUR', 'CAD'].map((val) => {
            return (
              <button
                key={val}
                type="button"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-3"
                onClick={() => dispatch(setBase(val))}
              >
                {val}
              </button>
            )
          })}
        </div>
        <div>
          <NavLink to="/" className="text-white mr-3">
            Main
          </NavLink>
          <NavLink to="/basket" className="text-white mr-3">
            Cart({quantity})
          </NavLink>
          <NavLink to="/logs" className="text-white mr-3">
            Logs
          </NavLink>
        </div>
      </nav>
    </div>
  )
}
export default Header
