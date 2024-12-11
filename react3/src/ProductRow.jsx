import React from 'react'

const ProductRow = ({product, deleteProduct, UpdateButtonCLicked}) => {
  return (
    <tr>
      <td style={{color:product.stocked ? 'black' : 'red'}}>{product.name}</td>
      <td>{product.price} $</td>
      <td><span onClick={()=>{deleteProduct(product.id)}}>🗑️</span></td>
      <td><span onClick={()=>{UpdateButtonCLicked(product)}} >✏️</span></td>
    </tr>
  );
};

export default ProductRow
