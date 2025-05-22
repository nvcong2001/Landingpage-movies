import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, loginWithGoogle } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setLoading(true);
    try {
      await login(formData.email, formData.password);
      toast.success("Đăng nhập thành công!");
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      let errorMessage = "Đăng nhập thất bại";

      // Firebase error codes
      switch (err.code) {
        case "auth/user-not-found":
          errorMessage = "Tài khoản không tồn tại";
          break;
        case "auth/wrong-password":
          errorMessage = "Mật khẩu không đúng";
          break;
        case "auth/invalid-email":
          errorMessage = "Email không hợp lệ";
          break;
        case "auth/too-many-requests":
          errorMessage = "Quá nhiều lần thử. Vui lòng thử lại sau";
          break;
      }

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      toast.success("Đăng nhập với Google thành công!");
      navigate("/");
    } catch (err) {
      console.error("Google sign in error:", err);
      const errorMessage = "Không thể đăng nhập với Google";
      setError(errorMessage);
      toast.error(errorMessage);
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
            Đăng nhập
          </h1>

          {error && (
            <div className="p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded mb-4 text-red-100">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="p-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mật khẩu"
              className="p-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded disabled:opacity-50"
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-600" />
            <span className="mx-4 text-gray-400">HOẶC</span>
            <div className="flex-grow h-px bg-gray-600" />
          </div>

          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-white hover:bg-gray-100 text-black font-semibold py-3 rounded flex items-center justify-center gap-2"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="w-6 h-6"
            />
            Đăng nhập với Google
          </button>

          <div className="flex justify-between items-center mt-6 text-sm text-gray-400">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 mr-2 text-red-600 bg-gray-700 border-gray-600 rounded focus:ring-red-500"
              />
              Ghi nhớ tài khoản
            </label>
            <NavLink to="/forgot-password" className="hover:underline">
              Quên mật khẩu?
            </NavLink>
          </div>

          <p className="mt-8 text-gray-400 text-center text-sm">
            Chưa có tài khoản?{" "}
            <NavLink className="text-white hover:underline" to="/signup">
              Đăng ký ngay
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
