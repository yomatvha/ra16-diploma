import CategoryList from "../MainPage/CategoryList";
import React, { useState, useEffect } from "react";
import CatalogCardList from "../MainPage/CatalogCardList";
import Search from "./Search";
import Loader from "../../Loader";
import { useSelector, useDispatch } from "react-redux"
import RequestFailCatalog from "./RequestFailCatalog";
import EmptySearch from "./EmptySearch";
import { searchText } from "../../../store/slice/search/searchReducer";

const Catalog = ({ activeCategory }) => {

  const dispatch = useDispatch();
  
  const [items, setItems] = useState([]);
  const [newCards, setNewCards] = useState(0);
  const [searchOptions, setSearchOptions] = useState({});
  const [categoriesList, setCategoriesList] = useState([]);
  const [load, setLoad] = useState(false);
  const [loadMore, setLoadMore] = useState(true);
  const [request, setRequest] = useState(true);

  const { categoryId = activeCategory } = searchOptions;
  
  const setCategoryId = (categoryId) => setSearchOptions(prevState => ({
    ...prevState,
    categoryId,
  }));

  const requestCatalogCategories = async () => {
    try {
      const response = await fetch('http://localhost:7070/api/categories');
      setCategoriesList(await response.json());
      setLoad(true);
    } catch (error) {
      setRequest(false);
    }
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
      setLoadMore(true);
    } catch (error) {
      setRequest(false);
    }
  }

  useEffect(() => {
    requestMainPageCatalog();
  }, [searchOptions]);

  useEffect(() => {
    requestCatalogCategories();
  }, []);

  const loadMoreRequest = async () => {
    setLoadMore(false);
    setSearchOptions(({ offset = 0, ...prevState }) => ({
      ...prevState,
      append: true,
      offset: offset + 6
    }));
  }

  const searchRequest = async (searchQuery) => {
    setSearchOptions(prevState => ({
      ...prevState,
      searchQuery,
      append: false,
      offset: 0
    }));
    dispatch(searchText({ search: searchQuery }));   
  }

  const headerSearchText = useSelector(state => state.search.searchInput.search);

  useEffect(() => {
    if (headerSearchText !== '') {
      searchRequest(headerSearchText);
    }
  }, []);

  const showLoadMore = newCards === 6;

  return (
    <>
      {!request ? <RequestFailCatalog activeCategory={categoryId} /> :
        <section className="catalog container">
          <h2 className="text-center">Каталог</h2>
          <Search onSearch={searchRequest} setLoad={setLoad}/>
          {!load ? <Loader /> : 
            <> 
              <CategoryList
                data={categoriesList}
                categoryActive={categoryId}
                setCategoryActive={setCategoryId}
                setSearchOptions={setSearchOptions}
                setLoad={setLoad}
                searchRequest={searchRequest}
              />
              {items.length === 0 ? <EmptySearch /> :
                <>
                  <CatalogCardList data={items}/>
                  {!loadMore ? <Loader /> :
                    <>
                      {showLoadMore && (
                        <div className="text-center">
                          <button 
                            className="btn btn-outline-primary" 
                            onClick={loadMoreRequest}>Загрузить ещё
                          </button>
                        </div>
                      )}
                    </>
                  }
                </>
              }
            </>
          }
        </section>
      }
    </>
  )

}

export default Catalog
