import CategoryListItems from "./CategoryListItems";

const CategoryList = ({ data, categoryActive, setCategoryActive, setSearchOptions, setLoad }) => {

    const activeClassCategory = (e, category) => {
        e.preventDefault();
        setCategoryActive(category);
        setSearchOptions(prevState => ({
            ...prevState,
            append: false,
            offset: 0,
        }));
        setLoad(false);
    }

    const allCategories = { title: 'Все' };

    return (
        <>
            <ul className="catalog-categories nav justify-content-center">
                <li className="nav-item">
                    <a className={categoryActive === allCategories.id ? "nav-link active" : "nav-link"} onClick={e => activeClassCategory(e, allCategories.id)}>{allCategories.title}</a>
                </li>
                {data.map((category) => 
                    <CategoryListItems 
                        key={category.id} 
                        props={category} 
                        categoryActive={categoryActive} 
                        setCategoryActive={setCategoryActive} 
                        setSearchOptions={setSearchOptions} 
                        setLoad={setLoad} 
                    />
                )}
            </ul>
        </>
    )
}

export default CategoryList
