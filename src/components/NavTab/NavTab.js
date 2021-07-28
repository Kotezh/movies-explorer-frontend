import React from "react";
import { HashLink as Link } from "react-router-hash-link";
import "./NavTab.css";

export default function NavTab() {
  return (
    <div className="nav-tab">
      <Link className="nav-tab__link" to="#about-project">
        О проекте
      </Link>
      <Link className="nav-tab__link" to="#technologies">
        Технологии
      </Link>
      <Link className="nav-tab__link" to="#student">
        Студент
      </Link>
    </div>
  );
}
