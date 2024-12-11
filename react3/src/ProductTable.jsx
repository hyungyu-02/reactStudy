import React, { useState } from 'react'
import ProductCategoryRow from './ProductCategoryRow';
import ProductRow from './ProductRow';

const filterProducts = (products, filterText, inStockOnly) => {
  return products.filter((product) => {
    if(product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return false;
    }

    if(inStockOnly && !product.stocked) {
      return false;
    }
    return true;
  })
}

const groupedProductByCategory = (products = []) => {
  return Object.values(
    products.reduce((acc, product) => {
      const {category} = product;
      if(!acc[category]){
        acc[category] = {category, products:[]};
      }

      acc[category].products.push(product);
      return acc;
    }, {})
  );
}

const ShowProductList = ({ product, filterText, inStockOnly, deleteProduct, UpdateButtonCLicked }) => {
  const filteredProducts = filterProducts(product, filterText, inStockOnly); 
  const groupedProducts = groupedProductByCategory(filteredProducts);

  return(
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {groupedProducts.map((productCategory) => (
          <React.Fragment key={productCategory.category}>
            <ProductCategoryRow category={productCategory.category} />
            {productCategory.products.map((product) => (
              <ProductRow key={product.id} product={product} deleteProduct={deleteProduct} UpdateButtonCLicked={UpdateButtonCLicked} />
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

const ShowUpdatePage = ({updatingProduct, updateProduct, setMode}) => {
  return(
    <form onSubmit={e => {
      e.preventDefault();
      updateProduct({
        id:updatingProduct.id,
        category:e.target.category.value,
        name:e.target.name.value,
        price:e.target.price.value,
        stocked:e.target.stocked.value,
      });
      setMode('SHOW');
    }}>
      <h4>Edit page</h4>
      <p>category</p>
      <input type='text' name='category' defaultValue={updatingProduct.category} placeholder='category...' ></input>
      <p>name</p>
      <input type='text' name='name' defaultValue={updatingProduct.name} placeholder='name...' ></input>
      <p>price</p>
      <input type='number' name='price' defaultValue={updatingProduct.price} placeholder='price...' ></input>
      <p>Is Stocked <input type='checkbox' name='stocked' defaultValue={updatingProduct.stocked} /></p>
      <p><input type='submit' value='edit'></input></p>
    </form>
  );
};

const ProductTable = ({ product, filterText, inStockOnly, deleteProduct, updateProduct, mode, setMode }) => {

  const [updatingProduct, setupdatingProduct] = useState(null);
  const UpdateButtonCLicked = (updatingProduct) =>{
    setMode('UPDATE');
    //console.log(updatingProductId);
    setupdatingProduct(updatingProduct);
  }

  let content = null;
  if(mode === 'SHOW'){
    content = <ShowProductList product={product} filterText={filterText} inStockOnly={inStockOnly} deleteProduct={deleteProduct} UpdateButtonCLicked={UpdateButtonCLicked} />;
  } else if(mode === 'UPDATE'){
    content = <ShowUpdatePage updatingProduct={updatingProduct} updateProduct={updateProduct} setMode={setMode} />;
  }
  
  return (
    <React.Fragment>
      {content}
    </React.Fragment>
  )
}

export default ProductTable
