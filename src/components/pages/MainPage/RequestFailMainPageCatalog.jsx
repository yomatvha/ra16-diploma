import { useState } from "react"
import MainPageCatalog from "./MainPageCatalog";

const RequestFailMainPageCatalog = () => {
  const [request, setRequest] = useState(false);
  
  const onClick = () => {
    setRequest(true);
  }

  return (
    <>
      {request ? <MainPageCatalog /> : 
        <>
          <section className="catalog container">
            <h2 className="text-center">Каталог</h2>
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

export default RequestFailMainPageCatalog
