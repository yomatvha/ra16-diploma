import Header from "../Header"
import Footer from "../Footer"

const ErrorPage = () => {
  
  return (
    <>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
          <section className="top-sales">
            <h2 className="text-center">Страница не найдена</h2>
            <p>
            Извините, такая страница не найдена!
            </p>
          </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default ErrorPage
