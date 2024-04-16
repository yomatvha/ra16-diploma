import { useSelector, useDispatch } from "react-redux"
import { changeUserForm, submitCart } from "../../../store/slice/cart/reducer"
import { clearCart } from "../../../store/slice/cart/reducer";
import { useState } from "react";
import Loader from "../../Loader";
import RequestFailCart from "./RequestFailCart";

const CartUserForm = () => {
  const submitForm = useSelector(state => state.cart.submitForm);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(true);
  const [request, setRequest] = useState(true);

  const submitOrder = async (order) => {
    try {
      await fetch('http://localhost:7070/api/order', {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      localStorage.clear();
      dispatch(clearCart());
      alert("Ваш заказн успешно сформирован!");
      setLoad(true);
    } catch (error) {
      setRequest(false);
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setLoad(false);
    dispatch(submitCart());
    submitOrder(submitForm);
  }

  const onChange = (e) => {
    dispatch(changeUserForm({ [e.target.name]: e.target.value }));
  }

  const checkboxChange = () => {
    const agreementCheckbox = document.getElementById('agreement');
    const userFormSubmit = document.getElementById('userFormSubmit');
    
    if (agreementCheckbox.checked) {
      userFormSubmit.disabled = false
    } else {
      userFormSubmit.disabled = true
    }
  }

  return (
    <>
    {!request ? <RequestFailCart /> : 
      <>
        {!load ? <Loader /> : 
          <>
            <form className="card-body" onSubmit={onSubmit}>
              <div className="form-group">
              <label htmlFor="phone">Телефон</label>
              <input className="form-control" id="phone" name="phone" placeholder="Ваш телефон" onChange={onChange} />
              </div>
              <div className="form-group">
              <label htmlFor="address">Адрес доставки</label>
              <input className="form-control" id="address" name="address" placeholder="Адрес доставки" onChange={onChange} />
              </div>
              <div className="form-group form-check">
              <input type="checkbox" className="form-check-input" id="agreement" onChange={checkboxChange}/>
              <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
              </div>
              <button type="submit" className="btn btn-outline-secondary" id="userFormSubmit" disabled="disabled">Оформить</button>
            </form>
          </>
        }
      </>
    }
    </>
  )
}

export default CartUserForm
