import TopSalesCard from "./TopSalesCard"

const TopSalesList = ({ hits }) => {
    return (
        <>
            <section className="container top-sales">
                <h2 className="text-center">Хиты продаж!</h2>
                <div className="row">
                    {hits.map(card => <TopSalesCard key={card.id} props={card} />)}
                </div>
            </section>
        </>
    )
}

export default TopSalesList
