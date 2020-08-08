import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToSelection, removeFromSelection, sortCatalog } from '../redux/reducers/shop'

const Catalog = () => {
  const products = useSelector((s) => s.shop.products)
  const rates = useSelector((s) => s.shop.rates)
  const base = useSelector((s) => s.shop.base)
  const selection = useSelector((s) => s.shop.selection)
  const dispatch = useDispatch()
  const currency = {
    USD: '$',
    EUR: '€',
    CAD: 'C$'
  }
  return (
    <div>
      <select className="mb-3" onChange={(e) => dispatch(sortCatalog(e.target.value))}>
        <option value="">Sort by</option>
        <option value="lowest">Lowest</option>
        <option value="highest">Highest</option>
      </select>
      <div className="flex flex-wrap -mx-3">
        {products.map((el) => (
          <div key={el.id} className="w-1/4 px-3 mb-3 text-center">
            <div className="border-2 border-gray-200">
              <img src={el.image} alt="" className="inline-block" />
              <h4>{el.title}</h4>
              <p>
                {(el.price * (rates[base] || 1)).toFixed(2)} {currency[base]}
              </p>
              <div className="select-btn flex justify-center my-3">
                <button
                  type="button"
                  className="border-2 border-gray-300 px-3"
                  onClick={() => dispatch(removeFromSelection(el.id))}
                >
                  -
                </button>
                <span className="mx-6">{selection[el.id] || 0}</span>
                <button
                  type="button"
                  className="border-2 border-gray-300 px-3"
                  onClick={() => dispatch(addToSelection(el.id))}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Catalog
