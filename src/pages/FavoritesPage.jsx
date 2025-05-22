import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { useAuth } from "../hooks/useAuth";
import LoadingSkeleton from "../components/loading/LoadingSkeleton";
import { API } from "../configAPI/configAPI";

const FavoritesPage = () => {
  const { user } = useAuth();
  const { favorites, loading, removeFromFavorites } = useFavorites();
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setSelectedMovies([]);
  };

  const toggleSelectMovie = (movieId) => {
    if (selectedMovies.includes(movieId)) {
      setSelectedMovies(selectedMovies.filter((id) => id !== movieId));
    } else {
      setSelectedMovies([...selectedMovies, movieId]);
    }
  };

  const handleRemoveSelected = async () => {
    for (const movieId of selectedMovies) {
      await removeFromFavorites(movieId);
    }
    setSelectedMovies([]);
    setIsEditMode(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  };

  const getImageUrl = (path) => {
    if (!path) return "";
    if (path.includes("http")) return path;
    if (path.includes("/")) return API.getImage(path);
    return `https://phimimg.com/${path}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Phim yêu thích</h1>
        {favorites.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={toggleEditMode}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition"
            >
              {isEditMode ? "Huỷ" : "Chỉnh sửa"}
            </button>
            {isEditMode && selectedMovies.length > 0 && (
              <button
                onClick={handleRemoveSelected}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
              >
                Xoá ({selectedMovies.length})
              </button>
            )}
          </div>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <LoadingSkeleton key={item} className="h-[300px] rounded-lg" />
          ))}
        </div>
      ) : favorites.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-7xl mb-4">
            <i className="bx bxs-heart text-gray-600"></i>
          </div>
          <p className="text-xl text-gray-400 mb-6">
            Bạn chưa có phim yêu thích nào
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-md transition"
          >
            Khám phá phim ngay
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {favorites.map((movie) => (
            <div key={movie.id} className="relative group">
              {isEditMode && (
                <div
                  className="absolute top-2 left-2 z-10 w-6 h-6 bg-black bg-opacity-70 rounded-md flex items-center justify-center cursor-pointer"
                  onClick={() => toggleSelectMovie(movie.id)}
                >
                  <input
                    type="checkbox"
                    checked={selectedMovies.includes(movie.id)}
                    onChange={() => {}}
                    className="w-4 h-4 accent-red-600"
                  />
                </div>
              )}

              <Link
                to={`/phim/${movie.slug}`}
                className="block h-full"
                onClick={(e) => isEditMode && e.preventDefault()}
              >
                <div className="bg-[#222] rounded-lg overflow-hidden h-full flex flex-col">
                  <div className="relative pt-[140%]">
                    <img
                      src={getImageUrl(movie.thumb_url)}
                      alt={movie.name}
                      className="absolute top-0 left-0 w-full h-full object-cover transition-transform group-hover:scale-105"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x450?text=No+Image";
                      }}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all"></div>

                    {!isEditMode && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          removeFromFavorites(movie.id);
                        }}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black bg-opacity-70 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Xoá khỏi yêu thích"
                      >
                        <i className="bx bx-x text-xl"></i>
                      </button>
                    )}

                    <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black to-transparent">
                      <p className="font-bold text-sm truncate">{movie.name}</p>
                      <p className="text-xs text-gray-300 truncate">
                        {movie.origin_name}
                      </p>
                    </div>
                  </div>

                  <div className="p-2 text-center text-xs text-gray-400 mt-auto">
                    Đã thêm: {formatDate(movie.addedAt)}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
