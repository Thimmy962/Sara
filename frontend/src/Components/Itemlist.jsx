import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import Card from './Card'

const Itemlist = ({items, addToCart, removeFromCart, cartItemIds}) => {
  return (
    <div id='itemlist'>
        {items && (items.map(item=>(
            // <div className='item' key={item.id}>
            //     <p>{item.name}</p>
            //     <button onClick={e => addToCart(item.id)}>Add to Cart</button>
            //     <Link to={`/view/${item.id}`}><button className='click'>View</button></Link>
            //     <p>N{item.price}</p>
            // </div>
            <Card key={item.id} {...{item, addToCart, removeFromCart, cartItemIds}}/>
            )))}
    </div>
  )
}

export default Itemlist