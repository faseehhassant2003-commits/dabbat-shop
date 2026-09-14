import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

type AuthMode = "login" | "register";

export default function Auth() {
  const location = useLocation();
  const mode: AuthMode = location.pathname === "/register" ? "register" : "login";
  const isRegister = mode === "register";
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setSubmitted(false);
    setError("");
  }, [mode]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    if (isRegister && form.get("password") !== form.get("confirmPassword")) {
      setError("Passwords do not match.");
      setSubmitted(false);
      return;
    }

    setError("");
    setSubmitted(true);
  };

  return (
    <section className="auth-page">
      <div className="auth-aside">
        <p className="eyebrow">DABBAT / PRIVATE ACCESS</p>
        <h1>Wear your<br /><span>point of view.</span></h1>
        <p className="auth-aside-copy">Thoughtful essentials, considered for the everyday wardrobe.</p>
        <div className="auth-aside-mark" aria-hidden="true"><span /><span /><span /></div>
      </div>

      <div className="auth-panel">
        <div className="auth-panel-head">
          <p className="eyebrow">{isRegister ? "CREATE ACCOUNT" : "WELCOME BACK"}</p>
          <h2>{isRegister ? "Join Dabbat" : "Sign in"}</h2>
          <p>{isRegister ? "Save your details and keep your edit close." : "Enter your details to continue shopping."}</p>
        </div>

        {submitted ? (
          <div className="auth-success" role="status">
            <span className="auth-success-icon" aria-hidden="true">✓</span>
            <h3>{isRegister ? "Account ready." : "You are signed in."}</h3>
            <p>{isRegister ? "Your Dabbat account has been created for this session." : "Welcome back to Dabbat. Your edit is waiting."}</p>
            <Link className="auth-submit auth-submit-link" to="/">Continue shopping <span aria-hidden="true">→</span></Link>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            {isRegister && <label><span>Full name</span><input name="name" type="text" autoComplete="name" required /></label>}
            <label><span>Email address</span><input name="email" type="email" autoComplete="email" required /></label>
            <label><span>Password</span><input name="password" type="password" autoComplete={isRegister ? "new-password" : "current-password"} minLength={8} required /></label>
            {isRegister && <label><span>Confirm password</span><input name="confirmPassword" type="password" autoComplete="new-password" minLength={8} required /></label>}
            {error && <p className="auth-error" role="alert">{error}</p>}
            <div className="auth-form-meta">
              {!isRegister && <label className="auth-check"><input name="remember" type="checkbox" /><span>Remember me</span></label>}
              {!isRegister && <button type="button" className="auth-text-button">Forgot password?</button>}
            </div>
            <button className="auth-submit" type="submit">{isRegister ? "Create account" : "Sign in"} <span aria-hidden="true">→</span></button>
          </form>
        )}

        <p className="auth-switch">{isRegister ? "Already have an account?" : "New to Dabbat?"}{" "}<Link to={isRegister ? "/login" : "/register"}>{isRegister ? "Sign in" : "Create an account"}</Link></p>
      </div>
    </section>
  );
}