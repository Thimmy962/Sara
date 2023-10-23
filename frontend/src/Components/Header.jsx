import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { useMyContext } from './Context'

const Header = () => {
    const [majors, setMajors] = useState()
    let {cartlength} = useMyContext()

    useEffect(()=>{
        getMajor()
    }, [])

    let getMajor=async()=>{
        let res = await fetch("http://localhost:8000/getmajor",{
            method:"GET",
            headers:{
                "COntent-Type": "application/json"
            }
        })
        let data = await res.json()
        setMajors(data)
    }
  return (
    <div id='header'>
            <Link to="/">
                <h1 id="company">Sara</h1>
            </Link>
            <ul id='header-list'>
                {majors && majors.map(major=>(
                    <Link key={major.id} to={`/${major.name}`}><li className='header-list'>{major.name}</li></Link>
                ))}
            </ul>
            <Link to={`/cart/cart`}><h3 id='cart'>Cart <sup>{cartlength}</sup></h3></Link>
    </div>
  )
}

export default Header