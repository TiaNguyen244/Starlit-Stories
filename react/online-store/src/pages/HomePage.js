
import GenreList from "../components/GenreList"
import FeaturedBooks from "../components/FeaturedBooks";

const HomePage = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-3">
          <GenreList />
        </div>
        <div className="col-md-9">
          <div className="jumbotron p-4 bg-light rounded-3 mb-4">
            <h1 className="display-5">Welcome to Starlit Stories</h1>
            <p className="lead">
              Discover your next favorite book from our vast collection of titles across all genres.
            </p>
            <hr className="my-4" />
            <p>
              From bestsellers to hidden gems, we have something for every reader. Browse our featured selections below
              or search for specific titles.
            </p>
          </div>
            <FeaturedBooks />
        </div>
      </div>
    </div>
  )
}

export default HomePage

