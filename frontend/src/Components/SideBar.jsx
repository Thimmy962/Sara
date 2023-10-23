import React from 'react'

const SideBar = ({loading, getMinorCatItem, categories}) => {
  return (
    <div id="subcategories">
        {loading ? (
          <p>Loading...</p>
        ) : (
          categories.map((category) => (
            <div key={category.id} onClick={(e) => getMinorCatItem(e, category.name)}>
              <p>{category.name}</p>
            </div>
          ))
        )}
      </div>
  )
}

export default SideBar