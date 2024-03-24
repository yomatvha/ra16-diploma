const ProductCount = ({ form, changeCount}) => {

  return (
      <>
          <div className="text-center">
              <p>Количество: <span className="btn-group btn-group-sm pl-2">
                      <button className="btn btn-secondary" type="button" onClick={changeCount}>-</button>
                      <span className="btn btn-outline-primary">{form.count}</span>
                      <button className="btn btn-secondary" type="button" onClick={changeCount}>+</button>
                  </span>
              </p>
          </div>
      </>
  )
}

export default ProductCount
