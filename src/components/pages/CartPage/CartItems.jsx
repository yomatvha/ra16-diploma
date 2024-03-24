import { Link } from "react-router-dom";

const CartItems = ({ item, removeItem }) => {
    return (
        <>
            <tr>
                <td scope="row">{item.id}</td>
                <td><Link to={`/catalog/${item.id}.html`}>{item.title}</Link></td>
                <td>{item.size}</td>
                <td>{item.count}</td>
                <td>{item.price}</td>
                <td>{item.totalPrice}</td>
                <td><button className="btn btn-outline-danger btn-sm" onClick={(e) => {removeItem(e, item)}}>Удалить</button></td>
            </tr>
        </>
    )
}

export default CartItems
