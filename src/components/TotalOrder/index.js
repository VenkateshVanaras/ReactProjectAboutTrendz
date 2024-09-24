import CartContext from '../../context/CartContext'

import './index.css'

const TotalOrder = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const cartItems = cartList.length
      let totalAmount = 0

      let i = 0
      while (i < cartItems) {
        totalAmount += cartList[i].quantity * cartList[i].price
        // Code to be repeated
        i += 1
      }

      return (
        <div className="app-container">
          <div className="card-container">
            <h2 className="heading">
              Order Total:{' '}
              <span className="money-decoration">Rs {totalAmount}/-</span>
            </h2>
            <p className="para">{cartItems} items in Cart</p>
            <button className="button-class" type="button">
              Continue
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default TotalOrder
