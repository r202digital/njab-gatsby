import React, { Fragment } from "react";
import { WhiteLogo, PinkLogo } from "./NjabLogos";
var classNames = require("classnames");

const Logo = ({ hideHeading = false, variant = "light" }) => (
  <div className={classNames("logo")}>
    {variant === "light" ? (
      <PinkLogo ml={{ xs: "1rem", md: "0" }} />
    ) : (
      <WhiteLogo ml={{ xs: "1rem", md: "0" }} />
    )}
  </div>
);

export default Logo;
