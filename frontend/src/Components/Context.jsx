import { createContext, useContext, useEffect, useState } from 'react';

const MyContext = createContext();

export const useMyContext = () => {
  return useContext(MyContext);
};

export const ContextProvider = ({ children }) => {
    const [cart_id, setCart_id] = useState(()=>localStorage.getItem('cart_id') ? localStorage.getItem('cart_id') : null)
    const [cart, setCart] = useState()
    const [error, setError] = useState(null)

    // const [cart, setCart] = useState()

    let getCart=async()=> {
      if(!cart_id){
        setCart("")
        return
      }
      let res = await fetch(`http://localhost:8000/getcart/${cart_id}`,{
        method:"GET",
        headers:{"Content-Type": "application/json"}
      })
      if(res.status == 200){
        let data = await res.json()
        setCart(data)
      }
      else{
        setError("This Cart does not exist")
      }
    };

    let addToCart= async(item_id) => {
      let url;
      if(cart_id)
      {
        url = `http://localhost:8000/addtocart2/${item_id}/${cart_id}/`;
      }
      else {url = `http://localhost:8000/addtocart1/${item_id}/`;}
      let res = await fetch(url,{
        method:"POST",
        headers:{"Content-Type": "application/json"}
      })
      let data = await res.json()
      setCart(data)
      setCart_id(data.cart.id)
      localStorage.setItem("cart_id", data.cart.id)
      
    };

    let removeFromCart = async(item_id) => {
      let res = await fetch(`http://localhost:8000/removefromcart/${item_id}/${cart_id}/`,{
        method:"POST",
        headers:{"Content-Type": "application/json"}
      })
      if(res.status == 200)
      {
        localStorage.removeItem("cart_id")
        setCart_id(null)
        setCart(null)
        return
      }
      let data = await res.json()
      setCart(data)
      setCart_id(data.cart.id)
      localStorage.setItem("cart_id", data.cart.id)
    }

useEffect(()=>{
  getCart()
}, [cart_id])

  let Context = {
    "cart_id": cart_id,
    "cart": cart,
    "cartItemIds": cart ? cart.itemId : [], 
    "error": error,
    "cartlength": cart ? cart.orderitems.length : 0,
    "getCart": getCart,
    "addToCart": addToCart,
    "removeFromCart": removeFromCart
  }
  return <MyContext.Provider value={ Context }>{children}</MyContext.Provider>;
};
