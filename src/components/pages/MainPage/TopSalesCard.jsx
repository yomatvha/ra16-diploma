import { Link } from "react-router-dom";

const TopSalesCard = ({ props }) => {
  const { images = [], title, price, id } = props;
  const url = `/catalog/${id}`
  return (
    <div className="col-4">
      <div className="card catalog-item-card">
        <img src={images[0]}
        className="catalog-item-card-img card-img-top" alt={title} />
        <div className="card-body">
        <p className="card-text card-text-title">{title}</p>
        <p className="card-text">{`${price} руб.`}</p>
        <Link to={url} className="btn btn-outline-primary">Заказать</Link>
        </div>
      </div>
    </div>
  )
}

export default TopSalesCard
