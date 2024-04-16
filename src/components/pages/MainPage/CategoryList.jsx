import CategoryListItems from "./CategoryListItems";

const CategoryList = ({ data, categoryActive, setCategoryActive, setSearchOptions, setLoad, searchRequest }) => {

  const activeClassCategory = (e) => {
    e.preventDefault();
    setCategoryActive(0);
    setSearchOptions(prevState => ({
      ...prevState,
      append: false,
      offset: 0,
    }));
    setLoad(false);
  }

  const allCategories = { title: 'Все', id: 0 };

  let id = 0;
  if (categoryActive === undefined) {
    id = 0;
  } else {
    id = categoryActive;
  }

  const onClick = (e) => {
    activeClassCategory(e);
    const form = document.getElementById('search-input');
    searchRequest(form.value);
  }

  return (
    <>
      <ul className="catalog-categories nav justify-content-center">
        <li className="nav-item">
          <a className={id === allCategories.id ? "nav-link active" : "nav-link"} onClick={onClick}>{allCategories.title}</a>
        </li>
        {data.map((category) => 
          <CategoryListItems 
            key={category.id} 
            props={category} 
            categoryActive={categoryActive} 
            setCategoryActive={setCategoryActive} 
            setSearchOptions={setSearchOptions} 
            setLoad={setLoad} 
            searchRequest={searchRequest}
          />
        )}
      </ul>
    </>
  )
}

export default CategoryList
