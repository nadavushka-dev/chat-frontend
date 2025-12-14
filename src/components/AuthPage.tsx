import { useState } from "react";
import { useForm } from "react-hook-form";
import { userActions } from "../store/thunks/user.thunk";
import { RootState, useAppDispatch } from "../store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

type AuthMode = "login" | "signup";

const AuthPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("login");
  const [error, setError] = useState<string | null>(null);
  const isLoading = useSelector((state: RootState) => state.user.isLoading);

  const { register, handleSubmit, watch } = useForm();
  const password = watch("password");
  const email = watch("email");
  const name = watch("name");

  const onSubmit = async (data: any) => {
    try {
      if (mode === "login") {
        await dispatch(userActions.loginThunk(data)).unwrap();
      } else if (mode === "signup") {
        await dispatch(userActions.signupThunk(data)).unwrap();
      }
      navigate(`/`);
    } catch (err: any) {
      setError(err?.error ?? "Something went wrong");
    }
  };

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setError(null);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">ChatApp</h1>
          <p className="auth-subtitle">
            {mode === "login"
              ? "Welcome back! Sign in to continue"
              : "Create an account to get started"}
          </p>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${mode === "login" ? "active" : ""}`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={`auth-tab ${mode === "signup" ? "active" : ""}`}
            onClick={() => setMode("signup")}
          >
            Sign Up
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
          {mode === "signup" && (
            <div className="auth-field">
              <label htmlFor="username" className="auth-label">
                Username
              </label>
              <input
                {...register("name")}
                id="username"
                type="text"
                className="auth-input"
                placeholder="Enter your username"
                disabled={isLoading}
              />
            </div>
          )}

          <div className="auth-field">
            <label htmlFor="email" className="auth-label">
              Email
            </label>
            <input
              {...register("email")}
              id="email"
              type="email"
              className="auth-input"
              placeholder="Enter your email"
              disabled={isLoading}
            />
          </div>

          <div className="auth-field">
            <label htmlFor="password" className="auth-label">
              Password
            </label>
            <input
              {...register("password")}
              id="password"
              type="password"
              className="auth-input"
              placeholder="Enter your password"
              disabled={isLoading}
            />
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button
            type="submit"
            className="auth-btn"
            disabled={
              isLoading || !email || !password || (mode === "signup" && !name)
            }
          >
            {isLoading
              ? "Please wait..."
              : mode === "login"
                ? "Sign In"
                : "Create Account"}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-toggle-text">
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <button className="auth-toggle-btn" onClick={toggleMode}>
              {mode === "login" ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
