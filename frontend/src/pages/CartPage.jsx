import React from 'react'
import { useMyContext } from '../Components/Context'

const CartPage = () => {
  const {cart} = useMyContext()

  if(cart){
    return (
      <div>
          <div>
            <h2>My Cart</h2>
            <p>Total</p>
            <p>{cart.cart.total}</p>
          </div>
      </div>
    )
  }

  return (
    <div>
        <h1>cart</h1>
    </div>
  )
}

export default CartPage