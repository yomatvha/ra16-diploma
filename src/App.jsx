import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react'
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom'

import MainPage from './components/pages/MainPage/MainPage'
import CatalogPage from './components/pages/CatalogPage/CatalogPage'
import AboutStorePage from './components/pages/AboutStorePage'
import ContactsPage from './components/pages/ContactsPage'
import ErrorPage from './components/pages/404Page'
import requestTopSales from './components/pages/MainPage/requestTopSales'
import OrderPage from './components/pages/OrderPage/OrderPage'
import CartPage from './components/pages/CartPage/CartPage'
import { useSelector, useDispatch } from "react-redux"
import { setItemInCart, refreshPage } from './store/slice/cart/reducer'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    errorElement: <ErrorPage />,
    loader: async () => {
      const hitsPromise = requestTopSales();
      return defer({ hitsPromise });
    }
  },
  {
    path: '/catalog.html',
    element: <CatalogPage />,
  },
  {
    path: '/about.html',
    element: <AboutStorePage />,
  },
  {
    path: '/contacts.html',
    element: <ContactsPage />,
  },
  {
    path: 'catalog/:id.html',
    element: <OrderPage />
  },
  {
    path: '/cart.html',
    element: <CartPage />
  },

])

function App() {
  const dispatch = useDispatch();
  const refresh = useSelector(state => state.cart.refreshPage.refresh);
  
  if (refresh) {
    const keys = Object.keys(localStorage);
    
    for(let key of keys) {
      if (refresh) {
        dispatch(setItemInCart(JSON.parse(localStorage.getItem(key))));
        dispatch(refreshPage({ refresh: false }));
      }
    }
  }

  return <RouterProvider router={router} />
}

export default App
