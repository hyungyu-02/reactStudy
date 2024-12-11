import React from 'react'

const ShowSearchBar = ({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange }) => {
  const handleTextChange = (e) => {
    onFilterTextChange(e.target.value);
  };
  const handleCheckboxChange = (e) => {
    onInStockOnlyChange(e.target.checked);
  };

  return (
    <form>
      <input type='text' value={filterText} placeholder='search...' onChange={handleTextChange} ></input>
      <label>
        <input type='checkbox' value={inStockOnly} onChange={handleCheckboxChange} ></input>
        Only show products in stock
      </label>
    </form>
  )
}

const SearchBar = ({ filterText, inStockOnly, onFilterTextChange, onInStockOnlyChange, mode }) => {
  let content = null;
  if(mode === 'SHOW'){
    content = <ShowSearchBar filterText={filterText} inStockOnly={inStockOnly} onFilterTextChange={onFilterTextChange} onInStockOnlyChange={onInStockOnlyChange} />;
  } else if(mode === 'UPDATE'){
    content = <div></div>;
  }

  return (
    <React.Fragment>
      {content}
    </React.Fragment>
  )
}

export default SearchBar
