import { useState } from "react";
import "./Login.css";

const DEMO_EMAIL = "testuser@uidai.gov.in";
const DEMO_PASSWORD = "UIDAI@123";

const Login =({ onLogin })=> {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const submitLogin = (event) => {
    event.preventDefault();

    if (email.trim().toLowerCase() !== DEMO_EMAIL || password !== DEMO_PASSWORD) {
      setError("Use the demo email and password shown below.");
      return;
    }

    onLogin();
  };

  return (
    <main className="login-page">
      <section className="login-hero" aria-label="UIDAI Wallet information">
        <a className="brand login-brand" href="#login" aria-label="UIDAI Wallet home"><span className="brand__mark" aria-hidden="true">U</span><span>UIDAI <strong>Wallet</strong></span></a>
        <div className="login-hero__copy">
          <span className="dashboard__eyebrow">Your identity, simplified</span>
          <h1>Your digital credentials, in one secure place.</h1>
          <p>View verified UIDAI credentials with privacy controls built into every interaction.</p>
        </div>
        <div className="login-hero__privacy"><span aria-hidden="true">⌁</span><div><strong>Privacy first</strong><p>Personal details remain hidden until you choose to reveal them.</p></div></div>
      </section>

      <section className="login-panel" id="login" aria-labelledby="login-heading">
        <div className="login-card">
          <div className="login-card__heading"><span className="login-card__icon" aria-hidden="true">↗</span><div><h2 id="login-heading">Welcome back</h2><p>Sign in to access UIDAI account.</p></div></div>
          <form onSubmit={submitLogin} noValidate>
            <label htmlFor="email">Email address</label>
            <input id="email" type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@example.com" aria-invalid={Boolean(error)} />
            <label htmlFor="password">Password</label>
            <div className="password-field">
              <input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter your password" aria-invalid={Boolean(error)} />
              <button type="button" className="password-field__toggle" onClick={() => setShowPassword((shown) => !shown)} aria-label={showPassword ? "Hide password" : "Show password"} aria-pressed={showPassword}>
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  {showPassword ? <><path d="M3 3l18 18" /><path d="M10.6 10.7a2 2 0 0 0 2.7 2.7" /><path d="M9.9 5.1A10.6 10.6 0 0 1 12 4.9c5.2 0 8.7 5.1 8.7 7.1a9.7 9.7 0 0 1-2.2 3.5" /><path d="M6.1 6.2C3.8 8 3.3 10.4 3.3 12c0 2 3.5 7.1 8.7 7.1 1.2 0 2.3-.3 3.3-.8" /></> : <><path d="M2.8 12S6.2 5.1 12 5.1 21.2 12 21.2 12 17.8 18.9 12 18.9 2.8 12 2.8 12Z" /><circle cx="12" cy="12" r="2.7" /></>}
                </svg>
              </button>
            </div>
            {error && <p className="login-error" role="alert">{error}</p>}
            <button className="login-submit" type="submit">Sign in securely <span aria-hidden="true">→</span></button>
          </form>
        </div>
        
      </section>
    </main>
  );
}

export default Login;
