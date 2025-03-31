import React, { useRef, useState } from "react";
// import Image from "./../assets/google.png";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";

import { useMutation } from "@tanstack/react-query";
import { LoginwithGoogle } from "../Services/AuthService/LoginwithGoogle";
import { jwtDecode, JwtPayload } from "jwt-decode";
interface CustomJwtPayload extends JwtPayload {
  // Role: string;
  role: string;
  id: string;
  name: string;
  email: string;
  fullName: string;
}

// import axios from "axios";

const Login: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: LoginwithGoogle,
    onSuccess: (data) => {
      console.log("ok chua", data);
      const userInfo = jwtDecode<CustomJwtPayload>(data.token);
      console.log("thong tin", userInfo);
      const userRole = userInfo.role.toLowerCase();
      const userId = userInfo.id.toLowerCase();
      // const userName = userInfo.name;
      const fullName = userInfo.fullName;

      const Email = userInfo.email;
      const token = data.token;
      const from = location.state?.from || "/";
      const redirectPath = localStorage.getItem("redirectPath") || "/";
      if (userRole === "customer") {
        localStorage.setItem("token", token);
        localStorage.setItem("FullName", fullName);
        localStorage.setItem("Email", Email);
        localStorage.setItem("role", userRole);
        localStorage.setItem("userId", userId);
        navigate(from !== "/" ? from : redirectPath);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // const login = useGoogleLogin({
  //   onSuccess: async (response) => {
  //     try {
  //       console.log('Authorization code:', response.code);

  //       // ✅ Gửi code lên backend để xử lý
  //       const result = await axios.post('https://localhost:7224/api/Auth/signin-google', {
  //         code: response.code, // ✅ Gửi mã code thay vì token
  //       });

  //       console.log('Login successful:', result.data);
  //       localStorage.setItem('token', result.data.token);
  //       alert('Login successful');
  //     } catch (error) {
  //       console.error('Login failed:', error);
  //       alert('Login failed');
  //     }
  //   },
  //   onError: (error) => {
  //     console.error('Login failed:', error);
  //     alert('Login failed');
  //   },
  //   flow: 'auth-code', // ✅ Kích hoạt auth-code flow
  // });

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
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [showPassword, setShowPassword] = useState(false);

  const showhandlePassword = () => {
    // setShowPassword(!showPassword);
    setShowPassword((prev) => !prev);
    if (showPassword) {
      passwordRef.current!.type = "password";
    } else {
      passwordRef.current!.type = "text";
    }
  };

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPasswordValid) {
      const email = emailRef.current?.value;
      const password = passwordRef.current?.value;
      // Xử lý đăng nhập với email và password
      console.log("Email:", email);
      console.log("Password:", password);
    }
  };

  return (
    <section className="xl:py-12 box-border">
      <div className="max-w-[90vw] px-[.78125rem] mx-auto w-full text-base">
        <div className="p-10 mx-auto shadow rounded-lg max-w-2xl overflow-hidden">
          <h1 className="text-2xl text-red-900 text-center mb-10 font-bold">
            Đăng nhập vào tài khoản của bạn
          </h1>

          <h2 className="text-sm leading-snug mb-5 font-bold">
            Đăng nhập để không bỏ lỡ quyền lợi tích luỹ và hoàn tiền cho bất kỳ
            đơn hàng nào
          </h2>
          {/* <GoogleLogin
          
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
          /> */}
          <form action="" className="mb-5">
            {/* <button
              type="button"
              onClick={() => login()}
              className="border border-gray-300 bg-white text-gray-800 shadow transition-all duration-150 ease-in-out px-4 py-2 w-full flex justify-center items-center rounded h-10 font-medium text-base cursor-pointer"
            >
              <span className="w-5 h-5">
                <img src={Image} alt="google" className="object-contain" />
              </span>
              <span className="ml-2">Đăng nhập với Google</span>
            </button> */}
            <GoogleLogin
              onSuccess={async (response) => {
                try {
                  console.log("Google response:", response);

                  // ✅ Send the JWT token (credential) to backend
                  mutate({ credential: { credential: response.credential } });

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

            <div className="mt-5 mb-[1.25rem]">
              <label htmlFor="password" className="text-gray-700 text-base">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  ref={passwordRef}
                  type={passwordRef.current?.type}
                  id="password"
                  onBlur={validatePassword}
                  className={`mt-1 h-11 text-base border ${
                    passwordError ? "border-red-500" : "border-gray-700"
                  } rounded-lg bg-transparent px-4 w-full text-gray-700`}
                  placeholder="Nhập mật khẩu"
                />
                <span
                  className="absolute top-1/2 right-[0.125rem] -translate-x-1/2 -translate-y-4.5  z-10 cursor-pointer m-0 text-red-900 text-xl leading-none block mt-2  font-normal font-sans"
                  onClick={showhandlePassword}
                >
                  {showPassword ? (
                    <VisibilityOutlinedIcon />
                  ) : (
                    <VisibilityOffOutlinedIcon />
                  )}
                </span>
              </div>
              {passwordError && (
                <span className="block mt-2 text-red-500 font-normal text-xs">
                  {passwordError}
                </span>
              )}
            </div>
            <div className="flex gap-[1.25rem] items-center justify-between mb-[1.25rem] text-base  flex-row-reverse">
              <p className="m-0 right-0">Quên mật khẩu ? </p>
            </div>

            <button
              type="submit"
              className="mb-5 w-full bg-red-800 text-white py-2 rounded-lg font-medium"
            >
              Đăng nhập
            </button>
            <p className="mt-[.75rem] m-0 ">
              <span>Bạn chưa có tài khoản?</span>
              <Link to="/register" className="text-red-800 font-bold">
                {" "}
                Đăng ký ngay
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
