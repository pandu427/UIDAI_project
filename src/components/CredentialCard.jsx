import SecureDataMask from "./SecureDataMask";
import "./CredentialCard.css";

const CredentialCard=({ credential })=> {
  const isAadhaar = credential.type === "Aadhaar";
  const date = new Date(`${credential.issuedDate}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  return (
    <article className={`credential-card credential-card--${credential.type.toLowerCase().replace(/\s+/g, "-")}`}>
      {isAadhaar && <div className="aadhaar-card-banner"><span>Digital identity credential</span><strong>DEMO</strong></div>}
      <div className="credential-card__header">
        <div className="credential-card__identity">
          <span className="credential-card__icon" aria-hidden="true">{credential.type === "Aadhaar" ? "A" : "K"}</span>
          <div><span className="credential-card__eyebrow">{isAadhaar ? "Identity credential" : "Digital Credential"}</span><h2>{credential.type}</h2></div>
        </div>
        <span className="credential-card__status"><span aria-hidden="true">✓</span>{credential.status}</span>
      </div>

      <div className="credential-card__body">
        <div className="credential-field">
          <span className="credential-field__label">{isAadhaar ? "Name" : "Holder"}</span>
          <span>{credential.holder}</span>
        </div>

        {isAadhaar && credential.dateOfBirth && <div className="credential-field">
          <span className="credential-field__label">Date of birth</span>
          <span>{credential.dateOfBirth}</span>
        </div>}

        {isAadhaar && credential.gender && <div className="credential-field">
          <span className="credential-field__label">Gender</span>
          <span>{credential.gender}</span>
        </div>}

        <div className="credential-field">
          <span className="credential-field__label">{isAadhaar ? "Issued by" : "Issuer"}</span>
          <span>{credential.issuer}</span>
        </div>

        <div className="credential-field">
          <span className="credential-field__label">{isAadhaar ? "Issue date" : "Issued"}</span>
          <time dateTime={credential.issuedDate}>{date}</time>
        </div>

        {isAadhaar && credential.address && <div className="credential-field credential-field--wide">
          <span className="credential-field__label">Address</span>
          <span>{credential.address}</span>
        </div>}

        {isAadhaar && credential.mobileNumber && <div className="credential-field">
          <span className="credential-field__label">Mobile number</span>
          <SecureDataMask value={credential.mobileNumber} label="Mobile number" />
        </div>}

        <div className="credential-field credential-field--sensitive">
          <span className="credential-field__label">Aadhaar Number</span>
          <SecureDataMask value={credential.aadhaarNumber} label="Aadhaar number" />
        </div>
      </div>
      <div className="credential-card__footer"><span><span className="credential-card__lock" aria-hidden="true">⌁</span> Protected wallet data</span><span>{isAadhaar ? "Digital preview" : "UIDAI"}</span></div>
    </article>
  );
}

export default CredentialCard;
