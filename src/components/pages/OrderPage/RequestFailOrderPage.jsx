import Footer from "../../Footer";
import Header from "../../Header";
import OrderPage from "./OrderPage";
import { useState } from "react";

const RequestFailOrderPage = () => {
  const [request, setRequest] = useState(false);
  
  const onClick = () => {
    setRequest(true);
  }

  return (
    <>
      {request ? <OrderPage /> : 
        <>
          <Header />
            <section className="container">
            <div className="text-center">
              <div>При запросе на сервер произошла ошибка, попробуйте ещё раз</div>
              <button className="btn btn-outline-primary text-center" onClick={onClick}>Попробовать ещё раз</button>
            </div>
            </section>
          <Footer />
        </>
      }
    </>
  )
}

export default RequestFailOrderPage
