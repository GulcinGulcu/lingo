import { useState } from "react";
import Logo from "../../icons/Logo";
import { Link } from "react-router";
import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { loginMutation, isPending, error } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };
  return (
    <div className="h-screen flex justify-center items-center p-4 sm:p-6 lg:p-8">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-4xl mx-auto bg-base-100 rounded-xl shadow-xl overflow-hidden">
        {/* Left side */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col justify-center">
          <div className="mb-4 flex items-center justify-start gap-2">
            <Logo />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Lingo
            </span>
          </div>
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}
          <div className="w-full">
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Welcome Back</h2>
                  <p className="text-sm opacity-70">
                    Sign in to your account to continue language journey
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="example@example.com"
                      className="input input-bordered w-full"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="********"
                      className="input input-bordered w-full"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({
                          ...loginData,
                          password: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <button
                    className={`btn w-full ${
                      isPending ? "btn-neutral" : "btn-primary"
                    }`}
                    type="submit"
                  >
                    {isPending ? (
                      <>
                        <span className="loading loading-spinner loading-xs"></span>
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                  <div className="text-center mt-5">
                    <p className="text-sm ml-3">
                      Don't have an account?{" "}
                      <Link
                        to={"/signup"}
                        className="text-primary hover:underline"
                      >
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* Right side */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/5 items-center justify-center">
          <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="/call-amico.png"
                alt="application illustration"
                className="w-full h-full"
              />
            </div>
            <div className="text-center mt-5">
              <h2 className="text-lg font-semibold">
                Connect with language partners
              </h2>
              <p className="text-sm opacity-70">
                Practice conversations, make friends and improve your language
                skills
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
