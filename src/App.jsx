import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./hooks/useAuth";
import Main from "./layouts/Main";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

const TVPage = lazy(() => import("./pages/TVPage"));
const SeriesPage = lazy(() => import("./pages/SeriesPage"));
const NonSeriesPage = lazy(() => import("./pages/NonSeriesPage"));
const AnimePage = lazy(() => import("./pages/AnimePage"));
const MoviePageDetail = lazy(() => import("./pages/MoviePageDetail"));
const MovieNewPageDetail = lazy(() => import("./pages/MovieNewPageDetail"));
const MoviePlayDetail = lazy(() => import("./pages/MoviePlayDetail"));
const CountryPage = lazy(() => import("./pages/CountryPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage"));

const App = () => {
  return (
    <AuthProvider>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route
              path="/"
              element={
                <>
                  <HomePage></HomePage>
                </>
              }
            ></Route>

            <Route
              path="/movie/detail/:id"
              element={<MoviePageDetail></MoviePageDetail>}
            ></Route>

            <Route
              path="/phim/:id"
              element={<MovieNewPageDetail></MovieNewPageDetail>}
            ></Route>

            <Route path="/tv-shows" element={<TVPage></TVPage>}></Route>

            <Route path="/phim-bo" element={<SeriesPage></SeriesPage>}></Route>

            <Route
              path="/phim-le"
              element={<NonSeriesPage></NonSeriesPage>}
            ></Route>

            <Route path="/hoat-hinh" element={<AnimePage></AnimePage>}></Route>

            <Route
              path="/phim/:idMovie/:id"
              element={<MoviePlayDetail></MoviePlayDetail>}
            ></Route>

            <Route
              path="/quoc-gia/:id"
              element={<CountryPage></CountryPage>}
            ></Route>

            <Route
              path="/the-loai/:id"
              element={<CategoryPage></CategoryPage>}
            ></Route>

            <Route path="/tim-kiem" element={<SearchPage></SearchPage>}></Route>

            {/* Favorites Page */}
            <Route
              path="/favorites"
              element={<FavoritesPage></FavoritesPage>}
            ></Route>
          </Route>

          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route
            path="/forgot-password"
            element={<ForgotPassword></ForgotPassword>}
          ></Route>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
        </Routes>
      </Suspense>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ marginTop: "80px" }}
      />
    </AuthProvider>
  );
};

export default App;
