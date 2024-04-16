import { useState } from "react"
import CartUserForm from "./CartUserForm";

const RequestFailCart = () => {
  const [request, setRequest] = useState(false);
  
  const onClick = () => {
    setRequest(true);
  }

  return (
    <>
      {request ? <CartUserForm /> : 
        <>
          <section className="cart container">
            <div className="text-center">
              <div>При запросе на сервер произошла ошибка, попробуйте ещё раз</div>
              <button className="btn btn-outline-primary text-center" onClick={onClick}>Попробовать ещё раз</button>
            </div>
          </section>
        </>
      }
    </>
  )
}

export default RequestFailCart
