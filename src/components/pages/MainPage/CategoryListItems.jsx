const CategoryListItems = ({ props, categoryActive, setCategoryActive, setSearchOptions, setLoad, searchRequest }) => {
    
  const activeClassCategory = (e, category) => {
    e.preventDefault();
    setCategoryActive(category);
    setSearchOptions(prevState => ({
      ...prevState,
      append: false,
      offset: 0
    }));
    setLoad(false);
  }

  const onClick = (e) => {
    activeClassCategory(e, props.id);
    const form = document.getElementById('search-input');
    searchRequest(form.value);
  }

  return (
    <li className="nav-item">
      <a className={categoryActive === props.id ? "nav-link active" : "nav-link"} onClick={onClick}>{props.title}</a>
    </li>
  )
}

export default CategoryListItems
