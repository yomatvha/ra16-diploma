import Banner from "./Banner"
import headerLogo from '../img/header-logo.png'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { searchText } from "../store/slice/search/searchReducer";

const Header = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickSearch = () => {
    const searchButton = document.getElementById('search-expander');
    const searchForm = document.getElementById('search-form');
    searchButton.classList.add('invisible');
    searchForm.classList.remove('invisible');
  }

  const onSubmitSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const input = form.elements.search;
    dispatch(searchText({ search: input.value }));
    navigate('/catalog');
  }


  const productsInCart = useSelector(state => state.cart.itemsInCart.length);

  return (
    <header className="container">
      <div className="row">
        <div className="col">
        <nav className="navbar navbar-expand-sm navbar-light bg-light px-3">
          <a className="navbar-brand" href="/">
          <img src={headerLogo} alt="Bosa Noga" />
          </a>
          <div className="collapse navbar-collapse justify-content-between" id="navbarMain">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">Главная</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/catalog">Каталог</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">О магазине</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contacts">Контакты</Link>
            </li>
          </ul>
          <div>
            <div className="header-controls-pics">
            <div data-id="search-expander" id="search-expander" className="header-controls-pic header-controls-search" onClick={onClickSearch}></div>
            {/* <!-- Do programmatic navigation on click to /cart.html --> */}
            <Link className="header-controls-pic header-controls-cart" to="/cart">
              {productsInCart > 0 && 
              <div className="header-controls-cart-full">{productsInCart}</div>
              }
              <div className="header-controls-cart-menu"></div>
            </Link>
            </div>
            <form data-id="search-form" id="search-form" className="header-controls-search-form form-inline invisible" onSubmit={onSubmitSearch}>
            <input className="form-control" name="search" placeholder="Поиск" />
            </form>
          </div>
          </div>
        </nav>
        <Banner />
        </div>
      </div>
    </header>
  )
}

export default Header
