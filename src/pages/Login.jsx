import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (login === "user" && password === "12345") {
      const fakeToken = crypto.randomUUID();

      const userData = {
        login,
      };

      localStorage.setItem("token", fakeToken);
      localStorage.setItem("user", JSON.stringify(userData));

      dispatch(
        loginSuccess({
          token: fakeToken,
          user: userData,
        }),
      );

      toast.success("Muvaffaqiyatli kirdingiz! Yo'naltirilmoqda...");

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } else {
      toast.error("Login yoki parol xato");
    }
  };

  return (
    <div className="flex min-h-screen font-sans">
      <div className="hidden lg:flex lg:w-1/2 bg-[#1e293b] items-center justify-center p-12">
        <img
          src="/svg/study.svg"
          alt="Study Illustration"
          className="max-w-full h-auto"
        />
      </div>

      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 bg-white relative">
        <div className="flex flex-col items-center text-center mb-8">
          <p className="text-[10px] md:text-xs uppercase tracking-widest text-gray-600 mb-4 max-w-[300px]">
            MUHAMMAD AL-XORAZMIY NOMIDAGI TOSHKENT AXBOROT TEXNOLOGIYALARI
            UNIVERSITETI
          </p>

          <img src="/img/Logo.png" alt="TUIT Logo" className="w-20 h-20 mb-4" />

          <h1 className="text-xl font-bold text-gray-800 tracking-tight">
            LEARNING MANAGEMENT SYSTEM
          </h1>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Login
            </label>

            <input
              type="text"
              placeholder="Loginni kiriting"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="mb-6 relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parol
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Parolni kiriting"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-[#1e293b] text-white py-2.5 rounded-md"
          >
            Kirish
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
