import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  deleteCartItem: () => {},
  decrementCartItem: () => {},
  incrementCartItem: () => {},
  emptyCartList: () => {},
})

export default CartContext
