import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
// import Banner from "./components/banner/Banner";
import Main from "./layouts/Main";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";

const TVPage = lazy(() => import("./pages/TVPage"));
const TVDetail = lazy(() => import("./pages/TVDetail"));
const MoviePage = lazy(() => import("./pages/MoviePage"));
const MoviePageDetail = lazy(() => import("./pages/MoviePageDetail"));
const MovieNewPageDetail = lazy(() => import("./pages/MovieNewPageDetail"));
const MoviePlayDetail = lazy(() => import("./pages/MoviePlayDetail"));

const App = () => {
  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route element={<Main></Main>}>
          <Route
            path="/"
            element={
              <>
                {/* <Banner></Banner> */}
                <HomePage></HomePage>
              </>
            }
          ></Route>
          <Route path="/tv-shows" element={<TVPage></TVPage>}></Route>
          <Route
            path="/tv-shows/detail/:id"
            element={<TVDetail></TVDetail>}
          ></Route>

          <Route path="/movie" element={<MoviePage></MoviePage>}></Route>
          <Route
            path="/movie/detail/:id"
            element={<MoviePageDetail></MoviePageDetail>}
          ></Route>
          <Route
            path="/phim/:id"
            element={<MovieNewPageDetail></MovieNewPageDetail>}
          ></Route>

          <Route
            path="/phim/:idMovie/:id"
            element={<MoviePlayDetail></MoviePlayDetail>}
          ></Route>
        </Route>
        <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
      </Routes>
    </Suspense>
  );
};

export default App;
