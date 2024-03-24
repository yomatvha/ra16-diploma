import { Await, useLoaderData } from "react-router-dom";
import TopSalesCardList from "./TopSalesCardList"
import { Suspense } from "react";
import React from 'react'
import TopSalesLoader from "./TopSalesLoader";

function TopSales() {
    const { hitsPromise } = useLoaderData();

    return (
        <Suspense fallback={<TopSalesLoader/>}>
            <Await resolve={hitsPromise}>
                {(hits) => <TopSalesCardList hits={hits} />}
            </Await>
        </Suspense>
    )
}

export default TopSales
