import { useState } from "react"
import TopSales from "./TopSales";

const RequestFailTopSales = () => {
  const [request, setRequest] = useState(false);
  
  const onClick = () => {
    setRequest(true);
  }

  return (
    <>
      {request ? <TopSales /> : 
        <>
          <section className="top-sales container">
            <h2 className="text-center">Хиты продаж!</h2>
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

export default RequestFailTopSales
