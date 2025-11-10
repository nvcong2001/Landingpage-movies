import { useState, useEffect } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isResetMode, setIsResetMode] = useState(false);
  const [oobCode, setOobCode] = useState("");
  const { resetPassword, verifyResetCode, confirmResetPassword } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("oobCode");
    if (code) {
      setOobCode(code);
      verifyResetCode(code)
        .then(({ email }) => {
          setEmail(email);
          setIsResetMode(true);
          setMessage("Vui lòng nhập mật khẩu mới của bạn");
        })
        .catch((err) => {
          console.error("Verify code error:", err);
          setError("Mã xác thực không hợp lệ hoặc đã hết hạn");
          toast.error("Mã xác thực không hợp lệ hoặc đã hết hạn");
        });
    }
  }, [searchParams, verifyResetCode]);

  const handleResetRequest = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Vui lòng nhập email của bạn");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(email);
      setMessage(
        "Đã gửi email đặt lại mật khẩu. Vui lòng kiểm tra hộp thư của bạn."
      );
      toast.success("Email đặt lại mật khẩu đã được gửi!");
    } catch (err) {
      console.error("Reset password error:", err);
      let errorMessage = "Không thể gửi email đặt lại mật khẩu";

      if (err.code === "auth/user-not-found") {
        errorMessage = "Không tìm thấy tài khoản với email này";
      } else if (err.code === "auth/invalid-email") {
        errorMessage = "Email không hợp lệ";
      }

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!newPassword) {
      setError("Vui lòng nhập mật khẩu mới");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    if (newPassword.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    setLoading(true);
    try {
      await confirmResetPassword(oobCode, newPassword);
      toast.success("Đổi mật khẩu thành công!");
      navigate("/login");
    } catch (err) {
      console.error("Password reset error:", err);
      setError("Không thể đổi mật khẩu. Vui lòng thử lại");
      toast.error("Không thể đổi mật khẩu. Vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <img
        src="https://static-cse.canva.com/blob/1167217/createbanners.jpg"
        alt="background"
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <div className="bg-black bg-opacity-60 p-10 rounded-lg w-[400px]">
          <h1 className="text-4xl font-bold text-red-600 mb-8 text-center">
            Quên Mật Khẩu
          </h1>

          {error && (
            <p className="p-3 bg-red-400 my-2 text-white rounded">{error}</p>
          )}

          {message && (
            <p className="p-3 bg-green-500 my-2 text-white rounded">
              {message}
            </p>
          )}

          {!isResetMode ? (
            <form onSubmit={handleResetRequest} className="flex flex-col gap-4">
              <p className="text-gray-300 mb-2">
                Nhập email của bạn để nhận liên kết đặt lại mật khẩu
              </p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="p-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="mt-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded disabled:opacity-50"
              >
                {loading ? "Đang gửi..." : "Gửi liên kết đặt lại"}
              </button>
            </form>
          ) : (
            <form
              onSubmit={handlePasswordReset}
              className="flex flex-col gap-4"
            >
              <p className="text-gray-300 mb-2">
                Đặt lại mật khẩu cho tài khoản: {email}
              </p>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Mật khẩu mới"
                className="p-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Xác nhận mật khẩu mới"
                className="p-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="mt-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded disabled:opacity-50"
              >
                {loading ? "Đang xử lý..." : "Đổi mật khẩu"}
              </button>
            </form>
          )}

          <div className="mt-8 text-center">
            <NavLink className="text-white hover:underline" to="/login">
              Quay lại đăng nhập
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
