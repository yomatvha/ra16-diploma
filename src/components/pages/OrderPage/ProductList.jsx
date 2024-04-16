import ProductListForm from "./ProductListForm";

const ProductList = ({ data }) => {

  return (
    <>
    <main className="container">
      <div className="row">
        <div className="col">
          <section className="catalog-item">
            <h2 className="text-center">{data.title}</h2>
            <div className="row">
              <div className="col-5">
                <img src={data.images[0]}
                  className="img-fluid" alt="" />
              </div>
              <div className="col-7">
                <table className="table table-bordered">
                  <tbody>
                    <tr>
                      <td>Артикул</td>
                      <td>{data.sku}</td>
                    </tr>
                    <tr>
                      <td>Производитель</td>
                      <td>{data.manufacturer}</td>
                    </tr>
                    <tr>
                      <td>Цвет</td>
                      <td>{data.color}</td>
                    </tr>
                    <tr>
                      <td>Материалы</td>
                      <td>{data.material}</td>
                    </tr>
                    <tr>
                      <td>Сезон</td>
                      <td>{data.season}</td>
                    </tr>
                    <tr>
                      <td>Повод</td>
                      <td>{data.reason}</td>
                    </tr>
                  </tbody>
                </table>
                <ProductListForm items={data}/>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
    </>
  )
}

export default ProductList
