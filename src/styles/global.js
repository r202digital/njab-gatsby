import css from "@emotion/css";
import colors from "styles/colors";
import dimensions from "styles/dimensions";
import "nprogress/nprogress.css";

const globalStyles = css`
  html,
  body,
  #root {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    min-height: 100%;
    font-family: "Montserrat", -apple-system, BlinkMacSystemFont, Helvetica,
      sans-serif;
  }

  body {
    width: 100%;
    margin: 0 auto;
    font-size: 16px;
    line-height: 1.5;
    color: ${colors.grey900};
    -webkit-font-smoothing: antialiased;

    @media (max-width: ${dimensions.maxwidthMobile}px) {
      font-size: 14px;
    }

    * {
      box-sizing: border-box;

      &::selection {
        color: ${colors.qimodaLight};
        background-color: ${colors.teal200};
      }
    }
  }

  a {
    transition: 0.3s;
    text-transform: initial;
    color: ${colors.njabPink};
    text-decoration: initial;

    &:hover {
      text-decoration: underline;
    }
  }

  /*
    A workaround for forcing accessibility wrappers
    to have a 100% height.
    Reach Router issue here: https: //github.com/reach/router/issues/63
    */
  #___gatsby,
  div[role="group"][tabindex] {
    height: 100%;
    min-height: 100% !important;
  }

  .modal-overlay {
    z-index: 100;

    .modal-container {
      padding: 0 !important;
      height: 100%;
      max-height: 80vh !important;
    }
  }
`;

export default globalStyles;
