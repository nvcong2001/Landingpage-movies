import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Banner from "./components/banner/Banner";
import Main from "./layouts/Main";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
// import MoviePage from "./pages/MoviePage";
// import MoviePageDetail from "./pages/MoviePageDetail";
// import TVPage from "./pages/TVPage";
// import TVDetail from "./pages/TVDetail";
// import ActorDetail from "./pages/ActorDetail";
// import ActorsPage from "./pages/ActorsPage";

const TVPage = lazy(() => import("./pages/TVPage"));
const TVDetail = lazy(() => import("./pages/TVDetail"));
const MoviePage = lazy(() => import("./pages/MoviePage"));
const MoviePageDetail = lazy(() => import("./pages/MoviePageDetail"));
const ActorsPage = lazy(() => import("./pages/ActorsPage"));
const ActorDetail = lazy(() => import("./pages/ActorDetail"));

const App = () => {
  return (
    <Suspense fallback={<></>}>
      <Routes>
        <Route element={<Main></Main>}>
          <Route
            path="/"
            element={
              <>
                <Banner></Banner>
                <HomePage></HomePage>
              </>
            }
          ></Route>
          <Route path="/tv" element={<TVPage></TVPage>}></Route>
          <Route path="/tv/detail/:id" element={<TVDetail></TVDetail>}></Route>

          <Route path="/movie" element={<MoviePage></MoviePage>}></Route>
          <Route
            path="/movie/detail/:id"
            element={<MoviePageDetail></MoviePageDetail>}
          ></Route>

          <Route path="/actors" element={<ActorsPage></ActorsPage>}></Route>
          <Route
            path="/actors/detail/:id"
            element={<ActorDetail></ActorDetail>}
          ></Route>
        </Route>
        <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
      </Routes>
    </Suspense>
  );
};

export default App;
