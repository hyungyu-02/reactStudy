import React, { useState } from 'react';

const ShowInputBar = ({ addProduct }) => {
    const [newProduct, setNewProduct] = useState({
        id: "0", category: "", price: 0, stocked: true, name: "",
    });

    const handleChange = (value, label) => {
        setNewProduct({...newProduct, [label] :value});
    };

    const handleAddNewProduct = () => {
        const productWithId = {...newProduct, id:Date.now().toString()};
        console.log(productWithId);
        addProduct(productWithId);
        //setNewProduct({category:"",price:0,stocked:true,name:""});
        const resetProduct = {id:"0", category:"", price:0, stocked:true, name:""};
        setNewProduct(resetProduct);
        console.log(newProduct);
    };
  
    return (
    <form>
        <input type='text' value={newProduct.category} placeholder='category...'
        onChange={(e) => handleChange(e.target.value, "category")}
        />

        <input type='text' value={newProduct.price} placeholder='price...'
        onChange={(e) => handleChange(e.target.value, "price")}
        />

        <label>Is Stocked</label>
        <input type='checkbox' defaultChecked={newProduct.stocked}
        onChange={(e) => handleChange(e.target.checked, "stocked")}
        />

        <input type='text' value={newProduct.name} placeholder='name...'
        onChange={(e) => handleChange(e.target.value, "name")}
        />

        <button onClick={handleAddNewProduct} type={"button"}>Click</button>
    </form>
  );
}

const InputBar = ({ addProduct, mode }) => {
  let content = null;
  if(mode === 'SHOW'){
    content = <ShowInputBar addProduct={addProduct} />;
  }else if(mode === 'UPDATE'){
    content = <div></div>;
  }
    return (
        <React.Fragment>
            {content}
        </React.Fragment>
  );
};

export default InputBar;
