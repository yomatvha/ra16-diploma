import CategoryList from "../MainPage/CategoryList";
import React, { useState, useEffect } from "react";
import CatalogCardList from "../MainPage/CatalogCardList";
import Loader from "../../Loader";

const Catalog = () => {

    const [items, setItems] = useState([]);
    const [newCards, setNewCards] = useState(0);
    const [searchOptions, setSearchOptions] = useState({});
    const [categoriesList, setCategoriesList] = useState([]);
    const [load, setLoad] = useState(false);

    const { categoryId } = searchOptions;
    const setCategoryId = (categoryId) => setSearchOptions(prevState => ({
        ...prevState,
        categoryId,
    }));

    const requestCatalogCategories = async () => {
        const response = await fetch('http://localhost:7070/api/categories');
        setCategoriesList(await response.json());
        setLoad(true);
    }
    
    const getUrl = () => {
        const BASE_URL = 'http://localhost:7070'
        const path = '/api/items';
        const searchParams = new URLSearchParams;
        const { offset, searchQuery } = searchOptions;
        
        if (categoryId) {
            searchParams.append('categoryId', categoryId);
        }
        if (offset > 0) {
            searchParams.append('offset', offset);
        }
        if (searchQuery) {
            searchParams.append('q', searchQuery);
        }

        return BASE_URL + path + '?' + searchParams;
    }

    const requestMainPageCatalog = async () => {
        try {
            const url = getUrl();
            const response = await fetch(url);
            const json = await response.json();
            const { append = false } = searchOptions;
            setItems(data => append ? data.concat(json) : json);
            setNewCards(json.length);
            setLoad(true);
        } catch (error) {
            alert("При загрузке данных произошла ошибка, попробуйте ещё раз.");
        }
    }

    useEffect(() => {
        requestMainPageCatalog();
    }, [searchOptions]);

    useEffect(() => {
        requestCatalogCategories();
    }, []);

    const loadMoreRequest = async () => {
        setLoad(false);
        setSearchOptions(({ offset = 0, ...prevState }) => ({
            ...prevState,
            append: true,
            offset: offset + 6
        }));
    }

    const showLoadMore = newCards === 6;

    return (
        <section className="catalog container">
            <h2 className="text-center">Каталог</h2>
            {!load ? <Loader /> : 
                <>
                    <CategoryList
                        data={categoriesList}
                        categoryActive={categoryId}
                        setCategoryActive={setCategoryId}
                        setSearchOptions={setSearchOptions}
                        setLoad={setLoad}
                    />
                    <CatalogCardList data={items}/>
                    {showLoadMore && (
                        <div className="text-center">
                            <button className="btn btn-outline-primary" onClick={loadMoreRequest}>Загрузить ещё</button>
                        </div>
                    )}
                </>
            }
        </section>
    )
}

export default Catalog
