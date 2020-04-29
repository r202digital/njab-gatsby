import placeholder from "../images/njab/placeholder.png";

export const getPrismicText = text => {
  return text.reduce((total, item) => total + item.text, "");
};

export const getPrismicImage = image => {
  return !!image && image.hasOwnProperty("url") ? image.url : placeholder;
};
