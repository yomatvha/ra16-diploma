import TopSalesCard from "./TopSalesCard";

const CatalogCardList = ({ data }) => { 
  return (
    <div className="row">
      {data.map(card => <TopSalesCard key={card.id} props={card} />)}
    </div>
  )
}

export default CatalogCardList
