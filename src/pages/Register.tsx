import React, { useRef, useState } from "react";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { GoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import { LoginwithGoogle } from "../Services/AuthService/LoginwithGoogle";
import { useMutation } from "@tanstack/react-query";
// import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const validateEmail = () => {
    const email = emailRef.current?.value || "";
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Vui lòng nhập email hợp lệ");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = () => {
    const password = passwordRef.current?.value || "";
    if (!password || password.length < 6) {
      setPasswordError("Mật khẩu phải ít nhất 6 ký tự");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateConfirmPassword = () => {
    const password = passwordRef.current?.value || "";
    const confirmPassword = confirmPasswordRef.current?.value || "";
    if (confirmPassword !== password) {
      setConfirmPasswordError("Mật khẩu không khớp");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
      const email = emailRef.current?.value;
      const username = userNameRef.current?.value;
      const password = passwordRef.current?.value;

      console.log("Email:", email);
      console.log("Username:", username);
      console.log("Password:", password);
      // Tiếp tục xử lý đăng ký...
    }
  };

  const { mutate } = useMutation({
    mutationFn: LoginwithGoogle,
    onSuccess: (data) => {
      console.log(data);

    },
    onError: (error) => {
      console.log(error);
    },
  });

  useGoogleOneTapLogin({
    onSuccess: (response) => {
      console.log("One Tap Response:", response);

      // Get the ID token directly from the response
      const credential = response.credential;
      console.log("Credential (ID Token):", credential);

      // Send credential to backend
      mutate({ credential: { credential: credential } });
    },
    onError: () => {
      console.error("One Tap Login Failed:");
    },
  });
  return (
    <section className="xl:py-12 box-border">
      <div className="max-w-[90vw] px-[.78125rem] mx-auto w-full text-base">
        <div className="p-10 mx-auto shadow rounded-lg max-w-2xl overflow-hidden">
          <h1 className="text-2xl text-red-900 text-center mb-10 font-bold">
            Tạo tài khoản mới
          </h1>

          <h2 className="text-sm leading-snug mb-5 font-bold">
            Đăng ký để không bỏ lỡ quyền lợi tích luỹ và hoàn tiền cho bất kỳ đơn hàng nào
          </h2>

          <form action="" className="mb-5">
            {/* <button
              type="button"
              className="border border-gray-300 bg-white text-gray-800 shadow transition-all duration-150 ease-in-out px-4 py-2 w-full flex justify-center items-center rounded h-10 font-medium text-base cursor-pointer"
            >
              <span className="w-5 h-5">
                <img src={Image} alt="google" className="object-contain" />
              </span>
              <span className="ml-2">Đăng ký với Google</span>
            </button> */}
               <GoogleLogin
          
          onSuccess={async (response) => {
            try {
              console.log("Google response:", response);

              // ✅ Send the JWT token (credential) to backend
              mutate({ credential: { credential:response.credential } });
            
              alert("Login successful");
            } catch (error) {
              console.error("Login failed:", error);
              alert("Login failed");
            }
          }}
          onError={() => {
            console.error("Login failed");
            alert("Login failed");
          }}
          theme="outline"
          size="large"
          shape="pill"
          width="full"
          useOneTap={true}
          text="signin_with"
          logo_alignment="center"
          
        />
          </form>

          <p className="relative text-sm text-center before:absolute before:bg-gray-200 before:w-full before:h-px before:top-1/2 before:left-0 before:-z-10">
            <span className="bg-white px-2">Hoặc tiếp tục với email</span>
          </p>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mt-5">
              <label htmlFor="email" className="text-gray-700 text-base">
                Email
              </label>
              <input
                ref={emailRef}
                type="email"
                id="email"
                onBlur={validateEmail}
                className={`mt-1 h-11 text-base border ${
                  emailError ? "border-red-500" : "border-gray-700"
                } rounded-lg bg-transparent px-4 w-full text-gray-700`}
                placeholder="Nhập email"
              />
              {emailError && (
                <span className="block mt-2 text-red-500 font-normal text-xs">
                  {emailError}
                </span>
              )}
            </div>

            {/* Họ và tên */}
            <div className="mt-5">
              <label htmlFor="username" className="text-gray-700 text-base">
                Họ và tên
              </label>
              <input
                ref={userNameRef}
                type="text"
                id="username"
                className="mt-1 h-11 text-base border border-gray-700 rounded-lg bg-transparent px-4 w-full text-gray-700"
                placeholder="Nhập họ và tên"
              />
            </div>

            {/* Mật khẩu */}
            <div className="mt-5">
              <label htmlFor="password" className="text-gray-700 text-base">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  onBlur={validatePassword}
                  className={`mt-1 h-11 text-base border ${
                    passwordError ? "border-red-500" : "border-gray-700"
                  } rounded-lg bg-transparent px-4 w-full text-gray-700`}
                  placeholder="Nhập mật khẩu"
                />
                <span
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-gray-700"
                  onClick={toggleShowPassword}
                >
                  {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                </span>
              </div>
              {passwordError && (
                <span className="block mt-2 text-red-500 font-normal text-xs">
                  {passwordError}
                </span>
              )}
            </div>

            {/* Nhập lại mật khẩu */}
            <div className="mt-5">
              <label htmlFor="confirmPassword" className="text-gray-700 text-base">
                Nhập lại mật khẩu
              </label>
              <input
                ref={confirmPasswordRef}
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                onBlur={validateConfirmPassword}
                className={`mt-1 h-11 text-base border ${
                  confirmPasswordError ? "border-red-500" : "border-gray-700"
                } rounded-lg bg-transparent px-4 w-full text-gray-700`}
                placeholder="Nhập lại mật khẩu"
              />
              {confirmPasswordError && (
                <span className="block mt-2 text-red-500 font-normal text-xs">
                  {confirmPasswordError}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-red-800 text-white py-2 rounded-lg font-medium"
            >
              Đăng ký
            </button>

            {/* <p className="mt-3">
              Bạn đã có tài khoản?
              <Link to="/login" className="text-red-800 font-bold ml-1">Đăng nhập</Link>
            </p> */}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
