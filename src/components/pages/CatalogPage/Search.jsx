import { useSelector } from "react-redux"

const Search = ({ onSearch, setLoad }) => {

  const headerSearchText = useSelector(state => state.search.searchInput.search);

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const input = form.elements.request;
    onSearch(input.value);
    setLoad(false);
  }

  return (
    <>
      <form className="catalog-search-form form-inline container" onSubmit={onSubmit}>
        <input 
          className="form-control"
          id="search-input"
          type="text" 
          placeholder="Поиск" 
          name="request"
          defaultValue={headerSearchText}
        />
      </form>
    </>
  )
}

export default Search
