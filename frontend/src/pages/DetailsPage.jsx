import React, { useState, useEffect } from 'react'
import { useMyContext } from '../Components/Context'

const DetailsPage = ({match, history}) => {
    const id = match.params.id
    const [item, setItem] = useState()
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const {addToCart, removeFromCart, cart, cartItemIds} = useMyContext()
    const [present, setPresent] = useState()
    
    const getItem = async () =>{

      let res = await fetch(`http://localhost:8000/getitem/${id}`, {
        method:"GET",
        headers:{"Content-Type":"application/json"}
      })
      if(res.status != 200){
        setError(true)
        setLoading(false)
        return
      }
      setItem(await res.json())
      setError(false)
      setLoading(false)
    }

    let goback=()=>{
        history.goBack()
    }

  

    useEffect(()=>{
      getItem()

      for (const i in cartItemIds) {
        if (item && item.id == cartItemIds[i]) {
            setPresent(true)
            return
          
        }
      }
      setPresent(false)
    })

  return (
    <div id='details'>
      {/* If there`s no error and loading is complete */}
        {!error && !loading ? <>
          <div id='detailhead'>
            <p className="click" onClick={goback}>Back</p>
            {
                present ?
                  <button className='click' onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
                
                :
                  <button className='click' onClick={() => addToCart(item.id)}>Add to Cart</button>

              }
        </div>
         <div>
              <img src="" alt="" />
              <h2>{item.name}</h2>
              <p>N{item.price}</p>
          </div>
        
        </> : 
        // If there`s no error and loading is not complete
        !error && loading ?
        <>
          <div id='detailhead'>
            <p className="click" onClick={goback}>Back</p>
        </div>
        <h1>Loading</h1>
        </> : 
          // if there`s error
        <>
          <h1>Item not found</h1>
        </>}

    </div>
  )
}

export default DetailsPage