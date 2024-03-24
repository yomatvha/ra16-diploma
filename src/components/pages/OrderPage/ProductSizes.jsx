const ProductSizes = ({ item, form, changeSize }) => {
    
  return (
      <>
          <label>
                  <div className="group-catalog-item-size">
                      <p>Размеры в наличии: 
                          <input
                              className="input-catalog-item-size"
                              type="radio"
                              name="size"
                              value={item.size}
                              onChange={changeSize}
                              checked={form.size === item.size}
                          />
                          <span className="catalog-item-size">{item.size}</span>
                      </p>
                  </div>
          </label>
      </>
  )
}

export default ProductSizes
