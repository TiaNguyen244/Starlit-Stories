import GenreList from "../components/GenreList"
import FeaturedBooks from "../components/FeaturedBooks"
import main_card from "../components/images/main_card.jpg"
const mainImg = main_card;
const HomePage = () => {
  return (
    <div className="container py-4">
      <div className="row mb-5">
        <div className="col-12">
          <div className="card border-0 rounded-3 overflow-hidden hero-card">
            <div className="hero-image">
              <img
                src={mainImg}
                className="w-100 hero-img"
              />
              <div className="hero-overlay">
                <div className="hero-content text-white p-4 p-md-5">
                  <h1 className="display-4 fw-bold mb-3">Discover Your Next Great Read</h1>
                  <p className="lead mb-4">Explore our vast collection of books across all genres</p>
                  <a href="/books" className="btn btn-light btn-lg">
                    Browse Books
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-3">
          <GenreList />
        </div>
        <div className="col-md-9">
          <FeaturedBooks />
        </div>
      </div>
    </div>
  )
}

export default HomePage

