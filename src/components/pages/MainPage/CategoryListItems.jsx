const CategoryListItems = ({ props, categoryActive, setCategoryActive, setSearchOptions, setLoad }) => {
    
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

  return (
      <li className="nav-item">
          <a className={categoryActive === props.id ? "nav-link active" : "nav-link"} onClick={e => activeClassCategory(e, props.id)}>{props.title}</a>
      </li>
  )
}

export default CategoryListItems
