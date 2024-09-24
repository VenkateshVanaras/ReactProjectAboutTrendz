import Header from '../Header'
import CartListView from '../CartListView'

import EmptyCartView from '../EmptyCartView'

import TotalOrder from '../TotalOrder'

import CartContext from '../../context/CartContext'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, emptyCartList} = value
      const cartListLength = cartList.length === 0

      const onMakeCartEmpty = () => {
        emptyCartList()
      }
      return (
        <>
          <Header />
          {cartListLength ? (
            <EmptyCartView />
          ) : (
            <div className="cart-container">
              <div className="cart-content-container">
                <div className="cart-remove-text-container">
                  <h1 className="cart-heading">My Cart</h1>
                  <button
                    onClick={onMakeCartEmpty}
                    type="button"
                    className="remove-text"
                  >
                    Remove All
                  </button>
                </div>
                <CartListView />
                <TotalOrder />
              </div>
            </div>
          )}
        </>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
