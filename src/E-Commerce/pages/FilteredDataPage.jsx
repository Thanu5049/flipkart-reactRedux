import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Card } from './Card';
const FilteredDataPage = ({ }) => {
  const filterProducts = useSelector(state => state.products.filteredData)
  console.log(filterProducts, "from fdp")
  return (
    <div className='d-flex' style={{ gap: "20px", margin: "5%" }}>
      {filterProducts && filterProducts.length > 0 ? (
        filterProducts.map((product) => <Card key={product.id} product={product} />)
      ) : (
        <div style={{ fontSize: "18px", color: "#888", margin: "0 auto" }}>
          <p style={{ marginLeft: "40%" }}>No products found</p>
          <img src='empty-banner.png' />
        </div>
      )}
    </div>

  )
}

export default FilteredDataPage