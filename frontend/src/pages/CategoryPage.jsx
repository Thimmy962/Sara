import React, { useEffect, useState } from 'react';
import Itemlist from '../Components/Itemlist';
import SideBar from '../Components/SideBar';
import { useMyContext } from '../Components/Context';


const CategoryPage = ({ match }) => {
  const {addToCart, removeFromCart, cartItemIds} = useMyContext()
  const name = match.params.name;
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:8000/getmajorcatdata/${name}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await res.json();
        setItems(data.items);
        setCategories(data.category);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  const getMinorCatItem = async (e, categoryname) => {
    console.log(categoryname)
    setItems(null);
    try {
      const res = await fetch(`http://localhost:8000/getminoritems/${name}/${categoryname}/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch minor items');
      }

      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching minor items:', error);
    }
  };

  return (
    <div id="category">
      <SideBar {...{ loading, categories, getMinorCatItem }} />
      {items && <Itemlist {...{items, addToCart, removeFromCart, cartItemIds}} />}
    </div>
  );
};

export default CategoryPage;
