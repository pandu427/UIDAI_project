import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCredentials } from "../features/credentials/credentialsSlice";
import CredentialList from "../components/CredentialList";
import "./Dashboard.css";

const Dashboard =({ onLogout })=> {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.credentials);
  const [profileOpen, setProfileOpen] = useState(false);
  const [securityOpen, setSecurityOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("credentials");
  const holderName = items[0]?.holder || "there";
  const allVerified = items.length > 0 && items.every((credential) => credential.status === "Verified");

  useEffect(() => {
    dispatch(getCredentials());
  }, [dispatch]);

  return (
    <main className="wallet-shell">
      <nav className="topbar" aria-label="Main navigation">
        <a className="brand" href="#wallet" aria-label="UIDAI Wallet home">
          <span className="brand__mark" aria-hidden="true">U</span>
          <span>UIDAI <strong>Wallet</strong></span>
        </a>
        <div className="topbar__nav" aria-label="Wallet sections">
          <a className={`topbar__nav-link ${activeTab === "credentials" ? "topbar__nav-link--active" : ""}`} href="#credentials-heading" onClick={() => { setActiveTab("credentials"); setSecurityOpen(false); }}>Credentials</a>
          <button className={`topbar__nav-link topbar__nav-button ${activeTab === "security" ? "topbar__nav-link--active" : ""}`} type="button" aria-expanded={securityOpen} aria-controls="security-panel" onClick={() => { setActiveTab("security"); setSecurityOpen(true); }}>Security</button>
        </div>
        <div className="topbar__actions">
          <span className="topbar__secure"><span aria-hidden="true">⌁</span> Secure wallet</span>
          <div className="profile-menu">
            <button className="avatar" type="button" aria-label="Open profile menu" aria-expanded={profileOpen} onClick={() => setProfileOpen((open) => !open)}>TU</button>
            {profileOpen && <div className="profile-menu__panel"><strong>Test User</strong><span>Secure UIDAI wallet</span><button type="button" onClick={onLogout}>Log out</button></div>}
          </div>
        </div>
      </nav>

      <section className="dashboard" id="wallet">
        <header className="dashboard__header">
          <div className="welcome-copy">
            <span className="dashboard__eyebrow">Your digital identity</span>
            <h1>Welcome back, {holderName}</h1>
            <p>Your verified credentials are encrypted and ready whenever you need them.</p>
          </div>
          <div className="security-note">
            <span className="security-note__icon" aria-hidden="true">⌾</span>
            <div><strong>Private by design</strong><span>Details stay hidden until you reveal them.</span></div>
          </div>
        </header>

        {activeTab === "credentials" && <section className="wallet-overview" aria-label="Wallet overview">
          <div className="wallet-overview__main">
            <span className="wallet-overview__icon" aria-hidden="true">▣</span>
            <div><span className="wallet-overview__label">Available credentials</span><strong>{status === "succeeded" ? items.length : "—"}</strong></div>
          </div>
          <div className="wallet-overview__message"><span className="verified-dot" aria-hidden="true" /> {allVerified ? "All credentials are verified" : "Verification in progress"}</div>
        </section>}

        {activeTab === "security" && securityOpen && (
          <section className="security-panel" id="security-panel" aria-labelledby="security-heading">
            <div className="security-panel__heading">
              <div><span className="section-heading__eyebrow">Security center</span><h2 id="security-heading">Your privacy is in your control</h2></div>
              <button className="security-panel__close" type="button" onClick={() => { setSecurityOpen(false); setActiveTab("credentials"); }} aria-label="Close security center">×</button>
            </div>
            <div className="security-panel__items">
              <div><span aria-hidden="true">◉</span><strong>Details start hidden</strong><p>Your Aadhaar number is masked until you choose to reveal it.</p></div>
              <div><span aria-hidden="true">◷</span><strong>Automatic privacy timeout</strong><p>Revealed Aadhaar details are masked again after 10 seconds.</p></div>
              <div><span aria-hidden="true">⌁</span><strong>Offline continuity</strong><p>Your latest credential response remains available during a network interruption.</p></div>
            </div>
          </section>
        )}

      {activeTab === "credentials" && status === "loading" && (
        <section className="dashboard-state" aria-live="polite">
          <div className="loading-cards" aria-hidden="true"><span /><span /></div>
          <p>Securing your wallet…</p>
        </section>
      )}

      {activeTab === "credentials" && status === "failed" && (
        <section className="dashboard-state dashboard-state--error" role="alert">
          <h2>Unable to load credentials</h2>
          <p>{error || "Something went wrong."}</p>
          <button type="button" onClick={() => dispatch(getCredentials())}>
            Try Again
          </button>
        </section>
      )}

      {activeTab === "credentials" && status === "succeeded" && items.length === 0 && (
        <section className="dashboard-state">
          <h2>No credentials found</h2>
          <p>You currently have no digital credentials available in your wallet.</p>
        </section>
      )}

      {activeTab === "credentials" && status === "succeeded" && items.length > 0 && (
        <section className="credentials-section" aria-labelledby="credentials-heading">
          <div className="section-heading">
            <div><span className="section-heading__eyebrow">My wallet</span><h2 id="credentials-heading">Your credentials</h2></div>
            <span>{items.length} {items.length === 1 ? "credential" : "credentials"}</span>
          </div>
          <CredentialList credentials={items} />
        </section>
      )}
      </section>
    </main>
  );
}

export default Dashboard;
