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

export const getUrl = (obj) =>
  !!obj && obj.hasOwnProperty("url") ? obj.url : "";

export const parsePrismicUrl = (url, size) => {
  const newUrl = url.replace(/[?|&][w|h]=\w+/g, "");
  return `${newUrl}&w=${size}`;
};

export const getPrismicImage = (image) => {
  return !!image && image.hasOwnProperty("url") ? image.url : placeholder;
};

export const convertImageSharp = (fluid, prismicImg, maxWidth = 1440) => {
  const src = parsePrismicUrl(prismicImg, maxWidth);
  const srcSet = `${parsePrismicUrl(prismicImg, 480)} 480w, ${parsePrismicUrl(
    prismicImg,
    768
  )} 768, ${parsePrismicUrl(prismicImg, 1024)} 1024w, ${parsePrismicUrl(
    prismicImg,
    1440
  )} 1440w`;

  const res = {
    base64: fluid.base64,
    aspectRatio: fluid.aspectRatio,
    src: src,
    srcSet: srcSet,
    sizes: `(max-width: 1440px) 100vw, 1440px`,
  };
  return res;
};
