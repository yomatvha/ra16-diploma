import Header from "../../Header"
import Footer from "../../Footer"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import ProductList from "./ProductList";
import Loader from "../../Loader";

const OrderPage = () => {
    const id = useParams();
    const [load, setLoad] = useState(false);
    const [data, setData] = useState({});

    const requestOrderPage = async () => {
        try {
            const response = await fetch(`http://localhost:7070/api/items/${id.id}`);
            setData(await response.json());
            setLoad(true);          
        } catch (error) {
            alert("При загрузке данных произошла ошибка, попробуйте ещё раз.");
        }
    }

    useEffect(() => {
        requestOrderPage()
    }, []);

    return (
        <>
            <Header />
            {!load ? <Loader /> : <ProductList data={data} />}
            <Footer />
        </>
    )
}

export default OrderPage
