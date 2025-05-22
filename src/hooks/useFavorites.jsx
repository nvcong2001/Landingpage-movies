import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";
import { db } from "../firebase/firebase.config";
import {
  doc,
  setDoc,
  getDoc,
  onSnapshot,
  arrayUnion,
  arrayRemove,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Fetch user favorites
  useEffect(() => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    const userFavoritesRef = doc(db, "favorites", user.uid);

    const unsubscribe = onSnapshot(
      userFavoritesRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          setFavorites(data.movies || []);
        } else {
          // Create the document if it doesn't exist
          setDoc(userFavoritesRef, { movies: [] }).catch((error) =>
            console.error("Error creating favorites document:", error)
          );
          setFavorites([]);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error getting favorites:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // Check if a movie is in favorites
  const isFavorite = useCallback(
    (movieId) => {
      return favorites.some((movie) => movie.id === movieId);
    },
    [favorites]
  );

  // Add a movie to favorites
  const addToFavorites = async (movie) => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để thêm phim yêu thích");
      return false;
    }

    try {
      const userFavoritesRef = doc(db, "favorites", user.uid);

      // Check if the document exists
      const docSnap = await getDoc(userFavoritesRef);

      if (docSnap.exists()) {
        // Update existing document
        await updateDoc(userFavoritesRef, {
          movies: arrayUnion({
            id: movie.id || movie.slug,
            name: movie.name || movie.title,
            thumb_url: movie.thumb_url || movie.poster_path,
            origin_name: movie.origin_name || movie.original_title,
            slug: movie.slug || movie.id,
            addedAt: new Date().toISOString(),
          }),
        });
      } else {
        // Create new document
        await setDoc(userFavoritesRef, {
          movies: [
            {
              id: movie.id || movie.slug,
              name: movie.name || movie.title,
              thumb_url: movie.thumb_url || movie.poster_path,
              origin_name: movie.origin_name || movie.original_title,
              slug: movie.slug || movie.id,
              addedAt: new Date().toISOString(),
            },
          ],
        });
      }

      toast.success("Đã thêm vào phim yêu thích");
      return true;
    } catch (error) {
      console.error("Error adding to favorites:", error);
      toast.error("Không thể thêm vào phim yêu thích");
      return false;
    }
  };

  // Remove a movie from favorites
  const removeFromFavorites = async (movieId) => {
    if (!user) return false;

    try {
      const userFavoritesRef = doc(db, "favorites", user.uid);
      const movieToRemove = favorites.find((movie) => movie.id === movieId);

      if (movieToRemove) {
        await updateDoc(userFavoritesRef, {
          movies: arrayRemove(movieToRemove),
        });

        toast.success("Đã xóa khỏi phim yêu thích");
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error removing from favorites:", error);
      toast.error("Không thể xóa khỏi phim yêu thích");
      return false;
    }
  };

  return {
    favorites,
    loading,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
  };
}
