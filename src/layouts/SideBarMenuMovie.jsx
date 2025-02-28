import Search from "../components/search/Search";
import ListSideBar from "../components/movie/movieSideBar/ListSideBar";

const SideBarMenuMovie = () => {
  return (
    <div className="py-10">
      <Search></Search>
      <section className="container mt-10 movies-layout">
        <h2 className="mb-5 text-2xl font-bold text-white capitalize">
          Upcoming movies
        </h2>
        <ListSideBar check="movie"></ListSideBar>
      </section>
      <section className="container mt-10 movies-layout">
        <h2 className="mb-5 text-2xl font-bold text-white capitalize">
          Famous Actor
        </h2>
        {/* <ActorListSideBar></ActorListSideBar> */}
        <ListSideBar check="actor"></ListSideBar>
      </section>
    </div>
  );
};

export default SideBarMenuMovie;
