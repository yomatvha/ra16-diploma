import TopSalesCardList from "./TopSalesCardList"
import { useEffect, useState } from "react";
import React from 'react'
import TopSalesLoader from "./TopSalesLoader";
import RequestFailTopSales from "./RequestFailTopSales";


const TopSales = () => {
  const [items, setItems] = useState([]);
  const [load, setLoad] = useState(false);
  const [request, setRequest] = useState(true);

  const requestTopSales = async () => {
    try {
      const response = await fetch('http://localhost:7070/api/top-sales');
      setItems(await response.json());
      setLoad(true);
    } catch (error) {
      setRequest(false);
    }
  }

  useEffect(() => {
    requestTopSales();
  }, []);

  return (
    <>
      {!request ? <RequestFailTopSales /> : 
        <>
          {!load ? <TopSalesLoader /> :
          <TopSalesCardList hits={items} />
          }
        </>
      }
    </>
  )
}

export default TopSales
