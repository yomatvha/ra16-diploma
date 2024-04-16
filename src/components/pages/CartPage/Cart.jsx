import { useSelector, useDispatch } from "react-redux"
import { deleteItemFromCart } from "../../../store/slice/cart/reducer";
import CartItems from "./CartItems";
import CartUserForm from "./CartUserForm";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.itemsInCart);

  const removeItem = (e, item) => {
    e.preventDefault();
    dispatch(deleteItemFromCart(item));
    localStorage.removeItem(`${item.title}`);
  }

  return (
    <>
      <main className="container">
        <div className="row">
          <div className="col">
          {
            items.length > 0 ? 
            <>
              <section className="cart">
                <h2 className="text-center">Корзина</h2>
                <table className="table table-bordered">
                <thead>
                  <tr>
                  <th scope="col">#</th>
                  <th scope="col">Название</th>
                  <th scope="col">Размер</th>
                  <th scope="col">Кол-во</th>
                  <th scope="col">Стоимость</th>
                  <th scope="col">Итого</th>
                  <th scope="col">Действия</th>
                  </tr>
                </thead>
                <tbody>
                {items.map((item, index) =>
                  <CartItems 
                    item={item}
                    key={index}
                    removeItem={removeItem}
                    index={index}
                  />
                )}
                  <tr>
                  <td colSpan="5" className="text-right">Общая стоимость</td>
                  <td>{items.reduce((acc, item) => acc + item.totalPrice, 0)}</td>
                  </tr>
                </tbody>
                </table>
              </section>
              <section className="order">
                <h2 className="text-center">Оформить заказ</h2>
                <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
                <CartUserForm />
                </div>
              </section>
            </>
            :
            <section className="text-center">Ваша корзина пуста</section>
          }
          </div>
        </div>
      </main>
    </>
  )
}

export default Cart
