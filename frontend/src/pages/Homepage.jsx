import React, {useState, useEffect} from 'react'
import Itemlist from '../Components/Itemlist'
import { useMyContext } from '../Components/Context'

const Homepage = () => {
    const [items, setItems] = useState()
    const {addToCart, removeFromCart, cartItemIds} = useMyContext()

    useEffect(()=>{
        getMajor()
    }, [])

    let getMajor=async()=>{
        let res = await fetch("http://localhost:8000/getitems",{
            method:"GET",
            headers:{
                "COntent-Type": "application/json"
            }
        })
        let data = await res.json()
        setItems(data)
    }
  return (
    <div id='homepage'>
            {items ? <Itemlist {...{items, addToCart, removeFromCart, cartItemIds}} /> : (<h1>Loading...</h1>)}
    </div>
  )
}

export default Homepage