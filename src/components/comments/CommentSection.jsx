import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { db } from "../../firebase/firebase.config";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const CommentSection = ({ movieId, movieName }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!movieId) return;

    // Set up real-time listener for comments
    const commentsRef = collection(db, "comments");
    const q = query(
      commentsRef,
      where("movieId", "==", movieId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [movieId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    if (!comment.trim()) return;
    if (!user) {
      toast.error("Vui lòng đăng nhập để bình luận!");
      return;
    }

    try {
      await addDoc(collection(db, "comments"), {
        movieId,
        movieName,
        text: comment,
        userId: user.uid,
        userEmail: user.email,
        userName: user.displayName || user.email.split("@")[0],
        userPhotoURL: user.photoURL,
        createdAt: serverTimestamp(),
      });

      setComment("");
      toast.success("Đã đăng bình luận!");
    } catch (error) {
      console.error("Error adding comment: ", error);
      toast.error("Không thể đăng bình luận. Vui lòng thử lại sau.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!user) return;

    try {
      await deleteDoc(doc(db, "comments", commentId));
      toast.success("Đã xóa bình luận!");
    } catch (error) {
      console.error("Error deleting comment: ", error);
      toast.error("Không thể xóa bình luận.");
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "";

    const date = timestamp.toDate();
    return new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="my-10 bg-[#161616] rounded-lg p-5">
      <h2 className="text-2xl font-bold mb-6 text-white border-b border-gray-700 pb-2">
        Bình luận ({comments.length})
      </h2>

      {/* Comment form */}
      <div className="mb-8">
        {user ? (
          <form onSubmit={handleSubmitComment} className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={
                    user.photoURL ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.displayName || user.email.charAt(0)
                    )}&background=E11D48&color=fff`
                  }
                  alt={user.displayName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.email.charAt(0)
                    )}&background=E11D48&color=fff`;
                  }}
                />
              </div>
              <div className="flex-grow">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Thêm bình luận..."
                  className="w-full bg-[#252328] text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[80px]"
                  required
                ></textarea>
                <button
                  type="submit"
                  className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
                >
                  Đăng bình luận
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="bg-[#252328] p-4 rounded-lg text-center">
            <p className="text-white mb-2">
              Đăng nhập để bình luận về phim này
            </p>
            <Link
              to="/login"
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition"
            >
              Đăng nhập
            </Link>
          </div>
        )}
      </div>

      {/* Comments list */}
      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-4">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-600 border-r-transparent"></div>
            <p className="text-white mt-2">Đang tải bình luận...</p>
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={
                    comment.userPhotoURL ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      comment.userName.charAt(0)
                    )}&background=E11D48&color=fff`
                  }
                  alt={comment.userName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      comment.userName.charAt(0)
                    )}&background=E11D48&color=fff`;
                  }}
                />
              </div>
              <div className="flex-grow">
                <div className="bg-[#252328] rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-white">
                        {comment.userName}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {formatDate(comment.createdAt)}
                      </p>
                    </div>
                    {user && user.uid === comment.userId && (
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="text-gray-400 hover:text-red-500"
                        title="Xóa bình luận"
                      >
                        <i className="bx bx-trash text-xl"></i>
                      </button>
                    )}
                  </div>
                  <p className="text-white mt-2">{comment.text}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 py-4">
            Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
