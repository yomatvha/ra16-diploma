import ProductSizes from "./ProductSizes";
import ProductCount from "./ProductCount";
import { useDispatch, useSelector } from "react-redux";
import { setItemInCart, cartChangeForm, deleteItemFromCart } from "../../../store/slice/cart/reducer";
import { useNavigate } from 'react-router-dom';

const ProductListForm = ({ items }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { form } = useSelector((state) => state.cart);
    const { itemsInCart } = useSelector((state) => state.cart);

    const changeSize = ({ target }) => {
        dispatch(cartChangeForm({ [target.name]: target.value}));
    }

    const changeCount = (e) => {
        e.preventDefault();
        if (e.target.innerHTML === '+' && form.count < 10) {
            dispatch(cartChangeForm({ count: form.count + 1 }));
          } else if (e.target.innerHTML === '-' && form.count > 1) {
            dispatch(cartChangeForm({ count: form.count - 1 }));
        }
    }

    const itemAlreadyInCart = itemsInCart.find(item => item.id === items.id && item.size === form.size);
    let countItemInCart = 0;
    let totalPriceItemInCart = 0;

    const addProductInCart = (e) => {
        e.preventDefault();

        if (itemAlreadyInCart) {
            itemsInCart.forEach(element => {
                if (element.title === items.title) {
                    countItemInCart = element.count;
                    totalPriceItemInCart = element.totalPrice;
                }
            });
            dispatch(deleteItemFromCart(itemAlreadyInCart));
            dispatch(setItemInCart({
                id: items.id,
                title: items.title,
                size: form.size,
                count: form.count + countItemInCart,
                price: items.price,
                totalPrice: items.price * form.count + totalPriceItemInCart,
            }));
            localStorage.setItem(`${items.title}`, JSON.stringify({
                id: items.id,
                title: items.title,
                size: form.size,
                count: form.count + countItemInCart,
                price: items.price,
                totalPrice: items.price * form.count + totalPriceItemInCart,
            }));
            dispatch(cartChangeForm({ size: null, count: 1 }));
            navigate('/cart.html');
        } else {
            dispatch(setItemInCart({
                id: items.id,
                title: items.title,
                size: form.size,
                count: form.count,
                price: items.price,
                totalPrice: items.price * form.count,
            }));
            localStorage.setItem(`${items.title}`, JSON.stringify({
                id: items.id,
                title: items.title,
                size: form.size,
                count: form.count,
                price: items.price,
                totalPrice: items.price * form.count,
            }));
            dispatch(cartChangeForm({ size: null, count: 1 }));
            navigate('/cart.html');
        }
    }

    return (
        <>
            <form className="product-list-form">
                {items.sizes.map((item, key) => 
                    item.available && (
                        <ProductSizes
                        item={item}
                        form={form}
                        key={key}
                        changeSize={changeSize}
                        />
                    ),
                )}
            </form>
            {form.size !== null && 
                <>
                    <ProductCount 
                    changeCount={changeCount} 
                    form={form} 
                    />
                    <button
                        className="btn btn-danger btn-block btn-lg"
                        onClick={addProductInCart}
                        type="button"
                    >
                    В корзину
                    </button>
                </>
            }
        </>
    )
}

export default ProductListForm
