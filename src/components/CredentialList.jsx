import CredentialCard from "./CredentialCard";
import "./CredentialList.css";

const CredentialList=({ credentials })=> {
  return (
    <div className="credential-list">
      {credentials.map((credential) => (
        <CredentialCard key={credential.id} credential={credential} />
      ))}
    </div>
  );
}

export default CredentialList;