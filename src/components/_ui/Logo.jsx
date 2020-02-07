import React, { Fragment } from "react";
import njabLogoPink from "../../images/njab/logonjabpink.png";
import njabLogoWhite from "../../images/njab/logonjabwhite.png";
import { Image } from "@chakra-ui/core";
var classNames = require("classnames");

const Logo = ({ hideHeading = false, variant = "light" }) => (
  <div className={classNames("logo")}>
    <Image
      className="lazyload"
      data-src={variant === "light" ? njabLogoPink : njabLogoWhite}
      src={variant === "light" ? njabLogoPink : njabLogoWhite}
      height="30px"
      alt="NJAB Logo"
    />
  </div>
);

export default Logo;
