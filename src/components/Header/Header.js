import React from "react";
import { useLocation } from "react-router-dom";
import "./Header.css";
import Logo from "../Logo/Logo";
import Navigation from "../Navigation/Navigation";

export default function Header() {
  const location = useLocation();
  const isPageWithHeader = [
    "/",
    "/movies",
    "/saved-movies",
    "/profile",
  ].includes(location.pathname);

  return (
    <>
      {isPageWithHeader ? (
        <div className="header">
          <Logo />
          <Navigation />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
