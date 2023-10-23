import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

const Card = ({item, addToCart, removeFromCart, cartItemIds}) => {

    const [present, setPresent] = useState()

    useEffect(()=>{
        for (const i in cartItemIds) {
            if (item && item.id == cartItemIds[i]) {
                setPresent(true)
                return
              
            }
          }
          setPresent(false)
    })
  return (
        <div className='item card' key={item.id}>
                <p>{item.name}</p>
               {
                present ?  <button className='hover click' onClick={e => removeFromCart(item.id)}>Remove From Cart</button>
                :  <button className='hover click' onClick={e => addToCart(item.id)}>Add to Cart</button>
               }
                <Link to={`/view/${item.id}`}><button className='hover click'>View</button></Link>
                <p>N{item.price}</p>
            </div>
  )
}

export default Card