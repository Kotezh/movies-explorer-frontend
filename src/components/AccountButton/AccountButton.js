import "./AccountButton.css";
import { NavLink } from "react-router-dom";
import accountIcon from "../../images/account-icon.svg";

export default function AccountButton({ onClose }) {
  return (
    <NavLink to="/profile" onClick={onClose} className="account-button__text account-button">
      Аккаунт
      <img
        className="account-button__icon"
        src={accountIcon}
        alt="account icon"
      />
    </NavLink>
  );
}
