import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

const getDataFromLS = () => {
  const data = localStorage.getItem('cartList')

  if (data) {
    return JSON.parse(data)
  }
  return {}
}

class App extends Component {
  state = {
    cartList: getDataFromLS(),
  }

  addCartItem = product => {
    const {cartList} = this.state
    let itExistsAlready = false
    const addingList = cartList.map(eachObject => {
      if (eachObject.id === product.id) {
        itExistsAlready = true
        const quantity = eachObject.quantity + product.quantity

        return {...eachObject, quantity}
      }
      return eachObject
    })

    if (itExistsAlready) {
      this.setState({cartList: addingList})
    } else {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, product],
      }))
    }
  }

  deleteCartItem = id => {
    const {cartList} = this.state
    console.log(id)

    const filteredList = cartList.filter(eachElement => eachElement.id !== id)
    this.setState({cartList: filteredList})
  }

  incrementCartItem = id => {
    const {cartList} = this.state
    const requiredObj = cartList.filter(eachObj => eachObj.id === id)
    const quantity = requiredObj[0].quantity + 1
    const updatedList = cartList.map(eachElement => {
      if (eachElement.id === id) {
        return {...eachElement, quantity}
      }
      return eachElement
    })

    this.setState({cartList: updatedList})
  }

  decrementCartItem = id => {
    const {cartList} = this.state
    const requiredObj = cartList.filter(eachObj => eachObj.id === id)

    const checkingQuantity = requiredObj[0].quantity
    if (checkingQuantity > 1) {
      const quantity = requiredObj[0].quantity - 1

      const updatedList = cartList.map(eachElement => {
        if (eachElement.id === id) {
          return {...eachElement, quantity}
        }
        return eachElement
      })

      this.setState({cartList: updatedList})
    }
  }

  emptyCartList = () => {
    this.setState({cartList: []})
  }

  onSetLocalStorage = list => {
    localStorage.setItem('cartList', JSON.stringify(list))
  }

  render() {
    const {cartList} = this.state
    this.onSetLocalStorage(cartList)

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            deleteCartItem: this.deleteCartItem,
            decrementCartItem: this.decrementCartItem,
            incrementCartItem: this.incrementCartItem,
            emptyCartList: this.emptyCartList,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
