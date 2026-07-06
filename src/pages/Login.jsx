import React, { useState } from 'react';
import logo from '../assets/images/logo.png';
import postlyImg from '../assets/images/postlyImg.png';
import { Eye, EyeOff } from 'lucide-react';
import useAuth from '../hooks/useAuth';

const Login = () => {

  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const {
    error,
    isLoading,
    showErrorAlert,
    setShowErrorAlert,
    handleSubmit,
    handleGoogleLogin,
    handleForgotPassword,
  } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  console.log(error);
  const{error: authError} = useAuth();

  return (
    <main className="min-h-screen flex flex-col bg-gray-100 items-center justify-center p-4 relative">

      
   


      <div className="bg-white rounded-sm shadow-md w-full max-w-4xl flex overflow-hidden min-h-[520px]">

        <div className="absolute top-13 left-58 z-20">
          <img src={logo} alt="postly" className="h-7 w-auto object-center" />
        </div>

        <div className="flex flex-1">

          <div className="w-1/2 flex items-center justify-center bg-white p-10 relative">
            <img
              src={postlyimg}
              alt="login illustration"
              className="w-[380px] object-contain relative z-10"
            />
          </div>

          <div className="w-1/2 flex items-center justify-center p-10 font-body">
            <div className="w-full max-w-md">

              <h1 className="text-3xl font-bold text-gray-900 mb-8">
                {isSignUp ? "Sign Up" : "Log In"}
              </h1>

              <p className="text-sm text-black mb-8 text-[16px] font-header">
                {isSignUp ? "Already a member? " : "First time user? "}
                <span
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-teal-600 font-semibold cursor-pointer hover:underline"
                >
                  {isSignUp ? "Login" : "Signup"}
                </span>
              </p>

              <form onSubmit={(e) => handleSubmit(e, form, isSignUp, rememberMe)} className="space-y-3">

                {isSignUp && (
                  <div className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1 font-body">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      placeholder="Isreal Lawson"
                      required
                      className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm outline-none font-header"
                    />
                  </div>
                )}

                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-1 font-bold">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Isreallawson@gmail.com"
                    required
                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm outline-none font-header"
                  />
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1 font-body">
                    <label className="text-sm font-medium text-gray-700 font-bold">
                      Password
                    </label>
                   
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder={error?.includes("invalid-credentials") ? "Incorrect password" : "........"}
                      required
                      className={`w-full border border-gray-300 rounded-md px-4 py-2.5 ${error?.includes("invalid-credentials") ? "placeholder:text-red-400" : "border-gray-500"} text-sm outline-none font-header`}
                    />
                    <button
                      type="button"
                      onClick={togglePassword}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {!isSignUp && (
                  <div className="flex items-center gap-2 text-sm mb-5">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                      className="accent-teal-600 w-3.5 h-3.5"
                    />
                    <label htmlFor="remember" className="text-gray-500 cursor-pointer">
                      Remember me
                    </label>

                     {!isSignUp && (
                      <span
                        onClick={() => handleForgotPassword(form.email)}
                        className="text-xs text-teal-600 hover:underline cursor-pointer gap-2 font-body ml-30"
                      >
                        Forgot password?
                      </span>
                    )}
                  </div>
                )}

                {error && (
                  <p className="text-red-500 text-sm font-body">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-teal-700 text-white py-3 rounded-full text-sm font-semibold"
                >
                  {isLoading ? "submitting..." : isSignUp ? "Create Account" : "Login"}
                </button>

                <div className="flex items-center my-1 gap-3">
                  <hr className="flex-1 border-gray-200" />
                  <span className="text-xs text-gray-400">OR</span>
                  <hr className="flex-1 border-gray-200" />
                </div>

                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full border border-gray-300 rounded-full py-2.5 text-sm flex items-center justify-center gap-2  text-black font-body"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  {isSignUp ? "Sign up with Google" : "Login with Google"}
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;