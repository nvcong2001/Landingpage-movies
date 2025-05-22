import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    day: "",
    month: "",
    year: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup, loginWithGoogle } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName) {
      setError("Vui lòng nhập họ và tên");
      return false;
    }

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError("Vui lòng nhập đầy đủ thông tin email và mật khẩu");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu không khớp");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);
    try {
      // Extract user data to pass to the signup function
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        birthDate:
          formData.day && formData.month && formData.year
            ? `${formData.day}/${formData.month}/${formData.year}`
            : null,
      };

      // Call signup with email, password and user data
      await signup(formData.email, formData.password, userData);

      toast.success("Đăng ký thành công!");
      navigate("/login");
    } catch (err) {
      console.error("Signup error:", err);
      let errorMessage = "Đăng ký thất bại";

      // Firebase error codes
      switch (err.code) {
        case "auth/email-already-in-use":
          errorMessage = "Email đã được sử dụng";
          break;
        case "auth/invalid-email":
          errorMessage = "Email không hợp lệ";
          break;
        case "auth/operation-not-allowed":
          errorMessage = "Đăng ký không được cho phép";
          break;
        case "auth/weak-password":
          errorMessage = "Mật khẩu quá yếu";
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
            Đăng ký
          </h1>

          {error && (
            <p className="p-3 bg-red-400 my-2 text-white rounded">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex gap-2">
              <input
                type="text"
                name="firstName"
                placeholder="Họ"
                value={formData.firstName}
                onChange={handleChange}
                className="w-[155px] p-4 rounded bg-gray-700 text-white"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Tên"
                value={formData.lastName}
                onChange={handleChange}
                className="w-[155px] p-4 rounded bg-gray-700 text-white"
              />
            </div>
            <div className="flex gap-4">
              <input
                type="number"
                name="day"
                placeholder="Ngày"
                min="1"
                max="31"
                value={formData.day}
                onChange={handleChange}
                className="w-24 p-4 rounded bg-gray-700 text-white"
              />
              <input
                type="number"
                name="month"
                placeholder="Tháng"
                min="1"
                max="12"
                value={formData.month}
                onChange={handleChange}
                className="w-24 p-4 rounded bg-gray-700 text-white"
              />
              <input
                type="number"
                name="year"
                placeholder="Năm"
                value={formData.year}
                onChange={handleChange}
                className="w-24 p-4 rounded bg-gray-700 text-white"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
              className="p-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="p-4 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded disabled:opacity-50"
            >
              {loading ? "Đang đăng ký..." : "Đăng ký"}
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

          <p className="mt-8 text-gray-400 text-center text-sm">
            Đã có tài khoản?{" "}
            <NavLink className="text-white hover:underline" to="/login">
              Đăng nhập ngay
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
