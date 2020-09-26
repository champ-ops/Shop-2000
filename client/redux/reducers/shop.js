import axios from 'axios'

const SET_RATES = '@@SET_RATES'
const SET_BASE = '@@SET_BASE'
const SORT_CATALOG = '@@SORT_CATALOG'
const SET_CATALOG = '@@SET_CATALOG'

const initialState = {
  products: [],
  selection: {},
  rates: {},
  base: 'EUR'
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CATALOG:
      return { ...state, products: action.products }
    case 'ADD_SELECTION':
      return {
        ...state,
        selection: { ...state.selection, [action.id]: (state.selection[action.id] || 0) + 1 }
      }
    case 'REMOVE_SELECTION': {
      const newSelection = {
        ...state.selection,
        [action.id]: (state.selection[action.id] || 0) - 1
      }
      if (newSelection[action.id] <= 0) {
        delete newSelection[action.id]
      }
      return { ...state, selection: newSelection }
    }
    case SET_RATES:
      return { ...state, rates: action.rates }
    case SET_BASE:
      return { ...state, base: action.val }
    case SORT_CATALOG:
      return { ...state, products: action.products }
    default:
      return state
  }
}

export function getProducts() {
  return (dispatch) => {
    axios('/api/v1/products').then(({ data }) =>
      dispatch({ type: '@@SET_CATALOG', products: data.products })
    )
  }
}

export function addToSelection(id) {
  return { type: 'ADD_SELECTION', id }
}

export function removeFromSelection(id) {
  return { type: 'REMOVE_SELECTION', id }
}

export function getRates() {
  return (dispatch) => {
    axios
      .get('/api/v1/rates')
      .then(({ data: { rates } }) => dispatch({ type: '@@SET_RATES', rates }))
  }
}

export function setBase(val) {
  return { type: SET_BASE, val }
}

export function sortCatalog(sortType) {
  return (dispatch, getState) => {
    const catalog = [...getState().shop.products]
    if (sortType === 'lowest') {
      catalog.sort((a, b) => a.price - b.price)
    }
    if (sortType === 'highest') {
      catalog.sort((a, b) => b.price - a.price)
    }
    return dispatch({ type: '@@SORT_CATALOG', products: catalog })
  }
}
