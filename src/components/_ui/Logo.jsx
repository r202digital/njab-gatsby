import React, { Fragment } from "react";
import { WhiteLogo, PinkLogo } from "./NjabLogos";
var classNames = require("classnames");

const Logo = ({ hideHeading = false, variant = "light" }) => (
  <div className={classNames("logo")}>
    {/* <Image
      color="white"
      data-src={variant === "light" ? njabLogoPink : njabLogoWhite}
      src={variant === "light" ? njabLogoPink : njabLogoWhite}
      height="30px"
      alt="NJAB Logo"
    /> */}
    {variant === "light" ? <PinkLogo /> : <WhiteLogo />}
  </div>
);

export default Logo;
