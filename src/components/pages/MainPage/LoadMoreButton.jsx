import CatalogCardList from "./CatalogCardList";
import { useState } from "react";

const LoadMoreButton = () => {
    const [data, setData] = useState([]);
    const loadMoreRequest = async () => {
        await fetch('http://localhost:7070/api/items?offset=6')
            .then(response => response.json())
            .then(json => {
                setData(prevState => (prevState, json));
            });
        return
    }


    return (
        <>
            <CatalogCardList data={data}/>
            <div className="text-center">
                <button className="btn btn-outline-primary" onClick={loadMoreRequest}>Загрузить ещё</button>
            </div>
        </>
    )
}

export default LoadMoreButton
