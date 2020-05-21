import placeholder from "../images/njab/placeholder.png";

export const getPrismicText = (text) => {
  return text.reduce((total, item) => total + item.text, "");
};

export const getPrismicDocumentLink = (text) => {
  const node = text.reduce((total, item) => item);
  const { data } = node.spans.reduce((total, item) => item);
  const { uid } = data;
  return `/${uid}`;
};

export const getPrismicImage = (image) => {
  return !!image && image.hasOwnProperty("url") ? image.url : placeholder;
};

export const getUrl = (obj) =>
  !!obj && obj.hasOwnProperty("url") ? obj.url : "";
